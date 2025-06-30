import React, { useState } from 'react';
import { FileText, Code, Copy, Check, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

const APIDocumentationPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedEndpoints, setExpandedEndpoints] = useState<string[]>(['voice-analysis']);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const toggleEndpoint = (endpoint: string) => {
    if (expandedEndpoints.includes(endpoint)) {
      setExpandedEndpoints(expandedEndpoints.filter(e => e !== endpoint));
    } else {
      setExpandedEndpoints([...expandedEndpoints, endpoint]);
    }
  };

  const copySnippet = (snippetId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(snippetId);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Guardian Sentinel API Documentation</h2>
        </div>
      </div>

      <div className="flex min-h-[600px]">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 p-4">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveSection('overview')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeSection === 'overview'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveSection('authentication')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeSection === 'authentication'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              Authentication
            </button>
            <button
              onClick={() => setActiveSection('endpoints')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeSection === 'endpoints'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              API Endpoints
            </button>
            <button
              onClick={() => setActiveSection('realtime')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeSection === 'realtime'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              Real-time API
            </button>
            <button
              onClick={() => setActiveSection('webhooks')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeSection === 'webhooks'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              Webhooks
            </button>
            <button
              onClick={() => setActiveSection('sdks')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeSection === 'sdks'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              SDKs & Libraries
            </button>
            <button
              onClick={() => setActiveSection('deployment')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeSection === 'deployment'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              Deployment Guide
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Guardian Sentinel API Overview</h3>
              <p className="text-gray-700 mb-4">
                The Guardian Sentinel API provides real-time access to advanced safety monitoring and threat detection capabilities. 
                This API allows developers to integrate cutting-edge AI safety features into their applications.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Key Features</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Real-time voice analysis for emotion detection and grooming language</li>
                  <li>Pose and body language threat detection</li>
                  <li>Facial recognition and matching against databases</li>
                  <li>Geo-fencing and location safety monitoring</li>
                  <li>Biometric data analysis for health and safety</li>
                  <li>Blockchain-secured evidence logging</li>
                  <li>Quantum-enhanced threat prediction</li>
                </ul>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">API Base URLs</h4>
              <div className="space-y-3 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700">Production</p>
                  <code className="block bg-gray-100 p-2 rounded text-sm font-mono mt-1">
                    https://api.guardian-sentinel.com/v1
                  </code>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700">Staging</p>
                  <code className="block bg-gray-100 p-2 rounded text-sm font-mono mt-1">
                    https://api-staging.guardian-sentinel.com/v1
                  </code>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700">Development</p>
                  <code className="block bg-gray-100 p-2 rounded text-sm font-mono mt-1">
                    https://api-dev.guardian-sentinel.com/v1
                  </code>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Rate Limits</h4>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-sm font-medium text-gray-700 pb-2">Plan</th>
                      <th className="text-left text-sm font-medium text-gray-700 pb-2">Requests/min</th>
                      <th className="text-left text-sm font-medium text-gray-700 pb-2">Real-time Connections</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="py-2">Developer</td>
                      <td>60</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td className="py-2">Professional</td>
                      <td>300</td>
                      <td>20</td>
                    </tr>
                    <tr>
                      <td className="py-2">Enterprise</td>
                      <td>1,000+</td>
                      <td>Unlimited</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Response Formats</h4>
              <p className="text-gray-700 mb-3">
                All API responses are returned in JSON format with the following structure:
              </p>
              
              <div className="relative mb-6">
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`{
  "success": true,
  "data": { ... },
  "meta": {
    "processing_time_ms": 42,
    "version": "1.0.0"
  }
}`}
                </pre>
                <button
                  onClick={() => copySnippet('response-format', `{
  "success": true,
  "data": { ... },
  "meta": {
    "processing_time_ms": 42,
    "version": "1.0.0"
  }
}`)}
                  className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {copiedSnippet === 'response-format' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Error Handling</h4>
              <p className="text-gray-700 mb-3">
                Errors are returned with appropriate HTTP status codes and detailed error messages:
              </p>
              
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`{
  "success": false,
  "error": {
    "code": "invalid_credentials",
    "message": "Invalid API key provided",
    "status": 401
  }
}`}
                </pre>
                <button
                  onClick={() => copySnippet('error-format', `{
  "success": false,
  "error": {
    "code": "invalid_credentials",
    "message": "Invalid API key provided",
    "status": 401
  }
}`)}
                  className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {copiedSnippet === 'error-format' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Authentication Section */}
          {activeSection === 'authentication' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Authentication</h3>
              <p className="text-gray-700 mb-4">
                Guardian Sentinel API uses API keys for authentication. All API requests must include your API key in the request headers.
              </p>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">API Keys</h4>
              <p className="text-gray-700 mb-3">
                You can obtain an API key from the Guardian Sentinel Developer Portal. There are two types of API keys:
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700">Public API Key</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Used for client-side applications. Has limited permissions and can only access public endpoints.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700">Secret API Key</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Used for server-side applications. Has full permissions and should never be exposed in client-side code.
                  </p>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Authentication Header</h4>
              <p className="text-gray-700 mb-3">
                Include your API key in the <code className="bg-gray-100 px-1 py-0.5 rounded">Authorization</code> header of your HTTP requests:
              </p>
              
              <div className="relative mb-6">
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`Authorization: Bearer YOUR_API_KEY`}
                </pre>
                <button
                  onClick={() => copySnippet('auth-header', `Authorization: Bearer YOUR_API_KEY`)}
                  className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {copiedSnippet === 'auth-header' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Example Request with Authentication</h4>
              
              <div className="relative mb-6">
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`// JavaScript example using fetch
fetch('https://api.guardian-sentinel.com/v1/voice-analysis', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    audio_data: "base64_encoded_audio_data",
    user_id: "user_123"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                </pre>
                <button
                  onClick={() => copySnippet('auth-example', `// JavaScript example using fetch
fetch('https://api.guardian-sentinel.com/v1/voice-analysis', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    audio_data: "base64_encoded_audio_data",
    user_id: "user_123"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`)}
                  className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {copiedSnippet === 'auth-example' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Security Best Practices</h4>
                    <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm mt-2">
                      <li>Never expose your Secret API Key in client-side code</li>
                      <li>Rotate your API keys periodically</li>
                      <li>Use environment variables to store API keys</li>
                      <li>Set appropriate CORS headers on your server</li>
                      <li>Implement rate limiting on your server</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Endpoints Section */}
          {activeSection === 'endpoints' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">API Endpoints</h3>
              <p className="text-gray-700 mb-6">
                Guardian Sentinel provides a comprehensive set of RESTful API endpoints for integrating safety features into your applications.
              </p>
              
              {/* Voice Analysis Endpoint */}
              <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                  onClick={() => toggleEndpoint('voice-analysis')}
                >
                  <div className="flex items-center space-x-2">
                    <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">POST</div>
                    <h4 className="font-medium text-gray-900">/voice-analysis</h4>
                  </div>
                  {expandedEndpoints.includes('voice-analysis') ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                
                {expandedEndpoints.includes('voice-analysis') && (
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-700 mb-4">
                      Analyzes audio data for emotional state, grooming language patterns, and voice authenticity.
                    </p>
                    
                    <h5 className="font-medium text-gray-900 mb-2">Request Parameters</h5>
                    <div className="bg-gray-50 rounded-lg overflow-hidden mb-4">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">audio_data</td>
                            <td className="px-4 py-3 text-sm text-gray-500">string</td>
                            <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                            <td className="px-4 py-3 text-sm text-gray-500">Base64-encoded audio data</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">user_id</td>
                            <td className="px-4 py-3 text-sm text-gray-500">string</td>
                            <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                            <td className="px-4 py-3 text-sm text-gray-500">User identifier</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">language</td>
                            <td className="px-4 py-3 text-sm text-gray-500">string</td>
                            <td className="px-4 py-3 text-sm text-gray-500">No</td>
                            <td className="px-4 py-3 text-sm text-gray-500">Language code (default: en-US)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">sensitivity</td>
                            <td className="px-4 py-3 text-sm text-gray-500">number</td>
                            <td className="px-4 py-3 text-sm text-gray-500">No</td>
                            <td className="px-4 py-3 text-sm text-gray-500">Detection sensitivity (0.0-1.0, default: 0.7)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <h5 className="font-medium text-gray-900 mb-2">Example Request</h5>
                    <div className="relative mb-4">
                      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`POST /v1/voice-analysis HTTP/1.1
Host: api.guardian-sentinel.com
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "audio_data": "base64_encoded_audio_data",
  "user_id": "user_123",
  "language": "en-US",
  "sensitivity": 0.8
}`}
                      </pre>
                      <button
                        onClick={() => copySnippet('voice-request', `POST /v1/voice-analysis HTTP/1.1
Host: api.guardian-sentinel.com
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "audio_data": "base64_encoded_audio_data",
  "user_id": "user_123",
  "language": "en-US",
  "sensitivity": 0.8
}`)}
                        className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                      >
                        {copiedSnippet === 'voice-request' ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    
                    <h5 className="font-medium text-gray-900 mb-2">Example Response</h5>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`{
  "success": true,
  "data": {
    "emotion_state": "distressed",
    "grooming_indicators": [
      "suspicious_language_pattern_1",
      "suspicious_language_pattern_2"
    ],
    "confidence_level": 0.92,
    "deepfake_detected": false,
    "voiceprint_match": true,
    "audio_fingerprint": "a1b2c3d4e5f6",
    "timestamp": "2025-06-15T14:32:10Z"
  },
  "meta": {
    "processing_time_ms": 78,
    "version": "1.0.0"
  }
}`}
                      </pre>
                      <button
                        onClick={() => copySnippet('voice-response', `{
  "success": true,
  "data": {
    "emotion_state": "distressed",
    "grooming_indicators": [
      "suspicious_language_pattern_1",
      "suspicious_language_pattern_2"
    ],
    "confidence_level": 0.92,
    "deepfake_detected": false,
    "voiceprint_match": true,
    "audio_fingerprint": "a1b2c3d4e5f6",
    "timestamp": "2025-06-15T14:32:10Z"
  },
  "meta": {
    "processing_time_ms": 78,
    "version": "1.0.0"
  }
}`)}
                        className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                      >
                        {copiedSnippet === 'voice-response' ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Pose Analysis Endpoint */}
              <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                  onClick={() => toggleEndpoint('pose-analysis')}
                >
                  <div className="flex items-center space-x-2">
                    <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">POST</div>
                    <h4 className="font-medium text-gray-900">/pose-analysis</h4>
                  </div>
                  {expandedEndpoints.includes('pose-analysis') ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                
                {expandedEndpoints.includes('pose-analysis') && (
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-700 mb-4">
                      Analyzes body pose data to detect threatening postures, aggressive behavior, and unusual movement patterns.
                    </p>
                    
                    <h5 className="font-medium text-gray-900 mb-2">Request Parameters</h5>
                    <div className="bg-gray-50 rounded-lg overflow-hidden mb-4">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">pose_data</td>
                            <td className="px-4 py-3 text-sm text-gray-500">object</td>
                            <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                            <td className="px-4 py-3 text-sm text-gray-500">JSON object containing pose keypoints</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">user_id</td>
                            <td className="px-4 py-3 text-sm text-gray-500">string</td>
                            <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                            <td className="px-4 py-3 text-sm text-gray-500">User identifier</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">context</td>
                            <td className="px-4 py-3 text-sm text-gray-500">string</td>
                            <td className="px-4 py-3 text-sm text-gray-500">No</td>
                            <td className="px-4 py-3 text-sm text-gray-500">Situational context (e.g., "school", "public")</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">threshold</td>
                            <td className="px-4 py-3 text-sm text-gray-500">number</td>
                            <td className="px-4 py-3 text-sm text-gray-500">No</td>
                            <td className="px-4 py-3 text-sm text-gray-500">Threat detection threshold (0.0-1.0, default: 0.7)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <h5 className="font-medium text-gray-900 mb-2">Example Request</h5>
                    <div className="relative mb-4">
                      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`POST /v1/pose-analysis HTTP/1.1
Host: api.guardian-sentinel.com
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "pose_data": {
    "keypoints": [
      {"x": 320, "y": 240, "confidence": 0.95, "part": "nose"},
      {"x": 310, "y": 220, "confidence": 0.92, "part": "leftEye"},
      {"x": 330, "y": 220, "confidence": 0.91, "part": "rightEye"},
      // Additional keypoints...
    ]
  },
  "user_id": "user_123",
  "context": "public",
  "threshold": 0.65
}`}
                      </pre>
                      <button
                        onClick={() => copySnippet('pose-request', `POST /v1/pose-analysis HTTP/1.1
Host: api.guardian-sentinel.com
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "pose_data": {
    "keypoints": [
      {"x": 320, "y": 240, "confidence": 0.95, "part": "nose"},
      {"x": 310, "y": 220, "confidence": 0.92, "part": "leftEye"},
      {"x": 330, "y": 220, "confidence": 0.91, "part": "rightEye"},
      // Additional keypoints...
    ]
  },
  "user_id": "user_123",
  "context": "public",
  "threshold": 0.65
}`)}
                        className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                      >
                        {copiedSnippet === 'pose-request' ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    
                    <h5 className="font-medium text-gray-900 mb-2">Example Response</h5>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`{
  "success": true,
  "data": {
    "body_language": "aggressive",
    "threat_level": 0.78,
    "anomaly_score": 0.65,
    "movement_pattern": "erratic",
    "keypoints_analysis": {
      "arm_position": "raised",
      "body_orientation": "forward",
      "stance": "aggressive"
    },
    "timestamp": "2025-06-15T14:33:22Z"
  },
  "meta": {
    "processing_time_ms": 42,
    "version": "1.0.0"
  }
}`}
                      </pre>
                      <button
                        onClick={() => copySnippet('pose-response', `{
  "success": true,
  "data": {
    "body_language": "aggressive",
    "threat_level": 0.78,
    "anomaly_score": 0.65,
    "movement_pattern": "erratic",
    "keypoints_analysis": {
      "arm_position": "raised",
      "body_orientation": "forward",
      "stance": "aggressive"
    },
    "timestamp": "2025-06-15T14:33:22Z"
  },
  "meta": {
    "processing_time_ms": 42,
    "version": "1.0.0"
  }
}`)}
                        className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                      >
                        {copiedSnippet === 'pose-response' ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Additional Endpoints */}
              <div className="space-y-2">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded mr-2">POST</div>
                  <span className="text-gray-700 font-medium">/face-recognition</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded mr-2">POST</div>
                  <span className="text-gray-700 font-medium">/geo-fence</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded mr-2">GET</div>
                  <span className="text-gray-700 font-medium">/safety-score</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded mr-2">POST</div>
                  <span className="text-gray-700 font-medium">/emergency-alert</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded mr-2">GET</div>
                  <span className="text-gray-700 font-medium">/threat-incidents</span>
                </div>
              </div>
            </div>
          )}

          {/* Real-time API Section */}
          {activeSection === 'realtime' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time API</h3>
              <p className="text-gray-700 mb-4">
                Guardian Sentinel provides real-time APIs for immediate data processing and alert generation. 
                Our real-time infrastructure supports WebSockets, Server-Sent Events (SSE), and Webhooks.
              </p>
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 mb-6">
                <h4 className="font-medium text-purple-900 mb-2">Key Features</h4>
                <ul className="list-disc list-inside space-y-1 text-purple-800">
                  <li>Sub-100ms event processing</li>
                  <li>Bidirectional real-time communication</li>
                  <li>Automatic reconnection with exponential backoff</li>
                  <li>Event filtering and prioritization</li>
                  <li>End-to-end encryption</li>
                  <li>Horizontal scaling for high-volume applications</li>
                </ul>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">WebSocket Connection</h4>
              <p className="text-gray-700 mb-3">
                Connect to our WebSocket API to receive real-time updates:
              </p>
              
              <div className="relative mb-6">
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`// JavaScript WebSocket example
const socket = new WebSocket('wss://realtime.guardian-sentinel.com/v1/socket');

// Connection opened
socket.addEventListener('open', (event) => {
  // Authenticate
  socket.send(JSON.stringify({
    type: 'auth',
    api_key: 'YOUR_API_KEY'
  }));
  
  // Subscribe to events
  socket.send(JSON.stringify({
    type: 'subscribe',
    channels: ['voice_alerts', 'pose_threats', 'location_alerts']
  }));
});

// Listen for messages
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Real-time event received:', data);
  
  // Handle different event types
  switch(data.type) {
    case 'voice_alert':
      handleVoiceAlert(data);
      break;
    case 'pose_threat':
      handlePoseThreat(data);
      break;
    case 'location_alert':
      handleLocationAlert(data);
      break;
  }
});

// Connection closed
socket.addEventListener('close', (event) => {
  console.log('Connection closed, reconnecting...');
  // Implement reconnection logic
});`}
                </pre>
                <button
                  onClick={() => copySnippet('websocket-example', `// JavaScript WebSocket example
const socket = new WebSocket('wss://realtime.guardian-sentinel.com/v1/socket');

// Connection opened
socket.addEventListener('open', (event) => {
  // Authenticate
  socket.send(JSON.stringify({
    type: 'auth',
    api_key: 'YOUR_API_KEY'
  }));
  
  // Subscribe to events
  socket.send(JSON.stringify({
    type: 'subscribe',
    channels: ['voice_alerts', 'pose_threats', 'location_alerts']
  }));
});

// Listen for messages
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Real-time event received:', data);
  
  // Handle different event types
  switch(data.type) {
    case 'voice_alert':
      handleVoiceAlert(data);
      break;
    case 'pose_threat':
      handlePoseThreat(data);
      break;
    case 'location_alert':
      handleLocationAlert(data);
      break;
  }
});

// Connection closed
socket.addEventListener('close', (event) => {
  console.log('Connection closed, reconnecting...');
  // Implement reconnection logic
});`)}
                  className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {copiedSnippet === 'websocket-example' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Server-Sent Events (SSE)</h4>
              <p className="text-gray-700 mb-3">
                For one-way real-time updates, you can use Server-Sent Events:
              </p>
              
              <div className="relative mb-6">
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`// JavaScript SSE example
const eventSource = new EventSource(
  'https://realtime.guardian-sentinel.com/v1/events?api_key=YOUR_API_KEY'
);

// Listen for all events
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Event received:', data);
};

// Listen for specific event types
eventSource.addEventListener('voice_alert', (event) => {
  const data = JSON.parse(event.data);
  console.log('Voice alert received:', data);
});

eventSource.addEventListener('pose_threat', (event) => {
  const data = JSON.parse(event.data);
  console.log('Pose threat received:', data);
});

// Handle connection errors
eventSource.onerror = (error) => {
  console.error('EventSource error:', error);
  eventSource.close();
  // Implement reconnection logic
};`}
                </pre>
                <button
                  onClick={() => copySnippet('sse-example', `// JavaScript SSE example
const eventSource = new EventSource(
  'https://realtime.guardian-sentinel.com/v1/events?api_key=YOUR_API_KEY'
);

// Listen for all events
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Event received:', data);
};

// Listen for specific event types
eventSource.addEventListener('voice_alert', (event) => {
  const data = JSON.parse(event.data);
  console.log('Voice alert received:', data);
});

eventSource.addEventListener('pose_threat', (event) => {
  const data = JSON.parse(event.data);
  console.log('Pose threat received:', data);
});

// Handle connection errors
eventSource.onerror = (error) => {
  console.error('EventSource error:', error);
  eventSource.close();
  // Implement reconnection logic
};`)}
                  className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {copiedSnippet === 'sse-example' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Event Types</h4>
              <div className="bg-gray-50 rounded-lg overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">voice_alert</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Voice analysis alerts (panic, grooming)</td>
                      <td className="px-4 py-3 text-sm text-gray-500">High</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">pose_threat</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Pose and body language threats</td>
                      <td className="px-4 py-3 text-sm text-gray-500">High</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">face_match</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Face recognition matches</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Medium</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">location_alert</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Geo-fence and location alerts</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Medium</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">biometric_alert</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Biometric data anomalies</td>
                      <td className="px-4 py-3 text-sm text-gray-500">High</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">emergency</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Emergency alerts</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Critical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Real-time Performance</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Our real-time API is designed for ultra-low latency with a 99.9% SLA for sub-100ms event processing.
                      The system automatically scales to handle millions of concurrent connections and billions of events per day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Webhooks Section */}
          {activeSection === 'webhooks' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Webhooks</h3>
              <p className="text-gray-700 mb-4">
                Guardian Sentinel webhooks allow you to receive real-time notifications when specific events occur in your account.
                Instead of polling our API, webhooks push data to your server as events happen.
              </p>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Setting Up Webhooks</h4>
              <p className="text-gray-700 mb-3">
                To set up a webhook, you need to:
              </p>
              
              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
                <li>Create a publicly accessible HTTPS endpoint on your server</li>
                <li>Register this endpoint in the Guardian Sentinel Developer Portal</li>
                <li>Select the events you want to receive</li>
                <li>Configure your server to process incoming webhook events</li>
              </ol>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Webhook Payload</h4>
              <p className="text-gray-700 mb-3">
                When an event occurs, we'll send an HTTP POST request to your endpoint with a JSON payload:
              </p>
              
              <div className="relative mb-6">
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`{
  "event_type": "emergency_alert",
  "event_id": "evt_123456789",
  "timestamp": "2025-06-15T14:35:42Z",
  "data": {
    "user_id": "user_123",
    "alert_type": "panic_button",
    "location": {
      "lat": 40.7128,
      "lng": -74.0060,
      "accuracy": 10
    },
    "severity": "critical"
  }
}`}
                </pre>
                <button
                  onClick={() => copySnippet('webhook-payload', `{
  "event_type": "emergency_alert",
  "event_id": "evt_123456789",
  "timestamp": "2025-06-15T14:35:42Z",
  "data": {
    "user_id": "user_123",
    "alert_type": "panic_button",
    "location": {
      "lat": 40.7128,
      "lng": -74.0060,
      "accuracy": 10
    },
    "severity": "critical"
  }
}`)}
                  className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {copiedSnippet === 'webhook-payload' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Webhook Signature Verification</h4>
              <p className="text-gray-700 mb-3">
                To ensure the webhook request came from Guardian Sentinel, we include a signature in the 
                <code className="bg-gray-100 px-1 py-0.5 rounded">X-Guardian-Signature</code> header:
              </p>
              
              <div className="relative mb-6">
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`// Node.js example for verifying webhook signatures
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const calculatedSignature = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(calculatedSignature),
    Buffer.from(signature)
  );
}

// Express.js route handler example
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-guardian-signature'];
  const payload = JSON.stringify(req.body);
  const webhookSecret = process.env.GUARDIAN_WEBHOOK_SECRET;
  
  if (!verifyWebhookSignature(payload, signature, webhookSecret)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process the webhook event
  const event = req.body;
  console.log('Webhook received:', event);
  
  // Respond with 200 OK to acknowledge receipt
  res.status(200).send('OK');
});`}
                </pre>
                <button
                  onClick={() => copySnippet('webhook-verification', `// Node.js example for verifying webhook signatures
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const calculatedSignature = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(calculatedSignature),
    Buffer.from(signature)
  );
}

// Express.js route handler example
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-guardian-signature'];
  const payload = JSON.stringify(req.body);
  const webhookSecret = process.env.GUARDIAN_WEBHOOK_SECRET;
  
  if (!verifyWebhookSignature(payload, signature, webhookSecret)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process the webhook event
  const event = req.body;
  console.log('Webhook received:', event);
  
  // Respond with 200 OK to acknowledge receipt
  res.status(200).send('OK');
});`)}
                  className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {copiedSnippet === 'webhook-verification' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Webhook Event Types</h4>
              <div className="bg-gray-50 rounded-lg overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">emergency_alert</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Triggered when an emergency alert is activated</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">threat_detected</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Triggered when a threat is detected</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">geofence_breach</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Triggered when a user enters or exits a geo-fence</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">biometric_anomaly</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Triggered when biometric data shows anomalies</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">face_match</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Triggered when a face match is found</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">voice_alert</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Triggered when voice analysis detects issues</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Webhook Best Practices</h4>
                    <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm mt-2">
                      <li>Always verify webhook signatures</li>
                      <li>Implement idempotency to handle duplicate events</li>
                      <li>Respond quickly (within 5 seconds) to webhook requests</li>
                      <li>Implement retry logic for failed webhook processing</li>
                      <li>Store webhook events in a queue before processing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SDKs & Libraries Section */}
          {activeSection === 'sdks' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">SDKs & Libraries</h3>
              <p className="text-gray-700 mb-4">
                Guardian Sentinel provides official SDKs for various programming languages to simplify integration with our API.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-700 text-lg font-bold">JS</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">JavaScript / TypeScript</h4>
                      <p className="text-sm text-gray-500">For web and Node.js applications</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Installation</span>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">npm install guardian-sentinel</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Version</span>
                      <span className="text-sm text-gray-900">2.3.1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Documentation</span>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">View Docs</a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-700 text-lg font-bold">PY</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Python</h4>
                      <p className="text-sm text-gray-500">For data science and backend applications</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Installation</span>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">pip install guardian-sentinel</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Version</span>
                      <span className="text-sm text-gray-900">1.8.2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Documentation</span>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">View Docs</a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-700 text-lg font-bold">GO</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Go</h4>
                      <p className="text-sm text-gray-500">For high-performance applications</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Installation</span>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">go get github.com/guardian-sentinel/go-sdk</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Version</span>
                      <span className="text-sm text-gray-900">1.2.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Documentation</span>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">View Docs</a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-red-700 text-lg font-bold">JV</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Java</h4>
                      <p className="text-sm text-gray-500">For enterprise applications</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Installation</span>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">maven: com.guardian-sentinel:sdk:1.5.1</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Version</span>
                      <span className="text-sm text-gray-900">1.5.1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Documentation</span>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">View Docs</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">JavaScript SDK Example</h4>
              <div className="relative mb-6">
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`// Initialize the SDK
import { GuardianSentinel } from 'guardian-sentinel';

