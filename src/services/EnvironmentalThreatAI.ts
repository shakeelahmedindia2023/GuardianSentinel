import { supabase } from '../lib/supabase';

export interface EnvironmentalSensor {
  sensor_id: string;
  sensor_type: string;
  location: { lat: number; lng: number };
  readings: Record<string, number>;
  threat_indicators: string[];
  correlation_score: number;
}

export interface EnvironmentalThreat {
  threat_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: { lat: number; lng: number };
  environmental_factors: Record<string, any>;
  human_behavior_correlation: number;
  prediction_confidence: number;
  mitigation_strategies: string[];
}

export class EnvironmentalThreatAI {
  private static instance: EnvironmentalThreatAI;
  private sensorNetwork: Map<string, EnvironmentalSensor> = new Map();
  private threatPatterns: Map<string, any> = new Map();
  private behaviorCorrelations: Map<string, number> = new Map();

  static getInstance(): EnvironmentalThreatAI {
    if (!EnvironmentalThreatAI.instance) {
      EnvironmentalThreatAI.instance = new EnvironmentalThreatAI();
    }
    return EnvironmentalThreatAI.instance;
  }

  constructor() {
    this.initializeSensorNetwork();
    this.initializeThreatPatterns();
    this.initializeBehaviorCorrelations();
  }

  private initializeSensorNetwork(): void {
    // Initialize IoT sensor network
    const sensorTypes = [
      'air_quality',
      'noise_level',
      'light_intensity',
      'temperature_humidity',
      'crowd_density',
      'stress_pheromones',
      'electromagnetic_fields',
      'seismic_activity',
      'chemical_detection',
      'radiation_monitoring'
    ];

    sensorTypes.forEach((type, index) => {
      const sensorId = `sensor_${type}_${index}`;
      this.sensorNetwork.set(sensorId, {
        sensor_id: sensorId,
        sensor_type: type,
        location: {
          lat: 40.7128 + (Math.random() - 0.5) * 0.1,
          lng: -74.0060 + (Math.random() - 0.5) * 0.1
        },
        readings: this.generateSensorReadings(type),
        threat_indicators: [],
        correlation_score: 0
      });
    });

    console.log('🌍 Environmental Threat AI: Sensor network initialized');
  }

  private initializeThreatPatterns(): void {
    // Define environmental threat patterns
    this.threatPatterns.set('air_pollution_aggression', {
      environmental_factors: ['high_pm25', 'low_oxygen', 'chemical_irritants'],
      behavioral_impact: 'increased_aggression',
      correlation_strength: 0.7,
      time_delay_minutes: 30
    });

    this.threatPatterns.set('noise_stress_vulnerability', {
      environmental_factors: ['high_decibel_noise', 'sudden_sound_spikes'],
      behavioral_impact: 'heightened_stress_response',
      correlation_strength: 0.8,
      time_delay_minutes: 5
    });

    this.threatPatterns.set('crowd_density_panic', {
      environmental_factors: ['high_crowd_density', 'limited_exit_routes'],
      behavioral_impact: 'panic_susceptibility',
      correlation_strength: 0.9,
      time_delay_minutes: 2
    });

    this.threatPatterns.set('electromagnetic_disorientation', {
      environmental_factors: ['high_emf_levels', 'signal_interference'],
      behavioral_impact: 'spatial_disorientation',
      correlation_strength: 0.6,
      time_delay_minutes: 15
    });

    this.threatPatterns.set('chemical_fear_response', {
      environmental_factors: ['stress_pheromones', 'fear_chemicals'],
      behavioral_impact: 'contagious_fear',
      correlation_strength: 0.85,
      time_delay_minutes: 1
    });
  }

  private initializeBehaviorCorrelations(): void {
    // Environmental factor to behavior correlations
    this.behaviorCorrelations.set('air_quality_aggression', 0.72);
    this.behaviorCorrelations.set('noise_stress', 0.81);
    this.behaviorCorrelations.set('crowd_panic', 0.89);
    this.behaviorCorrelations.set('light_depression', 0.65);
    this.behaviorCorrelations.set('temperature_irritability', 0.58);
    this.behaviorCorrelations.set('humidity_discomfort', 0.43);
    this.behaviorCorrelations.set('pheromone_fear', 0.87);
    this.behaviorCorrelations.set('emf_confusion', 0.61);
  }

  async analyzeEnvironmentalThreats(
    location: { lat: number; lng: number },
    radius: number = 1000
  ): Promise<EnvironmentalThreat[]> {
    // Get nearby sensors
    const nearbySensors = this.getNearbySensors(location, radius);
    
    // Analyze current environmental conditions
    const environmentalConditions = this.analyzeEnvironmentalConditions(nearbySensors);
    
    // Correlate with human behavior patterns
    const behaviorCorrelations = this.correlateBehaviorPatterns(environmentalConditions);
    
    // Predict environmental threats
    const threats = this.predictEnvironmentalThreats(
      environmentalConditions,
      behaviorCorrelations,
      location
    );

    // Store environmental analysis (commented out to avoid RLS policy violation)
    // await this.storeEnvironmentalAnalysis(location, environmentalConditions, threats);

    return threats;
  }

  private generateSensorReadings(sensorType: string): Record<string, number> {
    const readings: Record<string, number> = {};

    switch (sensorType) {
      case 'air_quality':
        readings.pm25 = 10 + Math.random() * 40; // PM2.5 levels
        readings.pm10 = 15 + Math.random() * 50; // PM10 levels
        readings.ozone = 20 + Math.random() * 80; // Ozone levels
        readings.no2 = 5 + Math.random() * 25; // Nitrogen dioxide
        readings.co = 0.5 + Math.random() * 2; // Carbon monoxide
        break;

      case 'noise_level':
        readings.decibels = 40 + Math.random() * 40; // 40-80 dB range
        readings.frequency_peak = 100 + Math.random() * 8000; // Hz
        readings.sudden_spikes = Math.floor(Math.random() * 10); // Count per hour
        break;

      case 'light_intensity':
        readings.lux = Math.random() * 10000; // Light intensity
        readings.uv_index = Math.random() * 11; // UV index
        readings.color_temperature = 2700 + Math.random() * 3800; // Kelvin
        break;

      case 'temperature_humidity':
        readings.temperature = 15 + Math.random() * 20; // Celsius
        readings.humidity = 30 + Math.random() * 40; // Percentage
        readings.heat_index = readings.temperature + (readings.humidity * 0.1);
        break;

      case 'crowd_density':
        readings.people_per_sqm = Math.random() * 5; // People density
        readings.movement_speed = 0.5 + Math.random() * 2; // m/s
        readings.congestion_level = Math.random(); // 0-1 scale
        break;

      case 'stress_pheromones':
        readings.cortisol_airborne = Math.random() * 100; // ng/m³
        readings.adrenaline_traces = Math.random() * 50; // ng/m³
        readings.fear_pheromones = Math.random() * 75; // ng/m³
        break;

      case 'electromagnetic_fields':
        readings.emf_strength = Math.random() * 1000; // mG
        readings.frequency_range = 50 + Math.random() * 2400; // Hz
        readings.signal_interference = Math.random(); // 0-1 scale
        break;

      case 'seismic_activity':
        readings.vibration_level = Math.random() * 10; // mm/s
        readings.frequency = 1 + Math.random() * 100; // Hz
        readings.duration = Math.random() * 60; // seconds
        break;

      case 'chemical_detection':
        readings.volatile_compounds = Math.random() * 500; // ppb
        readings.toxic_gases = Math.random() * 10; // ppm
        readings.unknown_chemicals = Math.floor(Math.random() * 5); // count
        break;

      case 'radiation_monitoring':
        readings.background_radiation = 0.1 + Math.random() * 0.2; // μSv/h
        readings.gamma_radiation = Math.random() * 0.5; // μSv/h
        readings.particle_count = Math.floor(Math.random() * 1000); // cpm
        break;
    }

    return readings;
  }

  private getNearbySensors(location: { lat: number; lng: number }, radius: number): EnvironmentalSensor[] {
    const nearbySensors: EnvironmentalSensor[] = [];

    this.sensorNetwork.forEach(sensor => {
      const distance = this.calculateDistance(location, sensor.location);
      if (distance <= radius) {
        // Update sensor readings with current data
        sensor.readings = this.generateSensorReadings(sensor.sensor_type);
        nearbySensors.push(sensor);
      }
    });

    return nearbySensors;
  }

