import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vduusuucucxombazrbed.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdXVzdXVjdWN4b21iYXpyYmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4NTAyNTEsImV4cCI6MjAwMjQyNjI1MX0.qDPJUVP_-B-eTvTQEXZDYgXA0NxRzZAJMObY7P5LqMI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Database types
export interface User {
  id: string;
  email: string;
  full_name: string;
  user_type: 'child' | 'woman' | 'elderly' | 'disabled' | 'guardian';
  age?: number;
  accessibility_needs: Record<string, any>;
  medical_conditions: Record<string, any>;
  emergency_contacts: Array<any>;
  quantum_id?: string;
  dna_behavioral_profile: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ThreatIncident {
  id: string;
  user_id: string;
  incident_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: Record<string, any>;
  ai_confidence_score: number;
  quantum_threat_probability?: number;
  environmental_factors: Record<string, any>;
  social_context: Record<string, any>;
  blockchain_hash?: string;
  status: 'active' | 'investigating' | 'resolved' | 'false_positive';
  created_at: string;
}

export interface QuantumPrediction {
  id: string;
  user_id: string;
  prediction_type: string;
  quantum_state_vector: Record<string, any>;
  probability_matrix: Record<string, any>;
  entanglement_factors: Record<string, any>;
  superposition_analysis: Record<string, any>;
  prediction_accuracy?: number;
  quantum_coherence_time?: number;
  decoherence_factors: Record<string, any>;
  created_at: string;
}

export interface DNABehavioralMarker {
  id: string;
  user_id: string;
  genetic_markers: Record<string, any>;
  behavioral_predispositions: Record<string, any>;
  stress_response_genes: Record<string, any>;
  aggression_indicators: Record<string, any>;
  empathy_markers: Record<string, any>;
  risk_taking_propensity?: number;
  social_bonding_capacity?: number;
  threat_perception_sensitivity?: number;
  epigenetic_factors: Record<string, any>;
  created_at: string;
}

export interface MicroExpressionAnalysis {
  id: string;
  user_id: string;
  expression_type: string;
  duration_milliseconds: number;
  intensity_score: number;
  facial_action_units: Record<string, any>;
  emotional_leakage_indicators: Record<string, any>;
  deception_probability?: number;
  cultural_expression_context: Record<string, any>;
  micro_muscle_movements: Record<string, any>;
  pupil_dilation_data: Record<string, any>;
  recorded_at: string;
}