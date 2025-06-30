import { io, Socket } from 'socket.io-client';
import Pusher from 'pusher-js';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../lib/supabase';

// Types for real-time events
export interface RealTimeEvent {
  id: string;
  type: 'voice' | 'pose' | 'face' | 'location' | 'biometric' | 'environmental' | 'emergency';
  data: any;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  processed: boolean;
}

export interface RealTimeSubscription {
  id: string;
  eventType: string;
  callback: (event: RealTimeEvent) => void;
}

class RealTimeAPIService {
  private static instance: RealTimeAPIService;
  private socket: Socket | null = null;
  private pusher: Pusher | null = null;
  private eventQueue: RealTimeEvent[] = [];
  private subscriptions: RealTimeSubscription[] = [];
  private processingInterval: NodeJS.Timeout | null = null;
  private supabaseSubscriptions: any[] = [];
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 2000;
  private eventProcessors: Map<string, (data: any) => Promise<any>> = new Map();

  private constructor() {
    this.initializeEventProcessors();
  }

  static getInstance(): RealTimeAPIService {
    if (!RealTimeAPIService.instance) {
      RealTimeAPIService.instance = new RealTimeAPIService();
    }
    return RealTimeAPIService.instance;
  }

  private initializeEventProcessors() {
    // Register processors for different event types
    this.eventProcessors.set('voice', this.processVoiceEvent.bind(this));
    this.eventProcessors.set('pose', this.processPoseEvent.bind(this));
    this.eventProcessors.set('face', this.processFaceEvent.bind(this));
    this.eventProcessors.set('location', this.processLocationEvent.bind(this));
    this.eventProcessors.set('biometric', this.processBiometricEvent.bind(this));
    this.eventProcessors.set('environmental', this.processEnvironmentalEvent.bind(this));
    this.eventProcessors.set('emergency', this.processEmergencyEvent.bind(this));
  }

  async connect(): Promise<boolean> {
    console.log('🔌 Connecting to real-time APIs...');
    
    try {
      // Initialize Socket.io connection for real-time communication
      this.initializeSocketIO();
      
      // Initialize Pusher for broadcast events
      this.initializePusher();
      
      // Initialize Supabase real-time subscriptions
      this.initializeSupabaseRealtime();
      
      // Start event processing loop
      this.startEventProcessing();
      
      this.isConnected = true;
      console.log('✅ Real-time API connections established');
      
      return true;
    } catch (error) {
      console.error('Failed to connect to real-time APIs:', error);
      this.isConnected = false;
      this.attemptReconnect();
      return false;
    }
  }

  private initializeSocketIO(): void {
    try {
      // In a real implementation, this would connect to your actual Socket.io server
      // For demo purposes, we'll simulate the connection
      console.log('Initializing Socket.io connection...');
      
      // Simulate socket connection
      this.socket = {
        on: (event: string, callback: Function) => {
          console.log(`Socket.io registered listener for: ${event}`);
          return this;
        },
        emit: (event: string, data: any) => {
          console.log(`Socket.io emitted event: ${event}`);
          return this;
        },
        disconnect: () => {
          console.log('Socket.io disconnected');
        }
      } as unknown as Socket;
      
      // Register event handlers
      this.socket.on('connect', () => {
        console.log('Socket.io connected');
      });
      
      this.socket.on('disconnect', () => {
        console.log('Socket.io disconnected');
        this.isConnected = false;
        this.attemptReconnect();
      });
      
      this.socket.on('threat_alert', (data: any) => {
        this.handleIncomingEvent({
          id: data.id || uuidv4(),
          type: data.type,
          data: data,
          timestamp: new Date(),
          priority: data.priority || 'medium',
          processed: false
        });
      });
      
      console.log('Socket.io initialization complete');
    } catch (error) {
      console.error('Socket.io initialization failed:', error);
      throw error;
    }
  }

  private initializePusher(): void {
    try {
      // In a real implementation, this would connect to your actual Pusher account
      // For demo purposes, we'll simulate the connection
      console.log('Initializing Pusher connection...');
      
      // Simulate Pusher connection
      this.pusher = {
        subscribe: (channel: string) => {
          console.log(`Pusher subscribed to channel: ${channel}`);
          return {
            bind: (event: string, callback: Function) => {
              console.log(`Pusher bound to event: ${event} on channel: ${channel}`);
            }
          };
        },
        disconnect: () => {
          console.log('Pusher disconnected');
        }
      } as unknown as Pusher;
      
      // Subscribe to channels
      const threatChannel = this.pusher.subscribe('threat-alerts');
      threatChannel.bind('new-threat', (data: any) => {
        this.handleIncomingEvent({
          id: data.id || uuidv4(),
          type: data.type,
          data: data,
          timestamp: new Date(),
          priority: data.priority || 'medium',
          processed: false
        });
      });
      
      const emergencyChannel = this.pusher.subscribe('emergency-events');
      emergencyChannel.bind('emergency-triggered', (data: any) => {
        this.handleIncomingEvent({
          id: data.id || uuidv4(),
          type: data.type,
          data: data,
          timestamp: new Date(),
          priority: 'critical',
          processed: false
        });
      });
      
      console.log('Pusher initialization complete');
    } catch (error) {
      console.error('Pusher initialization failed:', error);
      throw error;
    }
  }

  private initializeSupabaseRealtime(): void {
    try {
      console.log('Initializing Supabase real-time subscriptions...');
      
      // Subscribe to threat_incidents table
      const threatIncidentsSubscription = supabase
        .channel('threat_incidents_changes')
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'threat_incidents' }, 
          (payload) => {
            this.handleIncomingEvent({
              id: payload.new.id || uuidv4(),
              type: this.mapTableToEventType(payload.table),
              data: payload.new,
              timestamp: new Date(),
              priority: this.determinePriorityFromPayload(payload.new),
              processed: false
            });
          }
        )
        .subscribe();
      
      // Subscribe to emergency_alerts table
      const emergencyAlertsSubscription = supabase
        .channel('emergency_alerts_changes')
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'emergency_alerts' }, 
          (payload) => {
            this.handleIncomingEvent({
              id: payload.new.id || uuidv4(),
              type: this.mapTableToEventType(payload.table),
              data: payload.new,
              timestamp: new Date(),
              priority: 'critical',
              processed: false
            });
          }
        )
        .subscribe();
      
      // Store subscriptions for cleanup
      this.supabaseSubscriptions.push(
        threatIncidentsSubscription,
        emergencyAlertsSubscription
      );
      
      console.log('Supabase real-time subscriptions initialized');
    } catch (error) {
      console.error('Supabase real-time initialization failed:', error);
      throw error;
    }
  }

  private mapTableToEventType(table: string): RealTimeEvent['type'] {
    switch (table) {
      case 'threat_incidents': return 'pose';
      case 'emergency_alerts': return 'location';
      case 'voice_analysis': return 'voice';
      case 'face_recognition': return 'face';
      case 'biometric_data': return 'biometric';
      case 'environmental_sensors': return 'environmental';
      default: return 'pose';
    }
  }

  private determinePriorityFromPayload(payload: any): RealTimeEvent['priority'] {
    if (payload.severity === 'critical') return 'critical';
    if (payload.severity === 'high') return 'high';
    if (payload.severity === 'medium') return 'medium';
    return 'low';
  }

  private startEventProcessing(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
    }
    
    // Process events every 100ms for near real-time performance
    this.processingInterval = setInterval(() => {
      this.processEventQueue();
    }, 100);
    
    console.log('Real-time event processing started');
  }

  private async processEventQueue(): Promise<void> {
    if (this.eventQueue.length === 0) return;
    
    // Process up to 10 events per cycle to prevent blocking
    const eventsToProcess = this.eventQueue.splice(0, 10);
    
    for (const event of eventsToProcess) {
      try {
        // Process event based on type
        const processor = this.eventProcessors.get(event.type);
        if (processor) {
          const processedData = await processor(event.data);
          event.processed = true;
          
          // Notify subscribers
          this.notifySubscribers(event);
        } else {
          console.warn(`No processor found for event type: ${event.type}`);
        }
      } catch (error) {
        console.error(`Error processing event ${event.id}:`, error);
        // Put back in queue for retry if high priority
        if (event.priority === 'high' || event.priority === 'critical') {
          this.eventQueue.push(event);
        }
      }
    }
  }

  private async processVoiceEvent(data: any): Promise<any> {
    console.log('Processing voice event:', data);
    // In a real implementation, this would process voice data
    // For demo, we'll simulate processing
    return {
      ...data,
      processed: true,
      confidence: 0.92,
      detectedKeywords: data.keywords || [],
      emotionState: data.emotion || 'neutral'
    };
  }

  private async processPoseEvent(data: any): Promise<any> {
    console.log('Processing pose event:', data);
    // In a real implementation, this would process pose data
    return {
      ...data,
      processed: true,
      threatLevel: data.threat_level || 0.1,
      bodyLanguage: data.body_language || 'neutral'
    };
  }

  private async processFaceEvent(data: any): Promise<any> {
    console.log('Processing face event:', data);
    // In a real implementation, this would process face data
    return {
      ...data,
      processed: true,
      matchConfidence: data.confidence || 0.8,
      identityVerified: data.verified || false
    };
  }

  private async processLocationEvent(data: any): Promise<any> {
    console.log('Processing location event:', data);
    // In a real implementation, this would process location data
    return {
      ...data,
      processed: true,
      safetyScore: data.safety_score || 0.7,
      nearbyThreats: data.threats || []
    };
  }

  private async processBiometricEvent(data: any): Promise<any> {
    console.log('Processing biometric event:', data);
    // In a real implementation, this would process biometric data
    return {
      ...data,
      processed: true,
      stressLevel: data.stress || 0.3,
      anomalyDetected: data.anomaly || false
    };
  }

  private async processEnvironmentalEvent(data: any): Promise<any> {
    console.log('Processing environmental event:', data);
    // In a real implementation, this would process environmental data
    return {
      ...data,
      processed: true,
      threatLevel: data.threat_level || 0.2,
      environmentalFactors: data.factors || {}
    };
  }

  private async processEmergencyEvent(data: any): Promise<any> {
    console.log('Processing emergency event:', data);
    // In a real implementation, this would process emergency data
    return {
      ...data,
      processed: true,
      responseInitiated: true,
      responseTime: Math.floor(Math.random() * 10) + 1
    };
  }

  private handleIncomingEvent(event: RealTimeEvent): void {
    console.log(`📥 Received ${event.type} event with priority ${event.priority}`);
    
    // Add to processing queue
    if (event.priority === 'critical') {
      // Critical events go to the front of the queue
      this.eventQueue.unshift(event);
    } else {
      this.eventQueue.push(event);
    }
  }

  private notifySubscribers(event: RealTimeEvent): void {
    // Notify all subscribers interested in this event type
    this.subscriptions
      .filter(sub => sub.eventType === event.type || sub.eventType === 'all')
      .forEach(sub => {
        try {
          sub.callback(event);
        } catch (error) {
          console.error(`Error in subscription callback (${sub.id}):`, error);
        }
      });
  }

  subscribe(eventType: string, callback: (event: RealTimeEvent) => void): string {
    const subscriptionId = uuidv4();
    this.subscriptions.push({
      id: subscriptionId,
      eventType,
      callback
    });
    
    console.log(`📌 New subscription (${subscriptionId}) for event type: ${eventType}`);
    return subscriptionId;
  }

  unsubscribe(subscriptionId: string): boolean {
    const initialLength = this.subscriptions.length;
    this.subscriptions = this.subscriptions.filter(sub => sub.id !== subscriptionId);
    
    const removed = initialLength > this.subscriptions.length;
    if (removed) {
      console.log(`🗑️ Removed subscription: ${subscriptionId}`);
    }
    
    return removed;
  }

  async sendEvent(eventType: string, data: any, priority: RealTimeEvent['priority'] = 'medium'): Promise<string> {
    if (!this.isConnected) {
      await this.connect();
    }
    
    const eventId = uuidv4();
    const event: RealTimeEvent = {
      id: eventId,
      type: eventType as any,
      data,
      timestamp: new Date(),
      priority,
      processed: false
    };
    
    // Add to local queue for processing
    this.handleIncomingEvent(event);
    
    // Send to remote services if connected
    if (this.socket) {
      this.socket.emit('client_event', event);
    }
    
    console.log(`📤 Sent ${eventType} event with ID: ${eventId}`);
    return eventId;
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Maximum reconnection attempts reached. Please check your connection.');
      return;
    }
    
    this.reconnectAttempts++;
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
    
    setTimeout(async () => {
      try {
        await this.connect();
        if (this.isConnected) {
          this.reconnectAttempts = 0;
          console.log('Reconnection successful');
        }
      } catch (error) {
        console.error('Reconnection failed:', error);
        this.attemptReconnect();
      }
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  disconnect(): void {
    console.log('Disconnecting from real-time APIs...');
    
    // Clean up Socket.io
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    
    // Clean up Pusher
    if (this.pusher) {
      this.pusher.disconnect();
      this.pusher = null;
    }
    
    // Clean up Supabase subscriptions
    this.supabaseSubscriptions.forEach(subscription => {
      supabase.removeChannel(subscription);
    });
    this.supabaseSubscriptions = [];
    
    // Stop event processing
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
    }
    
    this.isConnected = false;
    console.log('Disconnected from all real-time APIs');
  }

  getConnectionStatus(): { connected: boolean; queueSize: number } {
    return {
      connected: this.isConnected,
      queueSize: this.eventQueue.length
    };
  }

  // Method to simulate incoming events for testing/demo
  simulateIncomingEvent(type: RealTimeEvent['type'], priority: RealTimeEvent['priority'] = 'medium'): void {
    const mockData: Record<string, any> = {
      voice: {
        emotionState: Math.random() > 0.8 ? 'panic' : 'neutral',
        groomingIndicators: Math.random() > 0.9 ? ['suspicious_language'] : [],
        confidenceLevel: 0.7 + Math.random() * 0.3
      },
      pose: {
        bodyLanguage: Math.random() > 0.8 ? 'aggressive' : 'neutral',
        threatLevel: Math.random() > 0.8 ? 0.8 + Math.random() * 0.2 : Math.random() * 0.3,
        movementPattern: Math.random() > 0.9 ? 'struggling' : 'normal'
      },
      face: {
        criminalDbMatch: Math.random() > 0.95,
        missingPersonMatch: Math.random() > 0.97,
        suspiciousActivity: Math.random() > 0.9
      },
      location: {
        lat: 40.7128 + (Math.random() - 0.5) * 0.01,
        lng: -74.0060 + (Math.random() - 0.5) * 0.01,
        accuracy: 10,
        timestamp: new Date()
      },
      biometric: {
        heartRate: Math.random() > 0.9 ? 150 + Math.random() * 30 : 70 + Math.random() * 20,
        stressLevel: Math.random() > 0.9 ? 0.8 + Math.random() * 0.2 : Math.random() * 0.4
      },
      environmental: {
        air_quality_index: Math.random() > 0.9 ? 150 + Math.random() * 100 : 50 + Math.random() * 50,
        noise_pollution_level: Math.random() > 0.9 ? 80 + Math.random() * 20 : 40 + Math.random() * 30
      },
      emergency: {
        type: ['manual', 'audio_trigger', 'biometric', 'location'][Math.floor(Math.random() * 4)],
        location: {
          lat: 40.7128 + (Math.random() - 0.5) * 0.01,
          lng: -74.0060 + (Math.random() - 0.5) * 0.01
        },
        timestamp: new Date()
      }
    };
    
    this.handleIncomingEvent({
      id: uuidv4(),
      type,
      data: mockData[type],
      timestamp: new Date(),
      priority,
      processed: false
    });
  }
}

export default RealTimeAPIService;