import React, { useState, useEffect } from 'react';
import { Settings, Bell, Shield, Heart, MapPin, Mic, Camera, User, Save, RefreshCw } from 'lucide-react';

interface AlertThreshold {
  id: string;
  name: string;
  description: string;
  value: number;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  category: 'biometric' | 'location' | 'voice' | 'pose' | 'face';
}

const UserSettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [alertThresholds, setAlertThresholds] = useState<AlertThreshold[]>([
    {
      id: 'heart_rate_high',
      name: 'High Heart Rate',
      description: 'Alert when heart rate exceeds this value (BPM)',
      value: 120,
      defaultValue: 120,
      min: 80,
      max: 200,
      step: 5,
      category: 'biometric'
    },
    {
      id: 'heart_rate_low',
      name: 'Low Heart Rate',
      description: 'Alert when heart rate falls below this value (BPM)',
      value: 50,
      defaultValue: 50,
      min: 30,
      max: 70,
      step: 5,
      category: 'biometric'
    },
    {
      id: 'stress_level',
      name: 'Stress Level',
      description: 'Alert when stress level exceeds this percentage',
      value: 70,
      defaultValue: 70,
      min: 30,
      max: 100,
      step: 5,
      category: 'biometric'
    },
    {
      id: 'safe_zone_radius',
      name: 'Safe Zone Radius',
      description: 'Default radius for safe zones (meters)',
      value: 200,
      defaultValue: 200,
      min: 50,
      max: 1000,
      step: 50,
      category: 'location'
    },
    {
      id: 'danger_zone_alert',
      name: 'Danger Zone Alert',
      description: 'Minimum danger level to trigger alerts (0-100)',
      value: 60,
      defaultValue: 60,
      min: 30,
      max: 100,
      step: 5,
      category: 'location'
    },
    {
      id: 'voice_panic_threshold',
      name: 'Voice Panic Detection',
      description: 'Sensitivity for panic detection in voice (0-100)',
      value: 75,
      defaultValue: 75,
      min: 50,
      max: 100,
      step: 5,
      category: 'voice'
    },
    {
      id: 'pose_threat_threshold',
      name: 'Pose Threat Detection',
      description: 'Threshold for detecting threatening poses (0-100)',
      value: 70,
      defaultValue: 70,
      min: 40,
      max: 100,
      step: 5,
      category: 'pose'
    },
    {
      id: 'face_match_confidence',
      name: 'Face Match Confidence',
      description: 'Minimum confidence for face matching alerts (0-100)',
      value: 85,
      defaultValue: 85,
      min: 60,
      max: 100,
      step: 5,
      category: 'face'
    }
  ]);

  const [userPreferences, setUserPreferences] = useState({
    notificationChannels: {
      email: true,
      sms: true,
      push: true,
      call: false
    },
    privacySettings: {
      shareLocationWithEmergencyContacts: true,
      shareLocationWithAuthorities: true,
      recordAudioDuringEmergency: true,
      recordVideoDuringEmergency: true,
      storeDataOnBlockchain: true
    },
    accessibilitySettings: {
      highContrastMode: false,
      largeText: false,
      screenReader: false,
      hapticFeedback: true,
      voiceCommands: true
    },
    emergencySettings: {
      autoCallEmergencyServices: true,
      autoNotifyContacts: true,
      autoDeploy: true,
      emergencyButtonSensitivity: 3 // seconds
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleThresholdChange = (id: string, value: number) => {
    setAlertThresholds(prev => 
      prev.map(threshold => 
        threshold.id === id ? { ...threshold, value } : threshold
      )
    );
  };

  const resetThresholds = () => {
    setAlertThresholds(prev => 
      prev.map(threshold => ({ ...threshold, value: threshold.defaultValue }))
    );
  };

  const handlePreferenceChange = (category: string, setting: string, value: boolean | number) => {
    setUserPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const saveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call to save settings
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('Settings saved successfully!');
      
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
      
      // In a real app, would save to database
      console.log('Alert thresholds saved:', alertThresholds);
      console.log('User preferences saved:', userPreferences);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">User Settings & Preferences</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'alerts'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Bell className="w-4 h-4 inline mr-2" />
            Alert Thresholds
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'notifications'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Bell className="w-4 h-4 inline mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'privacy'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Shield className="w-4 h-4 inline mr-2" />
            Privacy
          </button>
          <button
            onClick={() => setActiveTab('accessibility')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'accessibility'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Accessibility
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'emergency'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Bell className="w-4 h-4 inline mr-2" />
            Emergency
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Alert Thresholds */}
        {activeTab === 'alerts' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Alert Thresholds</h3>
              <button
                onClick={resetThresholds}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset to Defaults</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Biometric Thresholds */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  Biometric Thresholds
                </h4>
                <div className="space-y-4">
                  {alertThresholds
                    .filter(t => t.category === 'biometric')
                    .map(threshold => (
                      <div key={threshold.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <label htmlFor={threshold.id} className="text-sm font-medium text-gray-700">
                            {threshold.name}
                          </label>
                          <span className="text-sm font-bold text-blue-600">{threshold.value}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{threshold.description}</p>
                        <input
                          id={threshold.id}
                          type="range"
                          min={threshold.min}
                          max={threshold.max}
                          step={threshold.step}
                          value={threshold.value}
                          onChange={(e) => handleThresholdChange(threshold.id, Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>{threshold.min}</span>
                          <span>{threshold.max}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Location Thresholds */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  Location Thresholds
                </h4>
                <div className="space-y-4">
                  {alertThresholds
                    .filter(t => t.category === 'location')
                    .map(threshold => (
                      <div key={threshold.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <label htmlFor={threshold.id} className="text-sm font-medium text-gray-700">
                            {threshold.name}
                          </label>
                          <span className="text-sm font-bold text-blue-600">{threshold.value}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{threshold.description}</p>
                        <input
                          id={threshold.id}
                          type="range"
                          min={threshold.min}
                          max={threshold.max}
                          step={threshold.step}
                          value={threshold.value}
                          onChange={(e) => handleThresholdChange(threshold.id, Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>{threshold.min}</span>
                          <span>{threshold.max}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Voice Thresholds */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                  <Mic className="w-4 h-4 mr-2 text-purple-500" />
                  Voice Analysis Thresholds
                </h4>
                <div className="space-y-4">
                  {alertThresholds
                    .filter(t => t.category === 'voice')
                    .map(threshold => (
                      <div key={threshold.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <label htmlFor={threshold.id} className="text-sm font-medium text-gray-700">
                            {threshold.name}
                          </label>
                          <span className="text-sm font-bold text-blue-600">{threshold.value}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{threshold.description}</p>
                        <input
                          id={threshold.id}
                          type="range"
                          min={threshold.min}
                          max={threshold.max}
                          step={threshold.step}
                          value={threshold.value}
                          onChange={(e) => handleThresholdChange(threshold.id, Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>{threshold.min}</span>
                          <span>{threshold.max}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Other Thresholds */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2 text-blue-500" />
                    Pose Analysis Thresholds
                  </h4>
                  <div className="space-y-4">
                    {alertThresholds
                      .filter(t => t.category === 'pose')
                      .map(threshold => (
                        <div key={threshold.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <label htmlFor={threshold.id} className="text-sm font-medium text-gray-700">
                              {threshold.name}
                            </label>
                            <span className="text-sm font-bold text-blue-600">{threshold.value}</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{threshold.description}</p>
                          <input
                            id={threshold.id}
                            type="range"
                            min={threshold.min}
                            max={threshold.max}
                            step={threshold.step}
                            value={threshold.value}
                            onChange={(e) => handleThresholdChange(threshold.id, Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <Camera className="w-4 h-4 mr-2 text-green-500" />
                    Face Analysis Thresholds
                  </h4>
                  <div className="space-y-4">
                    {alertThresholds
                      .filter(t => t.category === 'face')
                      .map(threshold => (
                        <div key={threshold.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <label htmlFor={threshold.id} className="text-sm font-medium text-gray-700">
                              {threshold.name}
                            </label>
                            <span className="text-sm font-bold text-blue-600">{threshold.value}</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{threshold.description}</p>
                          <input
                            id={threshold.id}
                            type="range"
                            min={threshold.min}
                            max={threshold.max}
                            step={threshold.step}
                            value={threshold.value}
                            onChange={(e) => handleThresholdChange(threshold.id, Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Notification Channels</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="email-notifications"
                        type="checkbox"
                        checked={userPreferences.notificationChannels.email}
                        onChange={(e) => handlePreferenceChange('notificationChannels', 'email', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="email-notifications" className="ml-2 text-sm text-gray-700">
                        Email Notifications
                      </label>
                    </div>
                    <span className="text-xs text-gray-500">For daily reports and non-urgent alerts</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="sms-notifications"
                        type="checkbox"
                        checked={userPreferences.notificationChannels.sms}
                        onChange={(e) => handlePreferenceChange('notificationChannels', 'sms', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="sms-notifications" className="ml-2 text-sm text-gray-700">
                        SMS Notifications
                      </label>
                    </div>
                    <span className="text-xs text-gray-500">For important alerts and updates</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="push-notifications"
                        type="checkbox"
                        checked={userPreferences.notificationChannels.push}
                        onChange={(e) => handlePreferenceChange('notificationChannels', 'push', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="push-notifications" className="ml-2 text-sm text-gray-700">
                        Push Notifications
                      </label>
                    </div>
                    <span className="text-xs text-gray-500">For real-time alerts and warnings</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="call-notifications"
                        type="checkbox"
                        checked={userPreferences.notificationChannels.call}
                        onChange={(e) => handlePreferenceChange('notificationChannels', 'call', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="call-notifications" className="ml-2 text-sm text-gray-700">
                        Automated Phone Calls
                      </label>
                    </div>
                    <span className="text-xs text-gray-500">For critical emergencies only</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start space-x-3">
                  <Bell className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Notification Priority</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Guardian Sentinel uses AI to determine the most appropriate notification channel based on the severity of the alert. Critical alerts will use all available channels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Settings */}
        {activeTab === 'privacy' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Data Sharing</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="share-location-contacts"
                        type="checkbox"
                        checked={userPreferences.privacySettings.shareLocationWithEmergencyContacts}
                        onChange={(e) => handlePreferenceChange('privacySettings', 'shareLocationWithEmergencyContacts', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="share-location-contacts" className="ml-2 text-sm text-gray-700">
                        Share location with emergency contacts
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="share-location-authorities"
                        type="checkbox"
                        checked={userPreferences.privacySettings.shareLocationWithAuthorities}
                        onChange={(e) => handlePreferenceChange('privacySettings', 'shareLocationWithAuthorities', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="share-location-authorities" className="ml-2 text-sm text-gray-700">
                        Share location with authorities during emergencies
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="record-audio"
                        type="checkbox"
                        checked={userPreferences.privacySettings.recordAudioDuringEmergency}
                        onChange={(e) => handlePreferenceChange('privacySettings', 'recordAudioDuringEmergency', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="record-audio" className="ml-2 text-sm text-gray-700">
                        Record audio during emergencies
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="record-video"
                        type="checkbox"
                        checked={userPreferences.privacySettings.recordVideoDuringEmergency}
                        onChange={(e) => handlePreferenceChange('privacySettings', 'recordVideoDuringEmergency', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="record-video" className="ml-2 text-sm text-gray-700">
                        Record video during emergencies
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="blockchain-storage"
                        type="checkbox"
                        checked={userPreferences.privacySettings.storeDataOnBlockchain}
                        onChange={(e) => handlePreferenceChange('privacySettings', 'storeDataOnBlockchain', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="blockchain-storage" className="ml-2 text-sm text-gray-700">
                        Store evidence on secure blockchain
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Zero-Knowledge Privacy</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Guardian Sentinel uses zero-knowledge proofs to protect your identity while still providing critical safety features. Your personal data is encrypted and only shared during emergencies with your explicit consent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Accessibility Settings */}
        {activeTab === 'accessibility' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Accessibility Settings</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Display Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="high-contrast"
                        type="checkbox"
                        checked={userPreferences.accessibilitySettings.highContrastMode}
                        onChange={(e) => handlePreferenceChange('accessibilitySettings', 'highContrastMode', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="high-contrast" className="ml-2 text-sm text-gray-700">
                        High Contrast Mode
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="large-text"
                        type="checkbox"
                        checked={userPreferences.accessibilitySettings.largeText}
                        onChange={(e) => handlePreferenceChange('accessibilitySettings', 'largeText', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="large-text" className="ml-2 text-sm text-gray-700">
                        Large Text
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Interaction Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="screen-reader"
                        type="checkbox"
                        checked={userPreferences.accessibilitySettings.screenReader}
                        onChange={(e) => handlePreferenceChange('accessibilitySettings', 'screenReader', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="screen-reader" className="ml-2 text-sm text-gray-700">
                        Screen Reader Compatible Mode
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="haptic-feedback"
                        type="checkbox"
                        checked={userPreferences.accessibilitySettings.hapticFeedback}
                        onChange={(e) => handlePreferenceChange('accessibilitySettings', 'hapticFeedback', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="haptic-feedback" className="ml-2 text-sm text-gray-700">
                        Haptic Feedback
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="voice-commands"
                        type="checkbox"
                        checked={userPreferences.accessibilitySettings.voiceCommands}
                        onChange={(e) => handlePreferenceChange('accessibilitySettings', 'voiceCommands', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="voice-commands" className="ml-2 text-sm text-gray-700">
                        Voice Commands
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900">Personalized Accessibility</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Guardian Sentinel adapts to your specific accessibility needs. Our AI learns your preferences over time to provide the most accessible experience possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Settings */}
        {activeTab === 'emergency' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Response Settings</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Automated Responses</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="auto-call"
                        type="checkbox"
                        checked={userPreferences.emergencySettings.autoCallEmergencyServices}
                        onChange={(e) => handlePreferenceChange('emergencySettings', 'autoCallEmergencyServices', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="auto-call" className="ml-2 text-sm text-gray-700">
                        Automatically call emergency services
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="auto-notify"
                        type="checkbox"
                        checked={userPreferences.emergencySettings.autoNotifyContacts}
                        onChange={(e) => handlePreferenceChange('emergencySettings', 'autoNotifyContacts', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="auto-notify" className="ml-2 text-sm text-gray-700">
                        Automatically notify emergency contacts
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="auto-deploy"
                        type="checkbox"
                        checked={userPreferences.emergencySettings.autoDeploy}
                        onChange={(e) => handlePreferenceChange('emergencySettings', 'autoDeploy', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="auto-deploy" className="ml-2 text-sm text-gray-700">
                        Automatically deploy safety drones
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Emergency Button Sensitivity</h4>
                <p className="text-sm text-gray-500 mb-3">
                  Set how long the emergency button must be pressed to trigger an alert
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={userPreferences.emergencySettings.emergencyButtonSensitivity}
                    onChange={(e) => handlePreferenceChange('emergencySettings', 'emergencyButtonSensitivity', Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {userPreferences.emergencySettings.emergencyButtonSensitivity} seconds
                  </span>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-start space-x-3">
                  <Bell className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900">Emergency Response Priority</h4>
                    <p className="text-sm text-red-700 mt-1">
                      During emergencies, Guardian Sentinel prioritizes your safety above all else. These settings determine how the system responds when a threat is detected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={saveSettings}
            disabled={isSaving}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </>
            )}
          </button>
          
          {saveMessage && (
            <span className="text-sm text-green-600">{saveMessage}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPanel;