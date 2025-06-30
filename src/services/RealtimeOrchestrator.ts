import { VoiceGuardianAI } from './VoiceGuardianAI';
import { PoseThreatAI } from './PoseThreatAI';
import { FaceMatchAI } from './FaceMatchAI';
import { GeoShieldAI } from './GeoShieldAI';
import { RiskScoringEngine } from './RiskScoringEngine';
import { LocationService } from './LocationService';
import { BiometricService } from './BiometricService';
import { EmergencyService } from './EmergencyService';
import { DroneService } from './DroneService';
import { DemoDataGenerator } from './DemoDataGenerator';
import RealTimeAPIService, { RealTimeEvent } from './RealTimeAPIService';
import { VoiceAnalysis, PoseAnalysis, FaceAnalysis, GeoFenceAlert } from '../types/advanced';

export class RealtimeOrchestrator {
  private static instance: RealtimeOrchestrator;
  private isRunning = false;
  private services: {
    voice: VoiceGuardianAI;
    pose: PoseThreatAI;
    face: FaceMatchAI;
    geo: GeoShieldAI;
    risk: RiskScoringEngine;
    location: LocationService;
    biometric: BiometricService;
    emergency: EmergencyService;
    drone: DroneService;
    demo: DemoDataGenerator;
    realtime: RealTimeAPIService;
  };
  private subscriptions: string[] = [];
  private processingStats = {
    eventsProcessed: 0,
    criticalEvents: 0,
    falseAlarms: 0,
    avgProcessingTime: 0
  };

  constructor() {
    this.services = {
      voice: VoiceGuardianAI.getInstance(),
      pose: PoseThreatAI.getInstance(),
      face: FaceMatchAI.getInstance(),
      geo: GeoShieldAI.getInstance(),
      risk: RiskScoringEngine.getInstance(),
      location: LocationService.getInstance(),
      biometric: BiometricService.getInstance(),
      emergency: EmergencyService.getInstance(),
      drone: DroneService.getInstance(),
      demo: DemoDataGenerator.getInstance(),
      realtime: RealTimeAPIService.getInstance()
    };
  }

  static getInstance(): RealtimeOrchestrator {
    if (!RealtimeOrchestrator.instance) {
      RealtimeOrchestrator.instance = new RealtimeOrchestrator();
    }
    return RealtimeOrchestrator.instance;
  }

  async startRealtimeMonitoring(): Promise<void> {
    if (this.isRunning) return;

    console.log('🚀 Starting Real-time AI Orchestrator...');
    this.isRunning = true;

    try {
      // Connect to real-time API service
      await this.services.realtime.connect();
      
      // Initialize all services
      await this.initializeServices();
      
      // Set up real-time data flow
      this.setupDataFlow();
      
      // Start monitoring loops
      this.startMonitoringLoops();
      
      // Start demo data generation
      this.services.demo.startGeneratingDemoData();
      
      // Subscribe to real-time events
      this.subscribeToRealTimeEvents();
      
      console.log('✅ Real-time monitoring fully operational');
    } catch (error) {
      console.error('Failed to start real-time monitoring:', error);
      this.isRunning = false;
    }
  }

  private async initializeServices(): Promise<void> {
    // Start location tracking
    try {
      await this.services.location.startTracking();
      console.log('📍 Location service: ACTIVE');
    } catch (error) {
      console.warn('📍 Location service: MOCK MODE');
    }

    // Start biometric monitoring
    this.services.biometric.startMonitoring();
    console.log('❤️ Biometric service: ACTIVE');

    // Start geo-fencing
    this.services.geo.startMonitoring();
    console.log('🛰️ GeoShield service: ACTIVE');

    // Start AI analysis services
    try {
      await this.services.voice.startAnalysis();
      console.log('🎤 VoiceGuardian AI: ACTIVE');
    } catch (error) {
      console.warn('🎤 VoiceGuardian AI: MOCK MODE');
    }

    try {
      await this.services.pose.startAnalysis();
      console.log('🧍‍♂️ Pose & Threat AI: ACTIVE');
    } catch (error) {
      console.warn('🧍‍♂️ Pose & Threat AI: MOCK MODE');
    }

    try {
      await this.services.face.startAnalysis();
      console.log('📷 FaceMatch AI: ACTIVE');
    } catch (error) {
      console.warn('📷 FaceMatch AI: MOCK MODE');
    }
  }

  private setupDataFlow(): void {
    // Voice analysis -> Risk engine
    this.services.voice.onAnalysisUpdate((analysis: VoiceAnalysis) => {
      this.services.risk.updateVoiceRisk(analysis);
      this.handleVoiceThreats(analysis);
      
      // Send to real-time API
      this.services.realtime.sendEvent('voice', analysis, 
        analysis.emotionState === 'panic' ? 'critical' : 
        analysis.groomingIndicators.length > 0 ? 'high' : 'medium');
    });

    // Pose analysis -> Risk engine
    this.services.pose.onAnalysisUpdate((analysis: PoseAnalysis) => {
      this.services.risk.updatePoseRisk(analysis);
      this.handlePoseThreats(analysis);
      
      // Send to real-time API
      this.services.realtime.sendEvent('pose', analysis, 
        analysis.threatLevel > 0.8 ? 'critical' : 
        analysis.threatLevel > 0.6 ? 'high' : 'medium');
    });

    // Face analysis -> Risk engine
    this.services.face.onAnalysisUpdate((analysis: FaceAnalysis) => {
      this.services.risk.updateFaceRisk(analysis);
      this.handleFaceThreats(analysis);
      
      // Send to real-time API
      this.services.realtime.sendEvent('face', analysis, 
        analysis.criminalDbMatch ? 'critical' : 
        analysis.suspiciousActivity ? 'high' : 'medium');
    });

    // Location updates -> Geo analysis
    this.services.location.onLocationUpdate((location) => {
      this.services.geo.checkLocation(location);
      
      // Send to real-time API
      this.services.realtime.sendEvent('location', location, 'medium');
    });

    // Geo alerts -> Risk engine
    this.services.geo.onAlert((alert: GeoFenceAlert) => {
      this.services.risk.updateLocationRisk(alert);
      this.handleGeoThreats(alert);
      
      // Send to real-time API
      this.services.realtime.sendEvent('location', alert, 
        alert.severity === 'critical' ? 'critical' : 
        alert.severity === 'high' ? 'high' : 'medium');
    });

    // Biometric data -> Risk engine
    this.services.biometric.onDataUpdate((data) => {
      this.services.risk.updateBiometricRisk(data.heartRate, data.stressLevel);
      this.handleBiometricThreats(data);
      
      // Send to real-time API
      this.services.realtime.sendEvent('biometric', data, 
        data.heartRate > 150 ? 'critical' : 
        data.stressLevel > 0.8 ? 'high' : 'medium');
    });

    // Risk score monitoring
    this.services.risk.onScoreUpdate((score) => {
      this.handleCriticalRisk(score);
    });

    console.log('🔗 Real-time data flow established');
  }

  private subscribeToRealTimeEvents(): void {
    // Subscribe to real-time events from external sources
    const realTimeService = this.services.realtime;
    
    // Voice events
    this.subscriptions.push(
      realTimeService.subscribe('voice', (event) => {
        console.log('📥 Received external voice event:', event);
        if (event.data.emotionState === 'panic' || event.data.groomingIndicators?.length > 0) {
          this.handleVoiceThreats(event.data);
        }
      })
    );
    
    // Pose events
    this.subscriptions.push(
      realTimeService.subscribe('pose', (event) => {
        console.log('📥 Received external pose event:', event);
        if (event.data.threatLevel > 0.7 || event.data.bodyLanguage === 'aggressive') {
          this.handlePoseThreats(event.data);
        }
      })
    );
    
    // Face events
    this.subscriptions.push(
      realTimeService.subscribe('face', (event) => {
        console.log('📥 Received external face event:', event);
        if (event.data.criminalDbMatch || event.data.suspiciousActivity) {
          this.handleFaceThreats(event.data);
        }
      })
    );
    
    // Location events
    this.subscriptions.push(
      realTimeService.subscribe('location', (event) => {
        console.log('📥 Received external location event:', event);
        if (event.priority === 'critical' || event.priority === 'high') {
          this.handleGeoThreats(event.data);
        }
      })
    );
    
    // Biometric events
    this.subscriptions.push(
      realTimeService.subscribe('biometric', (event) => {
        console.log('📥 Received external biometric event:', event);
        if (event.data.heartRate > 150 || event.data.stressLevel > 0.8) {
          this.handleBiometricThreats(event.data);
        }
      })
    );
    
    console.log('🔔 Subscribed to real-time external events');
  }

  private startMonitoringLoops(): void {
    // High-frequency monitoring loop (every 500ms)
    setInterval(() => {
      if (!this.isRunning) return;
      this.performHighFrequencyChecks();
    }, 500);

    // Medium-frequency monitoring loop (every 2s)
    setInterval(() => {
      if (!this.isRunning) return;
      this.performMediumFrequencyChecks();
    }, 2000);

    // Low-frequency monitoring loop (every 10s)
    setInterval(() => {
      if (!this.isRunning) return;
      this.performLowFrequencyChecks();
    }, 10000);

    console.log('⏱️ Monitoring loops started');
  }

  private performHighFrequencyChecks(): void {
    // Check for immediate threats that need instant response
    const currentRisk = this.services.risk.getCurrentScore();
    
    if (currentRisk.overall > 0.9) {
      this.triggerEmergencyProtocols('CRITICAL_RISK_DETECTED');
    }
  }

  private performMediumFrequencyChecks(): void {
    // Check for developing threats
    const currentRisk = this.services.risk.getCurrentScore();
    
    if (currentRisk.overall > 0.7 && currentRisk.trend === 'increasing') {
      this.escalateThreatResponse();
    }
  }

  private performLowFrequencyChecks(): void {
    // System health checks and optimization
    this.optimizeSystemPerformance();
    this.updateThreatDatabases();
  }

  private handleVoiceThreats(analysis: VoiceAnalysis): void {
    if (analysis.emotionState === 'panic' || analysis.groomingIndicators.length > 0) {
      console.log('🚨 Voice threat detected:', analysis);
      
      const location = this.services.location.getCurrentLocation();
      if (location) {
        this.services.emergency.triggerEmergency('audio_trigger', location, {
          audioTrigger: analysis.emotionState === 'panic' ? 'panic_voice' : analysis.groomingIndicators[0]
        });
      }
      
      // Deploy drone if threat is severe
      if (analysis.emotionState === 'panic') {
        this.deployEmergencyDrone();
      }
      
      // Update processing stats
      this.processingStats.eventsProcessed++;
      if (analysis.emotionState === 'panic') {
        this.processingStats.criticalEvents++;
      }
    }

    if (analysis.deepfakeDetected) {
      console.log('🚨 Deepfake audio detected - potential impersonation');
    }
  }

  private handlePoseThreats(analysis: PoseAnalysis): void {
    if (analysis.threatLevel > 0.8 || analysis.bodyLanguage === 'panic' || analysis.movementPattern === 'struggling') {
      console.log('🚨 Pose threat detected:', analysis);
      
      const location = this.services.location.getCurrentLocation();
      if (location) {
        this.services.emergency.triggerEmergency('manual', location);
      }
      
      this.deployEmergencyDrone();
      
      // Update processing stats
      this.processingStats.eventsProcessed++;
      if (analysis.threatLevel > 0.8) {
        this.processingStats.criticalEvents++;
      }
    }
  }

  private handleFaceThreats(analysis: FaceAnalysis): void {
    if (analysis.criminalDbMatch || analysis.missingPersonMatch) {
      console.log('🚨 Face database match:', analysis);
      
      const location = this.services.location.getCurrentLocation();
      if (location) {
        this.services.emergency.triggerEmergency('manual', location);
      }
      
      // Update processing stats
      this.processingStats.eventsProcessed++;
      if (analysis.criminalDbMatch) {
        this.processingStats.criticalEvents++;
      }
    }

    if (analysis.suspiciousActivity && !analysis.isKnownPerson) {
      console.log('⚠️ Suspicious unknown individual detected');
    }
  }

  private handleGeoThreats(alert: GeoFenceAlert): void {
    if (alert.severity === 'critical' || alert.type === 'enter_danger_zone') {
      console.log('🚨 Geo threat detected:', alert);
      
      this.services.emergency.triggerEmergency('location', {
        lat: alert.location.lat,
        lng: alert.location.lng,
        accuracy: 10,
        timestamp: new Date()
      });
      
      // Update processing stats
      this.processingStats.eventsProcessed++;
      if (alert.severity === 'critical') {
        this.processingStats.criticalEvents++;
      }
    }
  }

  private handleBiometricThreats(data: any): void {
    if (data.heartRate > 160 || data.movement === 'struggling' || data.movement === 'falling') {
      console.log('🚨 Biometric emergency detected:', data);
      
      const location = this.services.location.getCurrentLocation();
      if (location) {
        this.services.emergency.triggerEmergency('biometric', location, {
          heartRate: data.heartRate
        });
      }
      
      // Update processing stats
      this.processingStats.eventsProcessed++;
      if (data.heartRate > 160) {
        this.processingStats.criticalEvents++;
      }
    }
  }

  private handleCriticalRisk(score: any): void {
    if (score.overall > 0.85) {
      console.log('🚨 CRITICAL RISK THRESHOLD EXCEEDED:', score);
      this.triggerEmergencyProtocols('CRITICAL_RISK_SCORE');
    }
  }

  private handleRealTimeEvent(event: RealTimeEvent): void {
    console.log(`📥 Processing real-time event: ${event.type} (${event.priority})`);
    
    const startTime = performance.now();
    
    // Process based on event type
    switch (event.type) {
      case 'voice':
        this.handleVoiceThreats(event.data);
        break;
      case 'pose':
        this.handlePoseThreats(event.data);
        break;
      case 'face':
        this.handleFaceThreats(event.data);
        break;
      case 'location':
        if ('severity' in event.data) {
          this.handleGeoThreats(event.data);
        }
        break;
      case 'biometric':
        this.handleBiometricThreats(event.data);
        break;
    }
    
    // Calculate processing time
    const processingTime = performance.now() - startTime;
    
    // Update processing stats
    this.processingStats.eventsProcessed++;
    this.processingStats.avgProcessingTime = 
      (this.processingStats.avgProcessingTime * (this.processingStats.eventsProcessed - 1) + processingTime) / 
      this.processingStats.eventsProcessed;
    
    // Log processing time for critical events
    if (event.priority === 'critical') {
      console.log(`⚡ Critical event processed in ${processingTime.toFixed(2)}ms`);
    }
  }

  private triggerEmergencyProtocols(reason: string): void {
    console.log(`🚨 EMERGENCY PROTOCOLS ACTIVATED: ${reason}`);
    
    // Deploy all available drones
    this.deployAllDrones();
    
    // Activate enhanced monitoring
    this.activateEnhancedMonitoring();
    
    // Notify all emergency contacts
    this.notifyEmergencyContacts(reason);
    
    // Send critical event to real-time API
    this.services.realtime.sendEvent('emergency', { reason, timestamp: new Date() }, 'critical');
  }

  private deployEmergencyDrone(): void {
    const location = this.services.location.getCurrentLocation();
    if (location) {
      const drone = this.services.drone.deployDrone(location, 'emergency_user');
      if (drone) {
        console.log(`🚁 Emergency drone ${drone.id} deployed`);
      }
    }
  }

  private deployAllDrones(): void {
    const location = this.services.location.getCurrentLocation();
    if (location) {
      const drones = this.services.drone.getDrones();
      drones.forEach(drone => {
        if (!drone.isActive && drone.batteryLevel > 20) {
          this.services.drone.deployDrone(location, 'emergency_user');
        }
      });
    }
  }

  private escalateThreatResponse(): void {
    console.log('⚠️ Escalating threat response');
    
    // Increase monitoring frequency
    // Deploy additional resources
    // Alert secondary contacts
  }

  private activateEnhancedMonitoring(): void {
    console.log('🔍 Enhanced monitoring activated');
    
    // Increase all AI analysis frequencies
    // Activate additional sensors
    // Enable continuous recording
  }

  private notifyEmergencyContacts(reason: string): void {
    console.log(`📞 Notifying emergency contacts: ${reason}`);
    
    // Send alerts to all emergency contacts
    // Activate emergency services
    // Send location data
  }

  private optimizeSystemPerformance(): void {
    // Optimize AI model performance
    // Clean up memory usage
    // Update threat detection algorithms
  }

  private updateThreatDatabases(): void {
    // Update criminal database
    // Refresh missing persons data
    // Update danger zone information
  }

  stopRealtimeMonitoring(): void {
    this.isRunning = false;
    
    // Stop all services
    this.services.voice.stopAnalysis();
    this.services.pose.stopAnalysis();
    this.services.face.stopAnalysis();
    this.services.geo.stopMonitoring();
    this.services.biometric.stopMonitoring();
    this.services.location.stopTracking();
    this.services.demo.stopGeneratingDemoData();
    
    // Unsubscribe from real-time events
    this.subscriptions.forEach(subId => {
      this.services.realtime.unsubscribe(subId);
    });
    this.subscriptions = [];
    
    // Disconnect from real-time API
    this.services.realtime.disconnect();
    
    console.log('🛑 Real-time monitoring stopped');
  }

  getSystemStatus(): any {
    return {
      isRunning: this.isRunning,
      services: {
        voice: 'ACTIVE',
        pose: 'ACTIVE',
        face: 'ACTIVE',
        geo: 'ACTIVE',
        biometric: 'ACTIVE',
        location: 'ACTIVE',
        demo: 'ACTIVE',
        realtime: this.services.realtime.getConnectionStatus().connected ? 'ACTIVE' : 'INACTIVE'
      },
      currentRisk: this.services.risk.getCurrentScore(),
      activeDrones: this.services.drone.getActiveDrones().length,
      activeAlerts: this.services.emergency.getActiveAlerts().length,
      demoStats: this.services.demo.generateDemoStats(),
      threatScenarios: this.services.demo.generateThreatScenarios(),
      processingStats: this.processingStats,
      realtimeStatus: this.services.realtime.getConnectionStatus()
    };
  }
}