const guardian = new GuardianSentinel({
  apiKey: 'YOUR_API_KEY',
  environment: 'production', // or 'staging', 'development'
  realtime: true
});

// Voice analysis
async function analyzeVoice(audioData) {
  try {
    const result = await guardian.voice.analyze({
      audio_data: audioData,
      user_id: 'user_123',
      sensitivity: 0.8
    });
    
    console.log('Voice analysis result:', result);
    
    if (result.emotion_state === 'panic' || result.grooming_indicators.length > 0) {
      // Handle threat
      guardian.alerts.trigger({
        type: 'voice_threat',
        data: result
      });
    }
  } catch (error) {
    console.error('Voice analysis failed:', error);
  }
}

// Real-time monitoring
guardian.realtime.connect();

guardian.realtime.on('voice_alert', (data) => {
  console.log('Voice alert received:', data);
  // Handle alert
});

guardian.realtime.on('pose_threat', (data) => {
  console.log('Pose threat received:', data);
  // Handle threat
});

// Cleanup
function cleanup() {
  guardian.realtime.disconnect();
}`}
                </pre>
                <button
                  onClick={() => copySnippet('js-sdk-example', `// Initialize the SDK
import { GuardianSentinel } from 'guardian-sentinel';

const guardian = new GuardianSentinel({
  apiKey: 'YOUR_API_KEY',
  environment: 'production', // or 'staging', 'development'
  realtime: true
});

// Voice analysis
async function analyzeVoice(audioData) {
  try {
    const result = await guardian.voice.analyze({
      audio_data: audioData,
      user_id: 'user_123',
      sensitivity: 0.8
    });
    
    console.log('Voice analysis result:', result);
    
    if (result.emotion_state === 'panic' || result.grooming_indicators.length > 0) {
      // Handle threat
      guardian.alerts.trigger({
        type: 'voice_threat',
        data: result
      });
    }
  } catch (error) {
    console.error('Voice analysis failed:', error);
  }
}

// Real-time monitoring
guardian.realtime.connect();

guardian.realtime.on('voice_alert', (data) => {
  console.log('Voice alert received:', data);
  // Handle alert
});

guardian.realtime.on('pose_threat', (data) => {
  console.log('Pose threat received:', data);
  // Handle threat
});

// Cleanup
function cleanup() {
  guardian.realtime.disconnect();
}`)}
                  className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {copiedSnippet === 'js-sdk-example' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Mobile SDKs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h5 className="font-medium text-gray-900 mb-2">iOS SDK</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Native Swift SDK for iOS applications with background monitoring capabilities.
                  </p>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View iOS Documentation
                  </a>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Android SDK</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Native Kotlin SDK for Android applications with background service support.
                  </p>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Android Documentation
                  </a>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <div className="flex items-start space-x-3">
                  <Code className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Open Source Contributions</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Our SDKs are open source and available on GitHub. We welcome contributions from the community to improve and extend our libraries.
                    </p>
                    <a href="#" className="text-sm text-green-700 underline mt-2 inline-block">
                      Visit our GitHub organization
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deployment Guide Section */}
          {activeSection === 'deployment' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Deployment Guide</h3>
              <p className="text-gray-700 mb-4">
                This guide provides instructions for deploying Guardian Sentinel in various environments, from development to production.
              </p>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">System Requirements</h4>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h5 className="font-medium text-gray-900 mb-2">Minimum Requirements</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Node.js 16.x or higher</li>
                  <li>4GB RAM (8GB recommended)</li>
                  <li>2 CPU cores (4 cores recommended)</li>
                  <li>20GB storage</li>
                  <li>HTTPS-enabled domain</li>
                  <li>PostgreSQL 13+ or compatible database</li>
                </ul>
                
                <h5 className="font-medium text-gray-900 mt-4 mb-2">For Production Environments</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>8GB+ RAM</li>
                  <li>4+ CPU cores</li>
                  <li>100GB+ SSD storage</li>
                  <li>Load balancer for high availability</li>
                  <li>Redis for caching and session management</li>
                  <li>CDN for static assets</li>
                </ul>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Deployment Options</h4>
              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Docker Deployment</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Deploy using Docker containers for easy scaling and management.
                  </p>
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`# Pull the Guardian Sentinel image
docker pull guardiansentinel/api:latest

# Run the container
docker run -d \\
  --name guardian-sentinel \\
  -p 3000:3000 \\
  -e API_KEY=your_api_key \\
  -e DATABASE_URL=postgres://user:password@host:port/dbname \\
  -e REDIS_URL=redis://host:port \\
  -e NODE_ENV=production \\
  guardiansentinel/api:latest`}
                    </pre>
                    <button
                      onClick={() => copySnippet('docker-deployment', `# Pull the Guardian Sentinel image
docker pull guardiansentinel/api:latest

# Run the container
docker run -d \\
  --name guardian-sentinel \\
  -p 3000:3000 \\
  -e API_KEY=your_api_key \\
  -e DATABASE_URL=postgres://user:password@host:port/dbname \\
  -e REDIS_URL=redis://host:port \\
  -e NODE_ENV=production \\
  guardiansentinel/api:latest`)}
                      className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                    >
                      {copiedSnippet === 'docker-deployment' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Kubernetes Deployment</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Deploy on Kubernetes for advanced orchestration and scaling.
                  </p>
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`# Apply Kubernetes configuration
kubectl apply -f https://raw.githubusercontent.com/guardian-sentinel/k8s-configs/main/deployment.yaml

# Check deployment status
kubectl get deployments -n guardian-sentinel

# Scale the deployment
kubectl scale deployment guardian-sentinel --replicas=3 -n guardian-sentinel`}
                    </pre>
                    <button
                      onClick={() => copySnippet('k8s-deployment', `# Apply Kubernetes configuration
kubectl apply -f https://raw.githubusercontent.com/guardian-sentinel/k8s-configs/main/deployment.yaml

# Check deployment status
kubectl get deployments -n guardian-sentinel

# Scale the deployment
kubectl scale deployment guardian-sentinel --replicas=3 -n guardian-sentinel`)}
                      className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                    >
                      {copiedSnippet === 'k8s-deployment' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Serverless Deployment</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Deploy as serverless functions for automatic scaling and cost optimization.
                  </p>
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`# Deploy with Serverless Framework
npm install -g serverless
serverless deploy --stage production

# Deploy with AWS CDK
cdk deploy GuardianSentinelStack

# Deploy with Google Cloud Functions
gcloud functions deploy guardian-sentinel \\
  --runtime nodejs16 \\
  --trigger-http \\
  --allow-unauthenticated`}
                    </pre>
                    <button
                      onClick={() => copySnippet('serverless-deployment', `# Deploy with Serverless Framework
npm install -g serverless
serverless deploy --stage production

# Deploy with AWS CDK
cdk deploy GuardianSentinelStack

# Deploy with Google Cloud Functions
gcloud functions deploy guardian-sentinel \\
  --runtime nodejs16 \\
  --trigger-http \\
  --allow-unauthenticated`)}
                      className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                    >
                      {copiedSnippet === 'serverless-deployment' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Environment Variables</h4>
              <div className="bg-gray-50 rounded-lg overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variable</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">API_KEY</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Your Guardian Sentinel API key</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">DATABASE_URL</td>
                      <td className="px-4 py-3 text-sm text-gray-500">PostgreSQL connection string</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">REDIS_URL</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Redis connection string</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">NODE_ENV</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Environment (development, staging, production)</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">PORT</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Port to run the server on</td>
                      <td className="px-4 py-3 text-sm text-gray-500">No (default: 3000)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">LOG_LEVEL</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Logging level (debug, info, warn, error)</td>
                      <td className="px-4 py-3 text-sm text-gray-500">No (default: info)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">WEBHOOK_SECRET</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Secret for webhook signature verification</td>
                      <td className="px-4 py-3 text-sm text-gray-500">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Health Checks</h4>
              <p className="text-gray-700 mb-3">
                Guardian Sentinel provides health check endpoints to monitor the status of your deployment:
              </p>
              
              <div className="relative mb-6">
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
{`# Basic health check
GET /health

# Response
{
  "status": "ok",
  "version": "2.0.0",
  "uptime": 3600,
  "services": {
    "database": "connected",
    "redis": "connected",
    "ai_models": "loaded"
  }
}

# Detailed health check (requires authentication)
GET /health/detailed

# Response
{
  "status": "ok",
  "version": "2.0.0",
  "uptime": 3600,
  "memory_usage": {
    "rss": "256MB",
    "heapTotal": "128MB",
    "heapUsed": "96MB"
  },
  "services": {
    "database": {
      "status": "connected",
      "latency_ms": 5,
      "connections": 10
    },
    "redis": {
      "status": "connected",
      "latency_ms": 2
    },
    "ai_models": {
      "status": "loaded",
      "models": ["voice", "pose", "face", "location"]
    }
  }
}`}
                </pre>
                <button
                  onClick={() => copySnippet('health-check', `# Basic health check
GET /health

# Response
{
  "status": "ok",
  "version": "2.0.0",
  "uptime": 3600,
  "services": {
    "database": "connected",
    "redis": "connected",
    "ai_models": "loaded"
  }
}

# Detailed health check (requires authentication)
GET /health/detailed

# Response
{
  "status": "ok",
  "version": "2.0.0",
  "uptime": 3600,
  "memory_usage": {
    "rss": "256MB",
    "heapTotal": "128MB",
    "heapUsed": "96MB"
  },
  "services": {
    "database": {
      "status": "connected",
      "latency_ms": 5,
      "connections": 10
    },
    "redis": {
      "status": "connected",
      "latency_ms": 2
    },
    "ai_models": {
      "status": "loaded",
      "models": ["voice", "pose", "face", "location"]
    }
  }
}`)}
                  className="absolute top-2 right-2 p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {copiedSnippet === 'health-check' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-start space-x-3">
                  <Rocket className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Deployment Support</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Need help with deployment? Our team is available to assist with custom deployment configurations and enterprise integrations.
                    </p>
                    <a href="#" className="text-sm text-blue-700 underline mt-2 inline-block">
                      Contact our deployment team
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Additional icon components
const AlertTriangle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const Rocket = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
  </svg>
);

export default APIDocumentationPanel;