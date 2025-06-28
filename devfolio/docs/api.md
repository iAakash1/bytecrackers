# API Documentation

## AI Deepfake Detection Service API

Base URL: `https://your-ai-service.railway.app/api/v1`

### Authentication

All API requests require authentication via API key or JWT token (except health check).

```bash
Authorization: Bearer YOUR_API_KEY
```

### Endpoints

#### GET /health
Health check endpoint to verify service status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "services": {
    "model_ensemble": true,
    "ipfs_handler": true,
    "media_validator": true,
    "auth_handler": true
  }
}
```

#### GET /models
Get list of available AI models.

**Response:**
```json
{
  "models": [
    {
      "name": "aws_rekognition",
      "type": "commercial",
      "supported_media": ["image", "video"],
      "accuracy": 94.5
    },
    {
      "name": "custom_cnn",
      "type": "custom",
      "supported_media": ["image", "video"],
      "accuracy": 92.1
    },
    {
      "name": "deepface_ensemble",
      "type": "ensemble",
      "supported_media": ["image"],
      "accuracy": 96.2
    }
  ],
  "total_models": 3,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### POST /verify
Verify media authenticity using AI models.

**Request Body:**
```json
{
  "ipfs_hash": "QmExample123...",
  "media_type": "image",
  "models": ["aws_rekognition", "custom_cnn"],
  "confidence_threshold": 0.8,
  "chainlink_request": false
}
```

**Response:**
```json
{
  "is_authentic": true,
  "confidence_score": 87.5,
  "ai_model": "ensemble",
  "reasoning": "Analysis shows no signs of digital manipulation...",
  "processing_time": 2300,
  "models_used": ["aws_rekognition", "custom_cnn"],
  "individual_scores": {
    "aws_rekognition": 89.2,
    "custom_cnn": 85.8
  },
  "metadata": {
    "ipfs_hash": "QmExample123...",
    "media_type": "image",
    "file_size": 2048576,
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

#### POST /batch-verify
Batch verify multiple media files.

**Request Body:**
```json
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
  "models": ["ensemble"],
  "confidence_threshold": 0.8
}
```

**Response:**
```json
{
  "results": [
    {
      "index": 0,
      "ipfs_hash": "QmExample1...",
      "success": true,
      "result": {
        "is_authentic": true,
        "confidence_score": 91.2,
        "ai_model": "ensemble",
        "reasoning": "No manipulation detected"
      }
    }
  ],
  "total_requests": 2,
  "successful": 1,
  "failed": 1,
  "processing_time": 4500,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### GET /stats
Get service statistics.

**Response:**
```json
{
  "total_verifications": 1250,
  "authentic_content": 890,
  "fake_content": 360,
  "accuracy_rate": 94.5,
  "average_processing_time": 2.3,
  "models_available": 3,
  "uptime": "99.9%",
  "last_updated": "2024-01-01T00:00:00Z"
}
```

### Error Codes

- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid API key)
- `404` - Not Found (media not found on IPFS)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

### Rate Limits

- **Free Tier**: 50 requests per hour, 200 per day
- **Pro Tier**: 1000 requests per hour, 10000 per day
- **Enterprise**: Custom limits

### Supported Media Formats

#### Images
- JPG, JPEG
- PNG
- WebP
- BMP

#### Videos
- MP4
- AVI
- MOV
- MKV
- WebM

#### Audio
- MP3
- WAV
- FLAC
- AAC

### File Size Limits

- **Images**: 50MB max
- **Videos**: 500MB max
- **Audio**: 100MB max
