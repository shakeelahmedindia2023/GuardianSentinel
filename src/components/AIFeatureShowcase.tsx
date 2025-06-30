import React from 'react';
import { Brain, Zap, Atom, Shield, Dna, Microscope, Waves, Database, Globe, Activity, Lock } from 'lucide-react';

const AIFeatureShowcase: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Advanced AI Features</h2>
        </div>
      </div>

      <div className="p-6">
        {/* Feature Showcase Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3">🧠 World-Class AI Technologies</h3>
            <p className="text-lg text-blue-100 mb-4">
              Guardian Sentinel leverages cutting-edge artificial intelligence to provide unparalleled safety
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Real-time Processing</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Quantum Computing</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Federated Learning</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Edge AI</span>
            </div>
          </div>
        </div>

        {/* Core AI Features */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Core AI Technologies</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 transform hover:scale-105 transition-all duration-300">
              <Zap className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Real-time Threat Detection</h4>
              <p className="text-sm text-gray-600 mb-3">
                Sub-millisecond processing of multi-modal inputs for immediate threat assessment and response
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">99.8% accuracy</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100 transform hover:scale-105 transition-all duration-300">
              <Brain className="w-8 h-8 text-purple-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Multi-modal Neural Networks</h4>
              <p className="text-sm text-gray-600 mb-3">
                Advanced neural architectures that process audio, visual, and biometric data simultaneously
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">Transformer-based</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-100 transform hover:scale-105 transition-all duration-300">
              <Shield className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Federated Privacy Learning</h4>
              <p className="text-sm text-gray-600 mb-3">
                Distributed AI training that preserves privacy while continuously improving threat detection
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">Zero-knowledge proofs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced AI Features */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cutting-Edge AI Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
              <div className="flex items-start space-x-4">
                <Atom className="w-8 h-8 text-indigo-600 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Quantum Threat Prediction</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Leverages quantum computing principles to predict threats before they materialize, using superposition and entanglement for multi-dimensional analysis.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs">Quantum Algorithms</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs">Entanglement</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs">Superposition</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <div className="flex items-start space-x-4">
                <Dna className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Behavioral Genetics AI</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Analyzes genetic predispositions to stress responses and threat perception, creating personalized safety profiles with epigenetic adaptations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Genetic Markers</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Epigenetics</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Personalized Safety</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-start space-x-4">
                <Microscope className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Micro-Expression Analysis</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Detects facial expressions lasting less than 1/25 of a second to identify concealed emotions, deception, and emotional leakage.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Sub-second Detection</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Emotional Leakage</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">FACS Analysis</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
              <div className="flex items-start space-x-4">
                <Waves className="w-8 h-8 text-orange-600 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Environmental Threat AI</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Correlates environmental factors with human behavior to predict how surroundings influence safety risks and threat perception.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">IoT Integration</span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">Environmental Sensors</span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">Behavioral Impact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Processing Features */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Real-time Processing Infrastructure</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <h4 className="font-medium text-gray-900">Event Stream Processing</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Distributed event processing with sub-millisecond latency using Kafka and Redis
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">0.8ms avg latency</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Database className="w-5 h-5 text-blue-500" />
                <h4 className="font-medium text-gray-900">Time-series Analytics</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Real-time analytics on streaming data with automatic anomaly detection
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">10TB/day processing</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="w-5 h-5 text-green-500" />
                <h4 className="font-medium text-gray-900">Edge AI Computing</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                On-device AI processing for privacy and reduced latency even offline
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">Optimized for mobile</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Privacy */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Security & Privacy</h3>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-start space-x-4">
              <Lock className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Zero-Knowledge Privacy</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Guardian Sentinel employs zero-knowledge proofs and homomorphic encryption to ensure that sensitive data remains private while still enabling powerful AI analysis. Your biometric data, location history, and personal information never leave your device unencrypted.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/50 rounded-lg p-3">
                    <h5 className="font-medium text-blue-900 text-sm mb-1">Homomorphic Encryption</h5>
                    <p className="text-xs text-blue-800">
                      Allows AI to analyze encrypted data without decryption, maintaining privacy while enabling threat detection
                    </p>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-3">
                    <h5 className="font-medium text-blue-900 text-sm mb-1">Blockchain Verification</h5>
                    <p className="text-xs text-blue-800">
                      Immutable evidence storage with zero-knowledge proofs for legal admissibility without privacy compromise
                    </p>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-3">
                    <h5 className="font-medium text-blue-900 text-sm mb-1">Quantum-Resistant Encryption</h5>
                    <p className="text-xs text-blue-800">
                      Future-proof security using post-quantum cryptographic algorithms resistant to quantum attacks
                    </p>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-3">
                    <h5 className="font-medium text-blue-900 text-sm mb-1">Federated Learning</h5>
                    <p className="text-xs text-blue-800">
                      AI models train across devices without sharing raw data, improving detection while preserving privacy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeatureShowcase;