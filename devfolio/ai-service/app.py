"""
AI Deepfake Detection Service
Main Flask application for detecting deepfakes using multiple AI models
"""

import os
import logging
import traceback
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import asyncio
from concurrent.futures import ThreadPoolExecutor

from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import structlog
from prometheus_flask_exporter import PrometheusMetrics

# Import our custom modules
from src.models import ModelEnsemble
from src.utils.ipfs_handler import IPFSHandler
from src.utils.validators import MediaValidator
from src.utils.auth import AuthHandler
from src.config import Config

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_log_level,
        structlog.stdlib.add_logger_name,
        structlog.iso_time_utc_stamper("timestamp"),
        structlog.processors.dict_tracebacks,
        structlog.processors.JSONRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    wrapper_class=structlog.stdlib.BoundLogger,
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger(__name__)

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS
CORS(app, origins=os.getenv('ALLOWED_ORIGINS', '*').split(','))

# Rate limiting
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"],
    storage_uri=os.getenv('REDIS_URL', 'memory://')
)

# Prometheus metrics
metrics = PrometheusMetrics(app)
metrics.info('app_info', 'AI Deepfake Detection Service', version='1.0.0')

# Initialize components
model_ensemble = None
ipfs_handler = None
media_validator = None
auth_handler = None
executor = ThreadPoolExecutor(max_workers=int(os.getenv('MAX_WORKERS', '4')))

def initialize_services():
    """Initialize all AI models and services"""
    global model_ensemble, ipfs_handler, media_validator, auth_handler
    
    try:
        logger.info("Initializing AI Deepfake Detection Service...")
        
        # Initialize model ensemble
        model_ensemble = ModelEnsemble()
        logger.info("Model ensemble initialized")
        
        # Initialize IPFS handler
        ipfs_handler = IPFSHandler()
        logger.info("IPFS handler initialized")
        
        # Initialize media validator
        media_validator = MediaValidator()
        logger.info("Media validator initialized")
        
        # Initialize auth handler
        auth_handler = AuthHandler()
        logger.info("Auth handler initialized")
        
        logger.info("All services initialized successfully")
        
    except Exception as e:
        logger.error("Failed to initialize services", error=str(e), traceback=traceback.format_exc())
        raise

@app.before_first_request
def startup():
    """Initialize services on first request"""
    initialize_services()

@app.errorhandler(Exception)
def handle_exception(e):
    """Global exception handler"""
    logger.error("Unhandled exception", error=str(e), traceback=traceback.format_exc())
    
    return jsonify({
        'error': 'Internal server error',
        'message': 'An unexpected error occurred',
        'timestamp': datetime.utcnow().isoformat()
    }), 500

@app.errorhandler(429)
def ratelimit_handler(e):
    """Rate limit handler"""
    return jsonify({
        'error': 'Rate limit exceeded',
        'message': str(e.description),
        'timestamp': datetime.utcnow().isoformat()
    }), 429

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        # Check if all services are available
        status = {
            'status': 'healthy',
            'timestamp': datetime.utcnow().isoformat(),
            'services': {
                'model_ensemble': model_ensemble is not None,
                'ipfs_handler': ipfs_handler is not None,
                'media_validator': media_validator is not None,
                'auth_handler': auth_handler is not None
            }
        }
        
        return jsonify(status), 200
        
    except Exception as e:
        logger.error("Health check failed", error=str(e))
        return jsonify({
            'status': 'unhealthy',
            'error': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }), 503

@app.route('/api/v1/models', methods=['GET'])
@limiter.limit("100 per hour")
def get_available_models():
    """Get list of available AI models"""
    try:
        models = model_ensemble.get_available_models()
        
        return jsonify({
            'models': models,
            'total_models': len(models),
            'timestamp': datetime.utcnow().isoformat()
        }), 200
        
    except Exception as e:
        logger.error("Failed to get available models", error=str(e))
        return jsonify({
            'error': 'Failed to retrieve models',
            'message': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }), 500

@app.route('/api/v1/verify', methods=['POST'])
@limiter.limit("10 per minute")
def verify_media():
    """
    Verify media authenticity using AI models
    
    Expected payload:
    {
        "ipfs_hash": "QmExample...",
        "media_type": "image|video|audio",
        "models": ["aws_rekognition", "custom_cnn", "deepface_ensemble"] (optional),
        "confidence_threshold": 0.8 (optional),
        "chainlink_request": false (optional)
    }
    """
    start_time = datetime.utcnow()
    
    try:
        # Validate request
        if not request.is_json:
            return jsonify({
                'error': 'Invalid request format',
                'message': 'Request must be JSON',
                'timestamp': start_time.isoformat()
            }), 400
        
        data = request.get_json()
        
        # Extract and validate parameters
        ipfs_hash = data.get('ipfs_hash')
        media_type = data.get('media_type')
        requested_models = data.get('models', ['ensemble'])
        confidence_threshold = data.get('confidence_threshold', 0.8)
        is_chainlink_request = data.get('chainlink_request', False)
        
        if not ipfs_hash:
            return jsonify({
                'error': 'Missing required parameter',
                'message': 'ipfs_hash is required',
                'timestamp': start_time.isoformat()
            }), 400
        
        if not media_type:
            return jsonify({
                'error': 'Missing required parameter',
                'message': 'media_type is required',
                'timestamp': start_time.isoformat()
            }), 400
        
        # Validate authentication for non-Chainlink requests
        if not is_chainlink_request:
            auth_result = auth_handler.validate_request(request)
            if not auth_result['valid']:
                return jsonify({
                    'error': 'Authentication failed',
                    'message': auth_result['message'],
                    'timestamp': start_time.isoformat()
                }), 401
        
        # Validate IPFS hash format
        if not media_validator.validate_ipfs_hash(ipfs_hash):
            return jsonify({
                'error': 'Invalid IPFS hash',
                'message': 'IPFS hash format is invalid',
                'timestamp': start_time.isoformat()
            }), 400
        
        # Validate media type
        if not media_validator.validate_media_type(media_type):
            return jsonify({
                'error': 'Invalid media type',
                'message': 'Media type must be image, video, or audio',
                'timestamp': start_time.isoformat()
            }), 400
        
        logger.info("Starting verification", ipfs_hash=ipfs_hash, media_type=media_type, models=requested_models)
        
        # Download media from IPFS
        media_path = ipfs_handler.download_media(ipfs_hash)
        if not media_path:
            return jsonify({
                'error': 'Failed to download media',
                'message': 'Could not retrieve media from IPFS',
                'timestamp': start_time.isoformat()
            }), 404
        
        # Validate downloaded media
        validation_result = media_validator.validate_media_file(media_path, media_type)
        if not validation_result['valid']:
            ipfs_handler.cleanup_file(media_path)
            return jsonify({
                'error': 'Invalid media file',
                'message': validation_result['message'],
                'timestamp': start_time.isoformat()
            }), 400
        
        # Run AI verification
        verification_result = model_ensemble.verify_media(
            media_path=media_path,
            media_type=media_type,
            models=requested_models,
            confidence_threshold=confidence_threshold
        )
        
        # Cleanup downloaded file
        ipfs_handler.cleanup_file(media_path)
        
        # Calculate processing time
        processing_time = (datetime.utcnow() - start_time).total_seconds() * 1000
        
        # Prepare response
        response = {
            'is_authentic': verification_result['is_authentic'],
            'confidence_score': verification_result['confidence_score'],
            'ai_model': verification_result['ai_model'],
            'reasoning': verification_result['reasoning'],
            'processing_time': round(processing_time, 2),
            'models_used': verification_result['models_used'],
            'individual_scores': verification_result['individual_scores'],
            'metadata': {
                'ipfs_hash': ipfs_hash,
                'media_type': media_type,
                'file_size': validation_result['file_size'],
                'timestamp': start_time.isoformat()
            }
        }
        
        logger.info("Verification completed", 
                   ipfs_hash=ipfs_hash, 
                   is_authentic=response['is_authentic'],
                   confidence=response['confidence_score'],
                   processing_time=processing_time)
        
        return jsonify(response), 200
        
    except Exception as e:
        logger.error("Verification failed", error=str(e), traceback=traceback.format_exc())
        
        return jsonify({
            'error': 'Verification failed',
            'message': str(e),
            'processing_time': (datetime.utcnow() - start_time).total_seconds() * 1000,
            'timestamp': start_time.isoformat()
        }), 500

@app.route('/api/v1/batch-verify', methods=['POST'])
@limiter.limit("5 per hour")
def batch_verify_media():
    """
    Batch verify multiple media files
    
    Expected payload:
    {
        "requests": [
            {
                "ipfs_hash": "QmExample1...",
                "media_type": "image"
            },
            {
                "ipfs_hash": "QmExample2...",
                "media_type": "video"
            }
        ],
        "models": ["ensemble"] (optional),
        "confidence_threshold": 0.8 (optional)
    }
    """
    start_time = datetime.utcnow()
    
    try:
        if not request.is_json:
            return jsonify({
                'error': 'Invalid request format',
                'message': 'Request must be JSON',
                'timestamp': start_time.isoformat()
            }), 400
        
        data = request.get_json()
        requests_list = data.get('requests', [])
        
        if not requests_list or len(requests_list) == 0:
            return jsonify({
                'error': 'No requests provided',
                'message': 'At least one verification request is required',
                'timestamp': start_time.isoformat()
            }), 400
        
        if len(requests_list) > 10:  # Limit batch size
            return jsonify({
                'error': 'Batch size too large',
                'message': 'Maximum 10 requests per batch',
                'timestamp': start_time.isoformat()
            }), 400
        
        # Validate authentication
        auth_result = auth_handler.validate_request(request)
        if not auth_result['valid']:
            return jsonify({
                'error': 'Authentication failed',
                'message': auth_result['message'],
                'timestamp': start_time.isoformat()
            }), 401
        
        results = []
        
        # Process each request
        for i, req in enumerate(requests_list):
            try:
                ipfs_hash = req.get('ipfs_hash')
                media_type = req.get('media_type')
                
                if not ipfs_hash or not media_type:
                    results.append({
                        'index': i,
                        'ipfs_hash': ipfs_hash,
                        'error': 'Missing required parameters',
                        'success': False
                    })
                    continue
                
                # Download and verify
                media_path = ipfs_handler.download_media(ipfs_hash)
                if not media_path:
                    results.append({
                        'index': i,
                        'ipfs_hash': ipfs_hash,
                        'error': 'Failed to download media',
                        'success': False
                    })
                    continue
                
                # Validate media
                validation_result = media_validator.validate_media_file(media_path, media_type)
                if not validation_result['valid']:
                    ipfs_handler.cleanup_file(media_path)
                    results.append({
                        'index': i,
                        'ipfs_hash': ipfs_hash,
                        'error': validation_result['message'],
                        'success': False
                    })
                    continue
                
                # Verify
                verification_result = model_ensemble.verify_media(
                    media_path=media_path,
                    media_type=media_type,
                    models=data.get('models', ['ensemble']),
                    confidence_threshold=data.get('confidence_threshold', 0.8)
                )
                
                ipfs_handler.cleanup_file(media_path)
                
                results.append({
                    'index': i,
                    'ipfs_hash': ipfs_hash,
                    'success': True,
                    'result': verification_result
                })
                
            except Exception as e:
                logger.error(f"Failed to process request {i}", error=str(e))
                results.append({
                    'index': i,
                    'ipfs_hash': req.get('ipfs_hash', 'unknown'),
                    'error': str(e),
                    'success': False
                })
        
        processing_time = (datetime.utcnow() - start_time).total_seconds() * 1000
        
        return jsonify({
            'results': results,
            'total_requests': len(requests_list),
            'successful': sum(1 for r in results if r['success']),
            'failed': sum(1 for r in results if not r['success']),
            'processing_time': round(processing_time, 2),
            'timestamp': start_time.isoformat()
        }), 200
        
    except Exception as e:
        logger.error("Batch verification failed", error=str(e))
        return jsonify({
            'error': 'Batch verification failed',
            'message': str(e),
            'timestamp': start_time.isoformat()
        }), 500

@app.route('/api/v1/stats', methods=['GET'])
@limiter.limit("60 per hour")
def get_statistics():
    """Get service statistics"""
    try:
        # This would typically come from a database
        # For now, return mock statistics
        stats = {
            'total_verifications': 1250,
            'authentic_content': 890,
            'fake_content': 360,
            'accuracy_rate': 94.5,
            'average_processing_time': 2.3,
            'models_available': len(model_ensemble.get_available_models()) if model_ensemble else 0,
            'uptime': '99.9%',
            'last_updated': datetime.utcnow().isoformat()
        }
        
        return jsonify(stats), 200
        
    except Exception as e:
        logger.error("Failed to get statistics", error=str(e))
        return jsonify({
            'error': 'Failed to retrieve statistics',
            'message': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }), 500

@app.route('/metrics', methods=['GET'])
def prometheus_metrics():
    """Prometheus metrics endpoint"""
    return Response(
        metrics.generate_latest(),
        mimetype='text/plain; version=0.0.4; charset=utf-8'
    )

if __name__ == '__main__':
    # Initialize services
    initialize_services()
    
    # Run the app
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV', 'production') == 'development'
    
    logger.info("Starting AI Deepfake Detection Service", port=port, debug=debug)
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug,
        threaded=True
    )
