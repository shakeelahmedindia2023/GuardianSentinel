import React, { useState, useEffect } from 'react';
import { Activity, Zap, Shield, AlertTriangle, Check, RefreshCw, Play, Pause, Wifi, WifiOff, Clock } from 'lucide-react';
import RealTimeAPIService, { RealTimeEvent } from '../services/RealTimeAPIService';

const RealTimeMonitoringPanel: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [queueSize, setQueueSize] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationInterval, setSimulationInterval] = useState<NodeJS.Timeout | null>(null);
  const [recentEvents, setRecentEvents] = useState<RealTimeEvent[]>([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    criticalEvents: 0,
    processingRate: 0,
    avgLatency: 0
  });

  useEffect(() => {
    const realTimeService = RealTimeAPIService.getInstance();
    
    const initialize = async () => {
      const connected = await realTimeService.connect();
      setIsConnected(connected);
      
      // Subscribe to all event types
      realTimeService.subscribe('all', handleRealTimeEvent);
      
      // Update connection status periodically
      const statusInterval = setInterval(() => {
        const status = realTimeService.getConnectionStatus();
        setIsConnected(status.connected);
        setQueueSize(status.queueSize);
      }, 1000);
      
      return () => {
        clearInterval(statusInterval);
        realTimeService.disconnect();
      };
    };
    
    initialize();
  }, []);

  const handleRealTimeEvent = (event: RealTimeEvent) => {
    // Add to recent events
    setRecentEvents(prev => [event, ...prev].slice(0, 10));
    
    // Update stats
    setStats(prev => ({
      totalEvents: prev.totalEvents + 1,
      criticalEvents: prev.criticalEvents + (event.priority === 'critical' ? 1 : 0),
      processingRate: (prev.processingRate * prev.totalEvents + 1) / (prev.totalEvents + 1),
      avgLatency: prev.avgLatency * 0.9 + Math.random() * 100 * 0.1 // Simulate latency
    }));
  };

  const toggleSimulation = () => {
    const realTimeService = RealTimeAPIService.getInstance();
    
    if (isSimulating) {
      // Stop simulation
      if (simulationInterval) {
        clearInterval(simulationInterval);
        setSimulationInterval(null);
      }
      setIsSimulating(false);
    } else {
      // Start simulation
      const interval = setInterval(() => {
        // Generate random event type
        const eventTypes: RealTimeEvent['type'][] = ['voice', 'pose', 'face', 'location', 'biometric', 'environmental'];
        const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        
        // Generate random priority
        const priorities: RealTimeEvent['priority'][] = ['low', 'medium', 'high', 'critical'];
        const weights = [0.4, 0.3, 0.2, 0.1]; // 10% chance of critical events
        
        let priority: RealTimeEvent['priority'] = 'medium';
        const random = Math.random();
        let cumulativeWeight = 0;
        
        for (let i = 0; i < priorities.length; i++) {
          cumulativeWeight += weights[i];
          if (random <= cumulativeWeight) {
            priority = priorities[i];
            break;
          }
        }
        
        // Simulate incoming event
        realTimeService.simulateIncomingEvent(randomType, priority);
      }, 2000);
      
      setSimulationInterval(interval);
      setIsSimulating(true);
    }
  };

  const reconnect = async () => {
    const realTimeService = RealTimeAPIService.getInstance();
    const connected = await realTimeService.connect();
    setIsConnected(connected);
  };

  const getEventTypeIcon = (type: RealTimeEvent['type']) => {
    switch (type) {
      case 'voice': return <Mic className="w-4 h-4 text-purple-500" />;
      case 'pose': return <User className="w-4 h-4 text-blue-500" />;
      case 'face': return <Camera className="w-4 h-4 text-green-500" />;
      case 'location': return <MapPin className="w-4 h-4 text-orange-500" />;
      case 'biometric': return <Heart className="w-4 h-4 text-red-500" />;
      case 'environmental': return <Cloud className="w-4 h-4 text-teal-500" />;
      case 'emergency': return <Bell className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: RealTimeEvent['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900">Real-Time Monitoring</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}></div>
              <span className="text-sm font-medium">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            <button
              onClick={toggleSimulation}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
                isSimulating 
                  ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              {isSimulating ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Stop Simulation</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Simulate Events</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Events</p>
                <p className="text-2xl font-bold text-blue-800">{stats.totalEvents}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Critical Events</p>
                <p className="text-2xl font-bold text-red-800">{stats.criticalEvents}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Processing Rate</p>
                <p className="text-2xl font-bold text-green-800">{stats.processingRate.toFixed(1)}/s</p>
              </div>
              <Zap className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Avg Latency</p>
                <p className="text-2xl font-bold text-purple-800">{stats.avgLatency.toFixed(1)}ms</p>
              </div>
              <Clock className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Event Queue Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900">Event Queue Status</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Queue Size:</span>
              <span className={`text-sm font-medium ${
                queueSize > 10 ? 'text-red-600' : queueSize > 5 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {queueSize} events
              </span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                queueSize > 10 ? 'bg-red-600' : queueSize > 5 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(100, queueSize * 5)}%` }}
            ></div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 flex justify-between">
            <span>0 events</span>
            <span>10 events</span>
            <span>20+ events</span>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Recent Events</h3>
            {!isConnected && (
              <button
                onClick={reconnect}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reconnect</span>
              </button>
            )}
          </div>
          
          {recentEvents.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No events received yet</p>
              <p className="text-sm text-gray-400 mt-1">
                {isConnected ? 'Waiting for incoming events...' : 'Connect to start receiving events'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentEvents.map(event => (
                <div 
                  key={event.id} 
                  className={`flex items-start space-x-3 p-3 rounded-lg border ${getPriorityColor(event.priority)}`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getEventTypeIcon(event.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium capitalize">{event.type} Event</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          event.priority === 'critical' ? 'bg-red-600 text-white' :
                          event.priority === 'high' ? 'bg-orange-600 text-white' :
                          event.priority === 'medium' ? 'bg-yellow-600 text-white' :
                          'bg-green-600 text-white'
                        }`}>
                          {event.priority.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {event.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    
                    <div className="mt-1 text-xs">
                      <pre className="whitespace-pre-wrap font-mono bg-gray-50 p-1 rounded text-gray-700 text-xs">
                        {JSON.stringify(event.data, null, 2).substring(0, 100)}
                        {JSON.stringify(event.data, null, 2).length > 100 ? '...' : ''}
                      </pre>
                    </div>
                    
                    <div className="mt-1 flex items-center space-x-2">
                      <span className={`flex items-center space-x-1 text-xs ${
                        event.processed ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {event.processed ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Processed</span>
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Processing</span>
                          </>
                        )}
                      </span>
                      <span className="text-xs text-gray-500">ID: {event.id.substring(0, 8)}...</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Additional icon components
const Mic = ({ className }: { className?: string }) => (
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
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" x2="12" y1="19" y2="22"></line>
  </svg>
);

const User = ({ className }: { className?: string }) => (
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Camera = ({ className }: { className?: string }) => (
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
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
    <circle cx="12" cy="13" r="3"></circle>
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const Heart = ({ className }: { className?: string }) => (
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
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
  </svg>
);

const Cloud = ({ className }: { className?: string }) => (
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
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
  </svg>
);

const Bell = ({ className }: { className?: string }) => (
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
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
  </svg>
);

export default RealTimeMonitoringPanel;