import React, { useState, useEffect } from 'react';
import { Shield, Brain, Eye, MapPin, Activity, BarChart3, Mic, Camera, Heart, AlertTriangle, Navigation, Globe, Users, Settings, Atom, ClipboardList, FileText, Rocket, Zap, Bell } from 'lucide-react';
import LiveMapModule from './LiveMapModule';
import EmergencyButtonModule from './EmergencyButtonModule';
import VoiceGuardianModule from './VoiceGuardianModule';
import PoseThreatModule from './PoseThreatModule';
import FaceMatchModule from './FaceMatchModule';
import GeoShieldModule from './GeoShieldModule';
import BiometricDashboard from './BiometricDashboard';
import RiskScoringModule from './RiskScoringModule';
import AccessibilityModule from './AccessibilityModule';
import BlockchainLog from './BlockchainLog';
import AdvancedFeaturesTab from './AdvancedFeaturesTab';
import UserSettingsPanel from './UserSettingsPanel';
import AnalyticsReportPanel from './AnalyticsReportPanel';
import SafetyPlanningModule from './SafetyPlanningModule';
import RealTimeMonitoringPanel from './RealTimeMonitoringPanel';
import DeploymentPanel from './DeploymentPanel';
import AIFeatureShowcase from './AIFeatureShowcase';
import AdvancedNeuralNetworkVisualizer from './AdvancedNeuralNetworkVisualizer';
import EdgeAIProcessingModule from './EdgeAIProcessingModule';
import { RealtimeOrchestrator } from '../services/RealtimeOrchestrator';
import RealTimeAPIService from '../services/RealTimeAPIService';

interface Tab {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType<any>;
  badge?: number;
}

const TabbedDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [alerts, setAlerts] = useState(0);

  useEffect(() => {
    // Initialize the real-time orchestrator
    const orchestrator = RealtimeOrchestrator.getInstance();
    
    // Initialize the real-time API service
    const realTimeAPI = RealTimeAPIService.getInstance();
    
    const initializeRealtime = async () => {
      console.log('🚀 Guardian Sentinel Advanced AI Platform Initializing...');
      
      try {
        // Connect to real-time APIs
        await realTimeAPI.connect();
        
        // Start real-time monitoring
        await orchestrator.startRealtimeMonitoring();
        console.log('✅ Real-time monitoring fully operational');
        
        // Update system status every 5 seconds
        const statusInterval = setInterval(() => {
          const status = orchestrator.getSystemStatus();
          setSystemStatus(status);
          setAlerts(status.activeAlerts || 0);
        }, 5000);
        
        return () => clearInterval(statusInterval);
      } catch (error) {
        console.error('Failed to initialize real-time monitoring:', error);
      }
    };
    
    initializeRealtime();
    
    return () => {
      orchestrator.stopRealtimeMonitoring();
      realTimeAPI.disconnect();
    };
  }, []);

  const tabs: Tab[] = [
    {
      id: 'overview',
      name: 'Overview',
      icon: Shield,
      component: OverviewTab
    },
    {
      id: 'monitoring',
      name: 'AI Monitoring',
      icon: Brain,
      component: MonitoringTab
    },
    {
      id: 'advanced',
      name: 'Advanced AI',
      icon: Atom,
      component: AdvancedFeaturesTab
    },
    {
      id: 'location',
      name: 'Location & Map',
      icon: MapPin,
      component: LocationTab
    },
    {
      id: 'emergency',
      name: 'Emergency',
      icon: AlertTriangle,
      component: EmergencyTab,
      badge: alerts
    },
    {
      id: 'accessibility',
      name: 'Accessibility',
      icon: Users,
      component: AccessibilityTab
    },
    {
      id: 'blockchain',
      name: 'Evidence Log',
      icon: BarChart3,
      component: BlockchainTab
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: FileText,
      component: AnalyticsTab
    },
    {
      id: 'planning',
      name: 'Safety Planning',
      icon: ClipboardList,
      component: PlanningTab
    },
    {
      id: 'realtime',
      name: 'Real-Time API',
      icon: Zap,
      component: RealTimeTab
    },
    {
      id: 'deployment',
      name: 'Deployment',
      icon: Rocket,
      component: DeploymentTab
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      component: SettingsTab
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Compact Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Guardian Sentinel</h1>
                  <p className="text-xs text-gray-600">Advanced AI Security Platform</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full animate-pulse">
                  🧠 AI ACTIVE
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  🔐 SECURE
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                  ⚡ REAL-TIME
                </span>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                  🚀 QUANTUM
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">All Systems Operational</span>
              </div>
              
              <div className="text-xs text-gray-600">
                <div className="font-medium">{new Date().toLocaleDateString()}</div>
                <div className="text-xs">{new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                  {tab.badge && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {tabs.map((tab) => {
          const Component = tab.component;
          return (
            <div
              key={tab.id}
              className={activeTab === tab.id ? 'block' : 'hidden'}
            >
              <Component />
            </div>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">
                © 2025 Guardian Sentinel. Advanced AI Security Platform.
              </p>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600">AI Active</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-600">Real-time</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-purple-600">Blockchain</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-orange-600">Quantum</span>
                </div>
              </div>
            </div>
            <a 
              href="https://bolt.new" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-lg">⚡</span>
              <span>Built with Bolt.new</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Overview Tab Component
const OverviewTab: React.FC = () => (
  <div className="space-y-6">
    {/* Real-time Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 transform hover:scale-105 transition-transform">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Protected Users</p>
            <p className="text-2xl font-bold text-blue-600">2,847</p>
            <p className="text-xs text-green-600">+12 today</p>
          </div>
          <Shield className="w-6 h-6 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 transform hover:scale-105 transition-transform">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">AI Threats Blocked</p>
            <p className="text-2xl font-bold text-green-600">156</p>
            <p className="text-xs text-green-600">+8 today</p>
          </div>
          <Brain className="w-6 h-6 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 transform hover:scale-105 transition-transform">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Face Matches</p>
            <p className="text-2xl font-bold text-purple-600">23</p>
            <p className="text-xs text-orange-600">+2 today</p>
          </div>
          <Eye className="w-6 h-6 text-purple-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 transform hover:scale-105 transition-transform">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Geo Alerts</p>
            <p className="text-2xl font-bold text-orange-600">8</p>
            <p className="text-xs text-red-600">+3 today</p>
          </div>
          <MapPin className="w-6 h-6 text-orange-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 transform hover:scale-105 transition-transform">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Pose Anomalies</p>
            <p className="text-2xl font-bold text-red-600">12</p>
            <p className="text-xs text-red-600">+1 today</p>
          </div>
          <Activity className="w-6 h-6 text-red-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 transform hover:scale-105 transition-transform">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg Response</p>
            <p className="text-2xl font-bold text-indigo-600">0.8s</p>
            <p className="text-xs text-green-600">-0.2s today</p>
          </div>
          <BarChart3 className="w-6 h-6 text-indigo-500" />
        </div>
      </div>
    </div>

    {/* Main Overview Grid */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2">
        <LiveMapModule />
      </div>
      <div>
        <RiskScoringModule />
      </div>
    </div>

    {/* Real-Time Monitoring Panel */}
    <RealTimeMonitoringPanel />

    {/* AI Features Showcase */}
    <AIFeatureShowcase />

    {/* Neural Network Visualizer */}
    <AdvancedNeuralNetworkVisualizer />

    {/* Edge AI Processing */}
    <EdgeAIProcessingModule />
  </div>
);

// Monitoring Tab Component
const MonitoringTab: React.FC = () => (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
    <VoiceGuardianModule />
    <PoseThreatModule />
    <FaceMatchModule />
    <GeoShieldModule />
  </div>
);

// Location Tab Component
const LocationTab: React.FC = () => (
  <div className="space-y-6">
    <LiveMapModule />
    <GeoShieldModule />
  </div>
);

// Emergency Tab Component
const EmergencyTab: React.FC = () => (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
    <EmergencyButtonModule />
    <BiometricDashboard />
  </div>
);

// Accessibility Tab Component
const AccessibilityTab: React.FC = () => (
  <div className="space-y-6">
    <AccessibilityModule />
  </div>
);

// Blockchain Tab Component
const BlockchainTab: React.FC = () => (
  <div className="space-y-6">
    <BlockchainLog />
  </div>
);

// Analytics Tab Component
const AnalyticsTab: React.FC = () => (
  <div className="space-y-6">
    <AnalyticsReportPanel />
  </div>
);

// Planning Tab Component
const PlanningTab: React.FC = () => (
  <div className="space-y-6">
    <SafetyPlanningModule />
  </div>
);

// Real-Time API Tab Component
const RealTimeTab: React.FC = () => (
  <div className="space-y-6">
    <RealTimeMonitoringPanel />
  </div>
);

// Deployment Tab Component
const DeploymentTab: React.FC = () => (
  <div className="space-y-6">
    <DeploymentPanel />
  </div>
);

// Settings Tab Component
const SettingsTab: React.FC = () => (
  <div className="space-y-6">
    <UserSettingsPanel />
  </div>
);

export default TabbedDashboard;