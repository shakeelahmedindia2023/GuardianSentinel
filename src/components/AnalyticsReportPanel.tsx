import React, { useState, useEffect } from 'react';
import { BarChart3, PieChart, LineChart, Calendar, Download, Filter, Clock, Shield, AlertTriangle, Map, Activity, Mic, Camera, Heart, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartPieChart, Pie, Cell, LineChart as RechartLineChart, Line } from 'recharts';

const AnalyticsReportPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    generateReport();
  }, [timeRange]);

  const generateReport = () => {
    setIsLoading(true);
    
    // Simulate API call to generate report
    setTimeout(() => {
      setReportData(generateMockReportData(timeRange));
      setIsLoading(false);
    }, 1000);
  };

  const generateMockReportData = (range: string) => {
    // Generate mock data based on time range
    const days = range === '24h' ? 1 : range === '7d' ? 7 : range === '30d' ? 30 : 90;
    
    // Generate daily data points
    const dailyData = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      dailyData.push({
        date: date.toISOString().split('T')[0],
        alerts: Math.floor(Math.random() * 10),
        threats: Math.floor(Math.random() * 5),
        safetyScore: 70 + Math.floor(Math.random() * 30),
        responseTime: 0.5 + Math.random() * 2
      });
    }
    
    // Reverse to get chronological order
    dailyData.reverse();
    
    // Generate threat type distribution
    const threatTypes = [
      { name: 'Voice Threats', value: 20 + Math.floor(Math.random() * 30) },
      { name: 'Pose Threats', value: 15 + Math.floor(Math.random() * 25) },
      { name: 'Face Matches', value: 10 + Math.floor(Math.random() * 20) },
      { name: 'Geo Alerts', value: 25 + Math.floor(Math.random() * 35) },
      { name: 'Biometric', value: 5 + Math.floor(Math.random() * 15) }
    ];
    
    // Generate severity distribution
    const severityDistribution = [
      { name: 'Low', value: 40 + Math.floor(Math.random() * 30) },
      { name: 'Medium', value: 20 + Math.floor(Math.random() * 20) },
      { name: 'High', value: 10 + Math.floor(Math.random() * 15) },
      { name: 'Critical', value: 5 + Math.floor(Math.random() * 10) }
    ];
    
    // Generate response effectiveness
    const responseEffectiveness = [
      { name: 'Immediate Resolution', value: 60 + Math.floor(Math.random() * 20) },
      { name: 'Escalated', value: 20 + Math.floor(Math.random() * 15) },
      { name: 'Required Intervention', value: 10 + Math.floor(Math.random() * 10) },
      { name: 'False Positive', value: 5 + Math.floor(Math.random() * 5) }
    ];
    
    // Generate summary statistics
    const totalAlerts = dailyData.reduce((sum, day) => sum + day.alerts, 0);
    const totalThreats = dailyData.reduce((sum, day) => sum + day.threats, 0);
    const avgSafetyScore = dailyData.reduce((sum, day) => sum + day.safetyScore, 0) / dailyData.length;
    const avgResponseTime = dailyData.reduce((sum, day) => sum + day.responseTime, 0) / dailyData.length;
    
    return {
      dailyData,
      threatTypes,
      severityDistribution,
      responseEffectiveness,
      summary: {
        totalAlerts,
        totalThreats,
        avgSafetyScore,
        avgResponseTime,
        falsePositives: Math.floor(totalAlerts * 0.08), // 8% false positives
        criticalIncidents: Math.floor(totalThreats * 0.15), // 15% critical
        preventedIncidents: Math.floor(totalThreats * 0.85) // 85% prevented
      }
    };
  };

  const downloadReport = () => {
    // In a real app, would generate and download a PDF or CSV
    alert('Report download functionality would be implemented here');
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const SEVERITY_COLORS = ['#4ade80', '#facc15', '#f97316', '#ef4444'];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Safety Analytics & Reporting</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            
            <button
              onClick={downloadReport}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('threats')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'threats'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            Threat Analysis
          </button>
          <button
            onClick={() => setActiveTab('location')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'location'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Map className="w-4 h-4 inline mr-2" />
            Location Insights
          </button>
          <button
            onClick={() => setActiveTab('biometric')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'biometric'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Heart className="w-4 h-4 inline mr-2" />
            Biometric Trends
          </button>
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Generating analytics report...</p>
          </div>
        ) : reportData ? (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Total Alerts</p>
                        <p className="text-2xl font-bold text-blue-800">{reportData.summary.totalAlerts}</p>
                      </div>
                      <Bell className="w-8 h-8 text-blue-400" />
                    </div>
                  </div>
                  
                  <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-600">Threats Detected</p>
                        <p className="text-2xl font-bold text-red-800">{reportData.summary.totalThreats}</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600">Avg Safety Score</p>
                        <p className="text-2xl font-bold text-green-800">{reportData.summary.avgSafetyScore.toFixed(1)}</p>
                      </div>
                      <Shield className="w-8 h-8 text-green-400" />
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-600">Avg Response Time</p>
                        <p className="text-2xl font-bold text-purple-800">{reportData.summary.avgResponseTime.toFixed(1)}s</p>
                      </div>
                      <Clock className="w-8 h-8 text-purple-400" />
                    </div>
                  </div>
                </div>
                
                {/* Alert Trend Chart */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Alert Trend</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartLineChart
                        data={reportData.dailyData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="alerts" stroke="#3b82f6" name="Alerts" />
                        <Line type="monotone" dataKey="threats" stroke="#ef4444" name="Threats" />
                      </RechartLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Distribution Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Threat Type Distribution</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartPieChart>
                          <Pie
                            data={reportData.threatTypes}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {reportData.threatTypes.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Severity Distribution</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartPieChart>
                          <Pie
                            data={reportData.severityDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {reportData.severityDistribution.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={SEVERITY_COLORS[index % SEVERITY_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                {/* Key Metrics */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Key Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-5 h-5 text-green-500" />
                        <h4 className="font-medium text-gray-900">Prevented Incidents</h4>
                      </div>
                      <p className="text-3xl font-bold text-green-600">{reportData.summary.preventedIncidents}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {Math.round((reportData.summary.preventedIncidents / reportData.summary.totalThreats) * 100)}% prevention rate
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <h4 className="font-medium text-gray-900">Critical Incidents</h4>
                      </div>
                      <p className="text-3xl font-bold text-red-600">{reportData.summary.criticalIncidents}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {Math.round((reportData.summary.criticalIncidents / reportData.summary.totalThreats) * 100)}% of total threats
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Filter className="w-5 h-5 text-orange-500" />
                        <h4 className="font-medium text-gray-900">False Positives</h4>
                      </div>
                      <p className="text-3xl font-bold text-orange-600">{reportData.summary.falsePositives}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {Math.round((reportData.summary.falsePositives / reportData.summary.totalAlerts) * 100)}% false positive rate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Threat Analysis Tab */}
            {activeTab === 'threats' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Threat Detection by Type</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={reportData.threatTypes}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Response Effectiveness</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartPieChart>
                          <Pie
                            data={reportData.responseEffectiveness}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {reportData.responseEffectiveness.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">AI Detection Confidence</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Voice Analysis</span>
                          <span className="text-sm font-medium text-blue-600">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Pose Analysis</span>
                          <span className="text-sm font-medium text-blue-600">88%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Face Recognition</span>
                          <span className="text-sm font-medium text-blue-600">95%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Geo Analysis</span>
                          <span className="text-sm font-medium text-blue-600">90%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Biometric Analysis</span>
                          <span className="text-sm font-medium text-blue-600">94%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Threat Detection Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-red-900">Critical Threat Detected</h4>
                          <span className="text-sm text-red-600">2 days ago</span>
                        </div>
                        <p className="text-sm text-red-700">
                          Aggressive behavior detected via pose analysis with 94% confidence
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Map className="w-6 h-6 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-orange-900">Danger Zone Entry</h4>
                          <span className="text-sm text-orange-600">3 days ago</span>
                        </div>
                        <p className="text-sm text-orange-700">
                          User entered high-risk area with known criminal activity
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Mic className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-yellow-900">Suspicious Voice Patterns</h4>
                          <span className="text-sm text-yellow-600">5 days ago</span>
                        </div>
                        <p className="text-sm text-yellow-700">
                          Potential grooming language detected in conversation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Location Insights Tab */}
            {activeTab === 'location' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Location Safety Heatmap</h3>
                  <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Location heatmap visualization would appear here</p>
                      <p className="text-sm text-gray-400">Shows safety scores across frequently visited areas</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Safe Zone Compliance</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Home', compliance: 98 },
                            { name: 'School', compliance: 92 },
                            { name: 'Work', compliance: 95 },
                            { name: 'Park', compliance: 85 },
                            { name: 'Mall', compliance: 88 }
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="compliance" name="Compliance %" fill="#4ade80" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Danger Zone Encounters</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-gray-700">High Crime Area</span>
                        </div>
                        <span className="text-sm font-medium text-red-600">3 encounters</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-700">Traffic Accident Zone</span>
                        </div>
                        <span className="text-sm font-medium text-orange-600">5 encounters</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-700">Poor Lighting Area</span>
                        </div>
                        <span className="text-sm font-medium text-yellow-600">7 encounters</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-700">Restricted Zone</span>
                        </div>
                        <span className="text-sm font-medium text-purple-600">1 encounter</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Location-Based Recommendations</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Avoid Downtown Area After 10 PM</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Our analysis shows increased risk in this area during late hours. Consider alternative routes or transportation.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-900">New Safe Route to School</h4>
                          <p className="text-sm text-green-700 mt-1">
                            We've identified a safer route with better lighting and more foot traffic. Open the map to view details.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-purple-900">Add Home as Safe Zone</h4>
                          <p className="text-sm text-purple-700 mt-1">
                            We noticed you spend significant time at this location. Adding it as a safe zone will improve threat detection.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Biometric Trends Tab */}
            {activeTab === 'biometric' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Heart Rate Trends</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartLineChart
                        data={reportData.dailyData.map((day: any) => ({
                          date: day.date,
                          avg: 75 + Math.random() * 10,
                          max: 100 + Math.random() * 50,
                          min: 60 + Math.random() * 10
                        }))}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[50, 180]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="avg" name="Average HR" stroke="#3b82f6" />
                        <Line type="monotone" dataKey="max" name="Maximum HR" stroke="#ef4444" />
                        <Line type="monotone" dataKey="min" name="Minimum HR" stroke="#10b981" />
                      </RechartLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Stress Level Analysis</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartLineChart
                          data={reportData.dailyData.map((day: any) => ({
                            date: day.date,
                            stress: Math.random() * 0.8
                          }))}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[0, 1]} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="stress" name="Stress Level" stroke="#8884d8" />
                        </RechartLineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Movement Patterns</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Walking', value: 45 },
                              { name: 'Running', value: 15 },
                              { name: 'Stationary', value: 35 },
                              { name: 'Unusual', value: 5 }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {reportData.threatTypes.map((_: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Biometric Anomalies</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex items-start space-x-3">
                        <Heart className="w-5 h-5 text-red-500 mt-0.5" />
                        <div>
                          <div className="flex justify-between">
                            <h4 className="font-medium text-red-900">Elevated Heart Rate</h4>
                            <span className="text-sm text-red-600">3 days ago</span>
                          </div>
                          <p className="text-sm text-red-700 mt-1">
                            Heart rate reached 165 BPM for 5 minutes. No corresponding physical activity detected.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="flex items-start space-x-3">
                        <Activity className="w-5 h-5 text-orange-500 mt-0.5" />
                        <div>
                          <div className="flex justify-between">
                            <h4 className="font-medium text-orange-900">Unusual Movement Pattern</h4>
                            <span className="text-sm text-orange-600">1 week ago</span>
                          </div>
                          <p className="text-sm text-orange-700 mt-1">
                            Erratic movement detected for 2 minutes. Classified as potential struggle.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="flex items-start space-x-3">
                        <Activity className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div>
                          <div className="flex justify-between">
                            <h4 className="font-medium text-purple-900">High Stress Period</h4>
                            <span className="text-sm text-purple-600">2 weeks ago</span>
                          </div>
                          <p className="text-sm text-purple-700 mt-1">
                            Sustained high stress levels detected for 45 minutes. Correlated with unknown location.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No report data available</p>
            <button
              onClick={generateReport}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Generate Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsReportPanel;