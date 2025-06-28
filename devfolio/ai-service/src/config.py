"""
Configuration module for AI Deepfake Detection Service
"""

import os
from typing import List

class Config:
    """Application configuration class"""
    
    # Flask configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('FLASK_ENV', 'production') == 'development'
    
    # AI Service configuration
    MAX_FILE_SIZE = int(os.getenv('MAX_FILE_SIZE', '100')) * 1024 * 1024  # 100MB default
    SUPPORTED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'bmp']
    SUPPORTED_VIDEO_FORMATS = ['mp4', 'avi', 'mov', 'mkv', 'webm']
    SUPPORTED_AUDIO_FORMATS = ['mp3', 'wav', 'flac', 'aac']
    
    # IPFS configuration
    IPFS_GATEWAY_URLS = [
        'https://gateway.pinata.cloud/ipfs',
        'https://cloudflare-ipfs.com/ipfs',
        'https://gateway.ipfs.io/ipfs',
        'https://ipfs.infura.io/ipfs'
    ]
    IPFS_DOWNLOAD_TIMEOUT = int(os.getenv('IPFS_DOWNLOAD_TIMEOUT', '30'))
    IPFS_MAX_RETRIES = int(os.getenv('IPFS_MAX_RETRIES', '3'))
    
    # AWS configuration
    AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
    AWS_REGION = os.getenv('AWS_REGION', 'us-east-1')
    
    # Model configuration
    MODEL_CACHE_DIR = os.getenv('MODEL_CACHE_DIR', './models')
    CUSTOM_MODEL_PATH = os.getenv('CUSTOM_MODEL_PATH', './models/deepfake_detector.h5')
    CONFIDENCE_THRESHOLD = float(os.getenv('CONFIDENCE_THRESHOLD', '0.8'))
    
    # Authentication
    API_KEY = os.getenv('API_KEY')
    JWT_SECRET = os.getenv('JWT_SECRET', 'jwt-secret-change-in-production')
    CHAINLINK_TRUSTED_IPS = os.getenv('CHAINLINK_TRUSTED_IPS', '').split(',')
    
    # Rate limiting
    RATE_LIMIT_STORAGE_URL = os.getenv('REDIS_URL', 'memory://')
    DEFAULT_RATE_LIMITS = ["200 per day", "50 per hour"]
    
    # Logging
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    
    # Processing
    MAX_WORKERS = int(os.getenv('MAX_WORKERS', '4'))
    PROCESSING_TIMEOUT = int(os.getenv('PROCESSING_TIMEOUT', '60'))  # seconds
    
    # Temporary file storage
    TEMP_DIR = os.getenv('TEMP_DIR', './temp')
    CLEANUP_INTERVAL = int(os.getenv('CLEANUP_INTERVAL', '3600'))  # 1 hour
    
    @staticmethod
    def get_all_supported_formats() -> List[str]:
        """Get all supported file formats"""
        return (Config.SUPPORTED_IMAGE_FORMATS + 
                Config.SUPPORTED_VIDEO_FORMATS + 
                Config.SUPPORTED_AUDIO_FORMATS)
    
    @staticmethod
    def is_valid_format(filename: str, media_type: str) -> bool:
        """Check if file format is supported for given media type"""
        if not filename or '.' not in filename:
            return False
            
        extension = filename.lower().split('.')[-1]
        
        if media_type.lower() == 'image':
            return extension in Config.SUPPORTED_IMAGE_FORMATS
        elif media_type.lower() == 'video':
            return extension in Config.SUPPORTED_VIDEO_FORMATS
        elif media_type.lower() == 'audio':
            return extension in Config.SUPPORTED_AUDIO_FORMATS
        
        return False