  private analyzeEnvironmentalConditions(sensors: EnvironmentalSensor[]): Record<string, any> {
    const conditions: Record<string, any> = {
      air_quality_index: 0,
      noise_pollution_level: 0,
      crowd_stress_factor: 0,
      electromagnetic_interference: 0,
      chemical_threat_level: 0,
      overall_environmental_stress: 0
    };

    sensors.forEach(sensor => {
      switch (sensor.sensor_type) {
        case 'air_quality':
          conditions.air_quality_index = this.calculateAQI(sensor.readings);
          break;
        case 'noise_level':
          conditions.noise_pollution_level = this.calculateNoisePollution(sensor.readings);
          break;
        case 'crowd_density':
          conditions.crowd_stress_factor = this.calculateCrowdStress(sensor.readings);
          break;
        case 'electromagnetic_fields':
          conditions.electromagnetic_interference = this.calculateEMFThreat(sensor.readings);
          break;
        case 'chemical_detection':
          conditions.chemical_threat_level = this.calculateChemicalThreat(sensor.readings);
          break;
        case 'stress_pheromones':
          conditions.pheromone_stress_level = this.calculatePheromoneStress(sensor.readings);
          break;
      }
    });

    // Calculate overall environmental stress
    const stressFactors = [
      conditions.air_quality_index / 500, // Normalize AQI
      conditions.noise_pollution_level / 100,
      conditions.crowd_stress_factor,
      conditions.electromagnetic_interference,
      conditions.chemical_threat_level,
      conditions.pheromone_stress_level || 0
    ];

    conditions.overall_environmental_stress = 
      stressFactors.reduce((sum, factor) => sum + factor, 0) / stressFactors.length;

    return conditions;
  }

  private correlateBehaviorPatterns(conditions: Record<string, any>): Record<string, number> {
    const correlations: Record<string, number> = {};

    // Correlate environmental conditions with behavioral impacts
    this.behaviorCorrelations.forEach((correlation, pattern) => {
      const [environmental, behavioral] = pattern.split('_');
      
      if (conditions[`${environmental}_index`] || conditions[`${environmental}_level`] || conditions[`${environmental}_factor`]) {
        const environmentalValue = 
          conditions[`${environmental}_index`] || 
          conditions[`${environmental}_level`] || 
          conditions[`${environmental}_factor`] || 0;
        
        correlations[behavioral] = environmentalValue * correlation;
      }
    });

    return correlations;
  }

  private predictEnvironmentalThreats(
    conditions: Record<string, any>,
    correlations: Record<string, number>,
    location: { lat: number; lng: number }
  ): EnvironmentalThreat[] {
    const threats: EnvironmentalThreat[] = [];

    // Analyze each threat pattern
    this.threatPatterns.forEach((pattern, threatType) => {
      const threatScore = this.calculateThreatScore(pattern, conditions, correlations);
      
      if (threatScore > 0.3) { // Threshold for threat detection
        threats.push({
          threat_type: threatType,
          severity: this.calculateThreatSeverity(threatScore),
          location,
          environmental_factors: this.getRelevantFactors(pattern, conditions),
          human_behavior_correlation: pattern.correlation_strength,
          prediction_confidence: threatScore,
          mitigation_strategies: this.generateMitigationStrategies(threatType, threatScore)
        });
      }
    });

    return threats.sort((a, b) => b.prediction_confidence - a.prediction_confidence);
  }

  private calculateThreatScore(
    pattern: any,
    conditions: Record<string, any>,
    correlations: Record<string, number>
  ): number {
    let score = 0;
    let factorCount = 0;

    pattern.environmental_factors.forEach((factor: string) => {
      const conditionKey = Object.keys(conditions).find(key => 
        key.toLowerCase().includes(factor.toLowerCase())
      );
      
      if (conditionKey) {
        const normalizedValue = Math.min(1, conditions[conditionKey] / 100);
        score += normalizedValue * pattern.correlation_strength;
        factorCount++;
      }
    });

    // Factor in behavioral correlations
    const behavioralImpact = correlations[pattern.behavioral_impact] || 0;
    score += behavioralImpact * 0.3;

    return factorCount > 0 ? score / (factorCount + 1) : 0;
  }

