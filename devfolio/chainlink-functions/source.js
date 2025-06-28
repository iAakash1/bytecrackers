/**
 * Chainlink Functions JavaScript source code for AI deepfake detection
 * This code runs in the Chainlink Functions environment and makes HTTP requests
 * to the AI detection service to verify media authenticity.
 */

// The request function that will be executed by Chainlink Functions
const aiDeepfakeDetection = async () => {
  // Get arguments from the smart contract
  const ipfsHash = args[0];
  const mediaType = args[1];

  if (!ipfsHash || !mediaType) {
    throw Error("Missing required arguments: ipfsHash and mediaType");
  }

  // Validate IPFS hash format (basic validation)
  if (!/^[a-zA-Z0-9]{46,59}$/.test(ipfsHash)) {
    throw Error("Invalid IPFS hash format");
  }

  // Validate media type
  const validMediaTypes = ["image", "video", "audio"];
  if (!validMediaTypes.includes(mediaType.toLowerCase())) {
    throw Error("Invalid media type. Must be image, video, or audio");
  }

  // AI service configuration
  const AI_SERVICE_BASE_URL = "https://your-ai-service.railway.app"; // Replace with actual URL
  const API_VERSION = "v1";
  const TIMEOUT_MS = 25000; // 25 seconds (Chainlink Functions has 30s limit)

  // Construct the verification request payload
  const requestPayload = {
    ipfs_hash: ipfsHash,
    media_type: mediaType.toLowerCase(),
    models: ["aws_rekognition", "custom_cnn", "deepface_ensemble"],
    confidence_threshold: 0.8,
    chainlink_request: true
  };

  try {
    // Make HTTP request to AI service
    const response = await Functions.makeHttpRequest({
      url: `${AI_SERVICE_BASE_URL}/api/${API_VERSION}/verify`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${secrets.AI_SERVICE_API_KEY}`,
        "X-Request-Source": "chainlink-functions"
      },
      data: requestPayload,
      timeout: TIMEOUT_MS,
      responseType: "json"
    });

    // Check if request was successful
    if (response.error) {
      console.error("HTTP request failed:", response.error);
      throw Error(`HTTP request failed: ${response.error.message || "Unknown error"}`);
    }

    // Validate response structure
    const data = response.data;
    if (!data || typeof data !== "object") {
      throw Error("Invalid response format from AI service");
    }

    // Extract verification results
    const {
      is_authentic,
      confidence_score,
      ai_model,
      reasoning,
      processing_time,
      error: serviceError
    } = data;

    // Check for service-level errors
    if (serviceError) {
      throw Error(`AI service error: ${serviceError}`);
    }

    // Validate required fields
    if (typeof is_authentic !== "boolean") {
      throw Error("Missing or invalid 'is_authentic' field in response");
    }

    if (typeof confidence_score !== "number" || confidence_score < 0 || confidence_score > 100) {
      throw Error("Missing or invalid 'confidence_score' field in response");
    }

    if (!ai_model || typeof ai_model !== "string") {
      throw Error("Missing or invalid 'ai_model' field in response");
    }

    // Log processing details for debugging
    console.log(`Verification completed in ${processing_time}ms`);
    console.log(`Result: ${is_authentic ? "Authentic" : "Fake"} (${confidence_score}% confidence)`);
    console.log(`AI Model: ${ai_model}`);

    // Prepare response data for smart contract
    // The smart contract expects: [isAuthentic, confidenceScore, aiModel, reasoning]
    const encodedResponse = Functions.encodeString(
      JSON.stringify({
        isAuthentic: is_authentic,
        confidenceScore: Math.round(confidence_score), // Round to integer
        aiModel: ai_model,
        reasoning: reasoning || "No detailed reasoning provided"
      })
    );

    return encodedResponse;

  } catch (error) {
    console.error("Error in AI deepfake detection:", error);
    
    // Return error information to smart contract
    const errorResponse = {
      isAuthentic: false,
      confidenceScore: 0,
      aiModel: "error",
      reasoning: `Processing failed: ${error.message}`
    };

    return Functions.encodeString(JSON.stringify(errorResponse));
  }
};

// Execute the function
return aiDeepfakeDetection();
