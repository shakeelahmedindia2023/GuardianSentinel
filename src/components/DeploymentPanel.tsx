import React, { useState, useEffect } from 'react';
import { Rocket, Server, Check, X, RefreshCw, Download, Globe, Shield, Zap, Database, Cloud, Activity } from 'lucide-react';
import DeploymentService, { DeploymentStatus, DeploymentConfig } from '../services/DeploymentService';

const DeploymentPanel: React.FC = () => {
  const [deployments, setDeployments] = useState<DeploymentStatus[]>([]);
  const [latestDeployment, setLatestDeployment] = useState<DeploymentStatus | undefined>(undefined);
  const [config, setConfig] = useState<DeploymentConfig | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<'development' | 'staging' | 'production'>('development');
  const [showConfigModal, setShowConfigModal] = useState(false);

  useEffect(() => {
    const deploymentService = DeploymentService.getInstance();
    
    // Get current configuration
    setConfig(deploymentService.getConfig());
    
    // Get all deployments
    setDeployments(deploymentService.getAllDeployments());
    
    // Get latest deployment
    setLatestDeployment(deploymentService.getLatestDeployment());
    
    // Poll for deployment updates
    const interval = setInterval(() => {
      setDeployments(deploymentService.getAllDeployments());
      setLatestDeployment(deploymentService.getLatestDeployment());
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    try {
      const deploymentService = DeploymentService.getInstance();
      const deploymentId = await deploymentService.deploy(selectedEnvironment);
      
      // Wait for deployment to complete
      const checkDeployment = setInterval(() => {
        const status = deploymentService.getDeploymentStatus(deploymentId);
        if (status && (status.status === 'deployed' || status.status === 'failed')) {
          clearInterval(checkDeployment);
          setIsDeploying(false);
          setDeployments(deploymentService.getAllDeployments());
          setLatestDeployment(status);
        }
      }, 1000);
    } catch (error) {
      console.error('Deployment failed:', error);
      setIsDeploying(false);
    }
  };

  const handleConfigChange = (key: string, value: any) => {
    if (!config) return;
    
    const deploymentService = DeploymentService.getInstance();
    
    if (key.includes('.')) {
      // Handle nested properties
      const [parent, child] = key.split('.');
      const updatedConfig = {
        ...config,
        [parent]: {
          ...config[parent],
          [child]: value
        }
      };
      setConfig(updatedConfig);
      deploymentService.updateConfig(updatedConfig);
    } else {
      // Handle top-level properties
      const updatedConfig = {
        ...config,
        [key]: value
      };
      setConfig(updatedConfig);
      deploymentService.updateConfig(updatedConfig);
    }
  };

  const getStatusColor = (status: DeploymentStatus['status']) => {
    switch (status) {
      case 'deployed': return 'text-green-600';
      case 'deploying': return 'text-blue-600';
      case 'pending': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
    }
  };

  const getStatusIcon = (status: DeploymentStatus['status']) => {
    switch (status) {
      case 'deployed': return <Check className="w-5 h-5 text-green-600" />;
      case 'deploying': return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'failed': return <X className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Rocket className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Deployment Center</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowConfigModal(true)}
              className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Server className="w-4 h-4" />
              <span>Configuration</span>
            </button>
            
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="flex items-center space-x-1 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors"
            >
              {isDeploying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Deploying...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  <span>Deploy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Deployment Environment Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Deployment Environment</h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedEnvironment('development')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedEnvironment === 'development'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Server className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <p className="font-medium text-gray-900">Development</p>
              <p className="text-xs text-gray-500 mt-1">For testing and development</p>
            </button>
            
            <button
              onClick={() => setSelectedEnvironment('staging')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedEnvironment === 'staging'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Server className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <p className="font-medium text-gray-900">Staging</p>
              <p className="text-xs text-gray-500 mt-1">For pre-production testing</p>
            </button>
            
            <button
              onClick={() => setSelectedEnvironment('production')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedEnvironment === 'production'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Globe className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <p className="font-medium text-gray-900">Production</p>
              <p className="text-xs text-gray-500 mt-1">For live deployment</p>
            </button>
          </div>
        </div>

        {/* Latest Deployment Status */}
        {latestDeployment && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Latest Deployment</h3>
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(latestDeployment.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Deployment {latestDeployment.id.substring(0, 8)}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Started: {new Date(latestDeployment.startTime).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    latestDeployment.status === 'deployed' ? 'bg-green-100 text-green-800' :
                    latestDeployment.status === 'deploying' ? 'bg-blue-100 text-blue-800' :
                    latestDeployment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {latestDeployment.status.toUpperCase()}
                  </span>
                  
                  {latestDeployment.url && (
                    <a
                      href={latestDeployment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
                    >
                      <Globe className="w-3 h-3 inline mr-1" />
                      Visit
                    </a>
                  )}
                </div>
              </div>
              
              {latestDeployment.status === 'failed' && latestDeployment.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800">
                    <X className="w-4 h-4 inline mr-1" />
                    Error: {latestDeployment.error}
                  </p>
                </div>
              )}
              
              <div className="bg-gray-900 text-gray-300 rounded-md p-3 font-mono text-xs h-40 overflow-y-auto">
                {latestDeployment.logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    <span className="text-gray-500">[{index + 1}]</span> {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Deployment Features */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Deployment Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Real-Time Processing</h4>
              </div>
              <p className="text-sm text-blue-700">
                Sub-100ms event processing with distributed event queue
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">Enabled</span>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <h4 className="font-medium text-purple-900">Advanced Security</h4>
              </div>
              <p className="text-sm text-purple-700">
                End-to-end encryption with quantum-resistant algorithms
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">Enabled</span>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center space-x-2 mb-2">
                <Database className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-900">Blockchain Evidence</h4>
              </div>
              <p className="text-sm text-green-700">
                Immutable evidence storage with zero-knowledge proofs
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">Enabled</span>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
              <div className="flex items-center space-x-2 mb-2">
                <Cloud className="w-5 h-5 text-orange-600" />
                <h4 className="font-medium text-orange-900">Auto-Scaling</h4>
              </div>
              <p className="text-sm text-orange-700">
                Automatic resource scaling based on demand
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">Enabled</span>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4 border border-red-100">
              <div className="flex items-center space-x-2 mb-2">
                <Bell className="w-5 h-5 text-red-600" />
                <h4 className="font-medium text-red-900">Emergency Alerts</h4>
              </div>
              <p className="text-sm text-red-700">
                Multi-channel emergency notification system
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">Enabled</span>
              </div>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-teal-600" />
                <h4 className="font-medium text-teal-900">Health Monitoring</h4>
              </div>
              <p className="text-sm text-teal-700">
                Continuous system health and performance monitoring
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600">Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment History */}
        {deployments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Deployment History</h3>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deployments.map(deployment => (
                    <tr key={deployment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {deployment.id.substring(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          deployment.status === 'deployed' ? 'bg-green-100 text-green-800' :
                          deployment.status === 'deploying' ? 'bg-blue-100 text-blue-800' :
                          deployment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {deployment.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(deployment.startTime).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {deployment.endTime 
                          ? `${Math.round((deployment.endTime.getTime() - deployment.startTime.getTime()) / 1000)}s` 
                          : 'In progress'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {deployment.url ? (
                          <a 
                            href={deployment.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {deployment.url.replace('https://', '')}
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Configuration Modal */}
      {showConfigModal && config && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Deployment Configuration</h3>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {/* Basic Configuration */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Basic Configuration</h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="config-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Application Name
                      </label>
                      <input
                        id="config-name"
                        type="text"
                        value={config.name}
                        onChange={(e) => handleConfigChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="config-version" className="block text-sm font-medium text-gray-700 mb-1">
                        Version
                      </label>
                      <input
                        id="config-version"
                        type="text"
                        value={config.version}
                        onChange={(e) => handleConfigChange('version', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Services Configuration */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Services</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-700">Real-time Processing</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.services.realtime}
                          onChange={(e) => handleConfigChange('services.realtime', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">Analytics</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.services.analytics}
                          onChange={(e) => handleConfigChange('services.analytics', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Link className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-700">Blockchain Evidence</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.services.blockchain}
                          onChange={(e) => handleConfigChange('services.blockchain', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Atom className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Quantum Processing</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.services.quantum}
                          onChange={(e) => handleConfigChange('services.quantum', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Features Configuration */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Enabled Features</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {config.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{feature.replace(/-/g, ' ')}</span>
                          <button
                            onClick={() => handleConfigChange('features', config.features.filter(f => f !== feature))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Add new feature..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value) {
                            handleConfigChange('features', [...config.features, e.currentTarget.value]);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Additional icon components
const Link = ({ className }: { className?: string }) => (
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
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

const Atom = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="1"></circle>
    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"></path>
    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"></path>
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

const Clock = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const BarChart3 = ({ className }: { className?: string }) => (
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
    <path d="M3 3v18h18"></path>
    <path d="M18 17V9"></path>
    <path d="M13 17V5"></path>
    <path d="M8 17v-3"></path>
  </svg>
);

export default DeploymentPanel;