  private calculateThreatSeverity(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score > 0.8) return 'critical';
    if (score > 0.6) return 'high';
    if (score > 0.4) return 'medium';
    return 'low';
  }

  private getRelevantFactors(pattern: any, conditions: Record<string, any>): Record<string, any> {
    const relevantFactors: Record<string, any> = {};
    
    pattern.environmental_factors.forEach((factor: string) => {
      const conditionKey = Object.keys(conditions).find(key => 
        key.toLowerCase().includes(factor.toLowerCase())
      );
      
      if (conditionKey) {
        relevantFactors[factor] = conditions[conditionKey];
      }
    });

    return relevantFactors;
  }

  private generateMitigationStrategies(threatType: string, score: number): string[] {
    const strategies: Record<string, string[]> = {
      'air_pollution_aggression': [
        'Recommend indoor activities',
        'Suggest air filtration masks',
        'Alert to avoid high-traffic areas',
        'Provide stress management techniques'
      ],
      'noise_stress_vulnerability': [
        'Recommend noise-canceling headphones',
        'Suggest quieter route alternatives',
        'Provide relaxation breathing exercises',
        'Alert to potential stress triggers'
      ],
      'crowd_density_panic': [
        'Identify alternative routes with lower density',
        'Provide real-time crowd level updates',
        'Suggest optimal timing for travel',
        'Emergency exit route planning'
      ],
      'electromagnetic_disorientation': [
        'Recommend EMF shielding accessories',
        'Suggest areas with lower EMF exposure',
        'Provide grounding techniques',
        'Alert to navigation difficulties'
      ],
      'chemical_fear_response': [
        'Immediate area evacuation recommendation',
        'Provide emergency contact information',
        'Suggest protective breathing techniques',
        'Real-time air quality monitoring'
      ]
    };

    const baseStrategies = strategies[threatType] || ['Monitor situation closely'];
    
    if (score > 0.7) {
      baseStrategies.unshift('Immediate action required');
    }

    return baseStrategies;
  }

  // Helper calculation methods
  private calculateAQI(readings: Record<string, number>): number {
    // Simplified AQI calculation
    const pm25 = readings.pm25 || 0;
    const pm10 = readings.pm10 || 0;
    const ozone = readings.ozone || 0;
    
    return Math.max(pm25 * 4, pm10 * 2, ozone * 1.5);
  }

  private calculateNoisePollution(readings: Record<string, number>): number {
    const decibels = readings.decibels || 0;
    const spikes = readings.sudden_spikes || 0;
    
    return Math.min(100, decibels + spikes * 5);
  }

  private calculateCrowdStress(readings: Record<string, number>): number {
    const density = readings.people_per_sqm || 0;
    const congestion = readings.congestion_level || 0;
    
    return Math.min(1, (density / 5) + congestion) / 2;
  }

  private calculateEMFThreat(readings: Record<string, number>): number {
    const strength = readings.emf_strength || 0;
    const interference = readings.signal_interference || 0;
    
    return Math.min(1, (strength / 1000) + interference) / 2;
  }

  private calculateChemicalThreat(readings: Record<string, number>): number {
    const volatile = readings.volatile_compounds || 0;
    const toxic = readings.toxic_gases || 0;
    const unknown = readings.unknown_chemicals || 0;
    
    return Math.min(1, (volatile / 500) + (toxic / 10) + (unknown / 5)) / 3;
  }

  private calculatePheromoneStress(readings: Record<string, number>): number {
    const cortisol = readings.cortisol_airborne || 0;
    const adrenaline = readings.adrenaline_traces || 0;
    const fear = readings.fear_pheromones || 0;
    
    return Math.min(1, (cortisol / 100) + (adrenaline / 50) + (fear / 75)) / 3;
  }

  private calculateDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = point1.lat * Math.PI / 180;
    const φ2 = point2.lat * Math.PI / 180;
    const Δφ = (point2.lat - point1.lat) * Math.PI / 180;
    const Δλ = (point2.lng - point1.lng) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  private async storeEnvironmentalAnalysis(
    location: { lat: number; lng: number },
    conditions: Record<string, any>,
    threats: EnvironmentalThreat[]
  ): Promise<void> {
    // Commented out to avoid RLS policy violation in demo environment
    /*
    try {
      // Store environmental sensor data
      const { error } = await supabase
        .from('environmental_sensors')
        .insert([{
          sensor_id: `analysis_${Date.now()}`,
          location,
          sensor_type: 'environmental_analysis',
          readings: conditions,
          air_quality_index: conditions.air_quality_index,
          noise_levels: conditions.noise_pollution_level,
          crowd_density: conditions.crowd_stress_factor,
          stress_pheromones: conditions.pheromone_stress_level || 0,
          electromagnetic_fields: conditions.electromagnetic_interference
        }]);

      if (error) {
        console.error('Failed to store environmental analysis:', error);
      }
    } catch (error) {
      console.error('Environmental analysis storage error:', error);
    }
    */
    
    // Log to console instead
    console.log('Environmental analysis generated (storage disabled for demo):', {
      location,
      conditions,
      threats
    });
  }
}