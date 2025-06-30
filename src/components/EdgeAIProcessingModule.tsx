import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Smartphone, Wifi, WifiOff, BarChart3, RefreshCw, Check, Clock, Shield } from 'lucide-react';

interface ProcessingMetrics {
  edgeLatency: number;
  cloudLatency: number;
  batteryImpact: number;
  dataUsage: number;
  privacyScore: number;
  offlineCapability: number;
}

interface ProcessingMode {
  id: string;
  name: string;
  description: string;
  metrics: ProcessingMetrics;
}

const EdgeAIProcessingModule: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState('hybrid');
  const [isOnline, setIsOnline] = useState(true);
  const [processingMetrics, setProcessingMetrics] = useState<ProcessingMetrics>({
    edgeLatency: 0,
    cloudLatency: 0,
    batteryImpact: 0,
    dataUsage: 0,
    privacyScore: 0,
    offlineCapability: 0
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingHistory, setProcessingHistory] = useState<Array<{
    timestamp: Date;
    type: string;
    location: string;
    latency: number;
    success: boolean;
  }>>([]);

  const processingModes: ProcessingMode[] = [
    {
      id: 'edge',
      name: 'Edge-Only',
      description: 'Process all AI workloads on-device for maximum privacy and offline capability',
      metrics: {
        edgeLatency: 120,
        cloudLatency: 0,
        batteryImpact: 85,
        dataUsage: 5,
        privacyScore: 95,
        offlineCapability: 100
      }
    },
    {
      id: 'cloud',
      name: 'Cloud-Only',
      description: 'Process all AI workloads in the cloud for maximum performance and accuracy',
      metrics: {
        edgeLatency: 10,
        cloudLatency: 250,
        batteryImpact: 15,
        dataUsage: 90,
        privacyScore: 60,
        offlineCapability: 10
      }
    },
    {
      id: 'hybrid',
      name: 'Hybrid Processing',
      description: 'Intelligently balance workloads between device and cloud for optimal performance',
      metrics: {
        edgeLatency: 50,
        cloudLatency: 150,
        batteryImpact: 40,
        dataUsage: 45,
        privacyScore: 85,
        offlineCapability: 75
      }
    },
    {
      id: 'adaptive',
      name: 'Adaptive AI',
      description: 'Dynamically adjust processing location based on context, battery, and connectivity',
      metrics: {
        edgeLatency: 35,
        cloudLatency: 120,
        batteryImpact: 30,
        dataUsage: 30,
        privacyScore: 90,
        offlineCapability: 85
      }
    }
  ];

  useEffect(() => {
    // Set initial metrics based on selected mode
    const selectedModeData = processingModes.find(mode => mode.id === selectedMode);
    if (selectedModeData) {
      setProcessingMetrics(selectedModeData.metrics);
    }
    
    // Simulate processing events
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of processing event
        simulateProcessingEvent();
      }
    }, 3000);
    
    // Simulate connectivity changes
    const connectivityInterval = setInterval(() => {
      if (Math.random() > 0.9) { // 10% chance of connectivity change
        setIsOnline(prev => !prev);
      }
    }, 10000);
    
    return () => {
      clearInterval(interval);
      clearInterval(connectivityInterval);
    };
  }, [selectedMode]);

  const simulateProcessingEvent = () => {
    setIsProcessing(true);
    
    // Get selected mode metrics
    const modeMetrics = processingModes.find(mode => mode.id === selectedMode)?.metrics;
    
    // Calculate processing time based on mode and online status
    const edgeTime = modeMetrics?.edgeLatency || 50;
    const cloudTime = modeMetrics?.cloudLatency || 150;
    const totalTime = isOnline ? edgeTime + cloudTime : edgeTime * 1.5;
    
    // Simulate processing delay
    setTimeout(() => {
      // Create processing record
      const eventTypes = ['Voice Analysis', 'Pose Detection', 'Face Recognition', 'Biometric Processing'];
      const locations = ['Home', 'School', 'Park', 'Downtown', 'Shopping Mall'];
      
      const newEvent = {
        timestamp: new Date(),
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        latency: totalTime,
        success: Math.random() > 0.05 // 95% success rate
      };
      
      setProcessingHistory(prev => [newEvent, ...prev.slice(0, 9)]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleModeChange = (modeId: string) => {
    setSelectedMode(modeId);
    
    // Update metrics based on selected mode
    const selectedModeData = processingModes.find(mode => mode.id === modeId);
    if (selectedModeData) {
      setProcessingMetrics(selectedModeData.metrics);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Cpu className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Edge AI Processing</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-medium">Offline</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Processing Mode Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">AI Processing Mode</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {processingModes.map(mode => (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id)}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  selectedMode === mode.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">{mode.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{mode.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Processing Latency</h4>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-blue-700">Edge Processing</span>
                    <span className="text-sm font-medium text-blue-900">{processingMetrics.edgeLatency} ms</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min(100, (processingMetrics.edgeLatency / 200) * 100)}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-blue-700">Cloud Processing</span>
                    <span className="text-sm font-medium text-blue-900">{processingMetrics.cloudLatency} ms</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min(100, (processingMetrics.cloudLatency / 300) * 100)}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-blue-700">Total Latency</span>
                    <span className="text-sm font-medium text-blue-900">
                      {isOnline 
                        ? processingMetrics.edgeLatency + processingMetrics.cloudLatency 
                        : Math.round(processingMetrics.edgeLatency * 1.5)} ms
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ 
                        width: `${Math.min(100, ((isOnline 
                          ? processingMetrics.edgeLatency + processingMetrics.cloudLatency 
                          : processingMetrics.edgeLatency * 1.5) / 500) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-900">Privacy & Reliability</h4>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-green-700">Privacy Score</span>
                    <span className="text-sm font-medium text-green-900">{processingMetrics.privacyScore}%</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${processingMetrics.privacyScore}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-green-700">Offline Capability</span>
                    <span className="text-sm font-medium text-green-900">{processingMetrics.offlineCapability}%</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${processingMetrics.offlineCapability}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-green-700">Current Status</span>
                    <span className={`text-sm font-medium ${isOnline ? 'text-green-900' : 'text-orange-600'}`}>
                      {isOnline ? 'Online Processing' : 'Offline Processing'}
                    </span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${isOnline ? 'bg-green-600' : 'bg-orange-500'}`}
                      style={{ width: isOnline ? '100%' : `${processingMetrics.offlineCapability}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
              <div className="flex items-center space-x-2 mb-2">
                <Smartphone className="w-5 h-5 text-orange-600" />
                <h4 className="font-medium text-orange-900">Device Impact</h4>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-orange-700">Battery Impact</span>
                    <span className="text-sm font-medium text-orange-900">{processingMetrics.batteryImpact}%</span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full"
                      style={{ width: `${processingMetrics.batteryImpact}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-orange-700">Data Usage</span>
                    <span className="text-sm font-medium text-orange-900">{processingMetrics.dataUsage}%</span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full"
                      style={{ width: `${processingMetrics.dataUsage}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-orange-700">Processing Status</span>
                    <span className={`text-sm font-medium ${isProcessing ? 'text-blue-600' : 'text-green-600'}`}>
                      {isProcessing ? 'Processing...' : 'Ready'}
                    </span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${isProcessing ? 'bg-blue-600' : 'bg-green-600'}`}
                      style={{ width: isProcessing ? '100%' : '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Processing History */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-gray-900">Recent Processing Events</h3>
            <button
              onClick={simulateProcessingEvent}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>Simulate Event</span>
            </button>
          </div>
          
          {processingHistory.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <Cpu className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No processing events yet</p>
              <p className="text-sm text-gray-400 mt-1">Events will appear as AI processing occurs</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Latency
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {processingHistory.map((event, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.timestamp.toLocaleTimeString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{event.type}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.latency} ms
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {event.success ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check className="w-3 h-3 mr-1" />
                            Success
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <X className="w-3 h-3 mr-1" />
                            Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Technical Information */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-start space-x-3">
            <Cpu className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">About Edge AI Processing</h4>
              <p className="text-sm text-blue-700 mt-1">
                Guardian Sentinel uses TensorFlow Lite and CoreML optimized models to run advanced AI directly on your device. This enables real-time threat detection even without internet connectivity, while preserving privacy by keeping sensitive data local. The adaptive processing system intelligently balances workloads between your device and secure cloud infrastructure based on battery level, connectivity, and processing requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgeAIProcessingModule;