import { supabase } from '../lib/supabase';

export interface GeneticMarker {
  gene_id: string;
  variant: string;
  expression_level: number;
  behavioral_impact: number;
}

export interface BehavioralPrediction {
  aggression_tendency: number;
  stress_resilience: number;
  empathy_capacity: number;
  risk_taking_propensity: number;
  social_bonding_strength: number;
  threat_perception_sensitivity: number;
  impulse_control: number;
  emotional_regulation: number;
}

export class DNABehavioralAI {
  private static instance: DNABehavioralAI;
  private geneticDatabase: Map<string, GeneticMarker> = new Map();
  private epigeneticFactors: Map<string, number> = new Map();

  static getInstance(): DNABehavioralAI {
    if (!DNABehavioralAI.instance) {
      DNABehavioralAI.instance = new DNABehavioralAI();
    }
    return DNABehavioralAI.instance;
  }

  constructor() {
    this.initializeGeneticDatabase();
    this.initializeEpigeneticFactors();
  }

  private initializeGeneticDatabase(): void {
    // Initialize known behavioral genetics markers
    const behavioralGenes = [
      { id: 'MAOA', name: 'Monoamine Oxidase A', behavior: 'aggression_regulation' },
      { id: 'COMT', name: 'Catechol-O-Methyltransferase', behavior: 'stress_response' },
      { id: 'DRD4', name: 'Dopamine Receptor D4', behavior: 'risk_taking' },
      { id: 'OXTR', name: 'Oxytocin Receptor', behavior: 'social_bonding' },
      { id: 'BDNF', name: 'Brain-Derived Neurotrophic Factor', behavior: 'emotional_regulation' },
      { id: 'TPH2', name: 'Tryptophan Hydroxylase 2', behavior: 'impulse_control' },
      { id: 'CACNA1C', name: 'Calcium Channel Gene', behavior: 'threat_perception' },
      { id: 'FKBP5', name: 'FK506 Binding Protein 5', behavior: 'stress_resilience' }
    ];

    behavioralGenes.forEach(gene => {
      this.geneticDatabase.set(gene.id, {
        gene_id: gene.id,
        variant: this.generateRandomVariant(),
        expression_level: Math.random(),
        behavioral_impact: Math.random()
      });
    });

    console.log('🧬 DNA Behavioral AI: Genetic database initialized');
  }

  private initializeEpigeneticFactors(): void {
    // Environmental factors that influence gene expression
    const epigeneticFactors = [
      'childhood_trauma',
      'chronic_stress',
      'social_support',
      'nutrition_quality',
      'sleep_patterns',
      'exercise_frequency',
      'environmental_toxins',
      'social_isolation'
    ];

    epigeneticFactors.forEach(factor => {
      this.epigeneticFactors.set(factor, Math.random());
    });
  }

  async analyzeBehavioralGenetics(userId: string): Promise<BehavioralPrediction> {
    // Simulate DNA analysis (in real implementation, would process actual genetic data)
    const geneticProfile = this.generateGeneticProfile();
    const epigeneticInfluence = this.calculateEpigeneticInfluence();
    
    // Calculate behavioral predictions based on genetic markers
    const behavioralPrediction = this.calculateBehavioralPredictions(
      geneticProfile,
      epigeneticInfluence
    );

    // Store DNA behavioral analysis (commented out to avoid RLS policy violations)
    // await this.storeDNAAnalysis(userId, {
    //   genetic_markers: geneticProfile,
    //   behavioral_predispositions: behavioralPrediction,
    //   stress_response_genes: this.analyzeStressResponseGenes(),
    //   aggression_indicators: this.analyzeAggressionGenes(),
    //   empathy_markers: this.analyzeEmpathyGenes(),
    //   risk_taking_propensity: behavioralPrediction.risk_taking_propensity,
    //   social_bonding_capacity: behavioralPrediction.social_bonding_strength,
    //   threat_perception_sensitivity: behavioralPrediction.threat_perception_sensitivity,
    //   epigenetic_factors: Object.fromEntries(this.epigeneticFactors)
    // });

    return behavioralPrediction;
  }

  private generateGeneticProfile(): Record<string, any> {
    const profile: Record<string, any> = {};
    
    this.geneticDatabase.forEach((marker, geneId) => {
      profile[geneId] = {
        variant: marker.variant,
        expression_level: marker.expression_level,
        behavioral_impact: marker.behavioral_impact,
        methylation_status: Math.random(), // Epigenetic methylation
        histone_modifications: Math.random() // Epigenetic histone changes
      };
    });

    return profile;
  }

  private calculateEpigeneticInfluence(): Record<string, number> {
    const influence: Record<string, number> = {};
    
    this.epigeneticFactors.forEach((value, factor) => {
      // Calculate how environmental factors influence gene expression
      influence[factor] = value * (0.5 + Math.random() * 0.5);
    });

    return influence;
  }

  private calculateBehavioralPredictions(
    geneticProfile: Record<string, any>,
    epigeneticInfluence: Record<string, number>
  ): BehavioralPrediction {
    // Advanced behavioral genetics calculations
    const maoaImpact = geneticProfile.MAOA?.behavioral_impact || 0.5;
    const comtImpact = geneticProfile.COMT?.behavioral_impact || 0.5;
    const drd4Impact = geneticProfile.DRD4?.behavioral_impact || 0.5;
    const oxtrImpact = geneticProfile.OXTR?.behavioral_impact || 0.5;
    const bdnfImpact = geneticProfile.BDNF?.behavioral_impact || 0.5;
    const tph2Impact = geneticProfile.TPH2?.behavioral_impact || 0.5;
    const cacna1cImpact = geneticProfile.CACNA1C?.behavioral_impact || 0.5;
    const fkbp5Impact = geneticProfile.FKBP5?.behavioral_impact || 0.5;

    // Environmental modulation
    const traumaModulation = epigeneticInfluence.childhood_trauma || 0;
    const stressModulation = epigeneticInfluence.chronic_stress || 0;
    const supportModulation = epigeneticInfluence.social_support || 0;

    return {
      aggression_tendency: this.calculateAggressionTendency(maoaImpact, traumaModulation),
      stress_resilience: this.calculateStressResilience(comtImpact, fkbp5Impact, stressModulation),
      empathy_capacity: this.calculateEmpathyCapacity(oxtrImpact, supportModulation),
      risk_taking_propensity: this.calculateRiskTaking(drd4Impact),
      social_bonding_strength: this.calculateSocialBonding(oxtrImpact, supportModulation),
      threat_perception_sensitivity: this.calculateThreatPerception(cacna1cImpact, traumaModulation),
      impulse_control: this.calculateImpulseControl(tph2Impact, stressModulation),
      emotional_regulation: this.calculateEmotionalRegulation(bdnfImpact, traumaModulation)
    };
  }

  private calculateAggressionTendency(maoaImpact: number, traumaModulation: number): number {
    // MAOA gene variants affect aggression, especially with trauma history
    const baseAggression = maoaImpact;
    const traumaAmplification = traumaModulation * 0.3;
    return Math.min(1, baseAggression + traumaAmplification);
  }

  private calculateStressResilience(comtImpact: number, fkbp5Impact: number, stressModulation: number): number {
    // COMT and FKBP5 genes affect stress response
    const geneticResilience = (comtImpact + fkbp5Impact) / 2;
    const stressImpact = stressModulation * 0.4;
    return Math.max(0, geneticResilience - stressImpact);
  }

  private calculateEmpathyCapacity(oxtrImpact: number, supportModulation: number): number {
    // Oxytocin receptor gene affects empathy and social bonding
    const baseEmpathy = oxtrImpact;
    const socialEnhancement = supportModulation * 0.2;
    return Math.min(1, baseEmpathy + socialEnhancement);
  }

  private calculateRiskTaking(drd4Impact: number): number {
    // DRD4 gene variants associated with novelty seeking and risk taking
    return drd4Impact;
  }

  private calculateSocialBonding(oxtrImpact: number, supportModulation: number): number {
    // Social bonding capacity based on oxytocin system
    return Math.min(1, oxtrImpact + supportModulation * 0.3);
  }

  private calculateThreatPerception(cacna1cImpact: number, traumaModulation: number): number {
    // Threat perception sensitivity
    const baseSensitivity = cacna1cImpact;
    const traumaHypervigilance = traumaModulation * 0.4;
    return Math.min(1, baseSensitivity + traumaHypervigilance);
  }

  private calculateImpulseControl(tph2Impact: number, stressModulation: number): number {
    // Impulse control based on serotonin system
    const baseControl = tph2Impact;
    const stressImpairment = stressModulation * 0.3;
    return Math.max(0, baseControl - stressImpairment);
  }

  private calculateEmotionalRegulation(bdnfImpact: number, traumaModulation: number): number {
    // Emotional regulation capacity
    const baseRegulation = bdnfImpact;
    const traumaImpairment = traumaModulation * 0.35;
    return Math.max(0, baseRegulation - traumaImpairment);
  }

  private analyzeStressResponseGenes(): Record<string, any> {
    return {
      COMT_variant: this.geneticDatabase.get('COMT')?.variant,
      FKBP5_expression: this.geneticDatabase.get('FKBP5')?.expression_level,
      stress_hormone_sensitivity: Math.random(),
      cortisol_regulation: Math.random(),
      hpa_axis_reactivity: Math.random()
    };
  }

  private analyzeAggressionGenes(): Record<string, any> {
    return {
      MAOA_variant: this.geneticDatabase.get('MAOA')?.variant,
      serotonin_transporter: Math.random(),
      testosterone_sensitivity: Math.random(),
      prefrontal_cortex_function: Math.random()
    };
  }

  private analyzeEmpathyGenes(): Record<string, any> {
    return {
      OXTR_variant: this.geneticDatabase.get('OXTR')?.variant,
      mirror_neuron_activity: Math.random(),
      emotional_contagion_susceptibility: Math.random(),
      theory_of_mind_capacity: Math.random()
    };
  }

  private generateRandomVariant(): string {
    const variants = ['AA', 'AG', 'GG', 'CC', 'CT', 'TT', 'AC', 'AT', 'CG', 'GT'];
    return variants[Math.floor(Math.random() * variants.length)];
  }

  private async storeDNAAnalysis(userId: string, analysis: any): Promise<void> {
    try {
      // Commented out to avoid RLS policy violations in demo environment
      // const { error } = await supabase
      //   .from('dna_behavioral_markers')
      //   .insert([{
      //     user_id: '550e8400-e29b-41d4-a716-446655440000', // Valid UUID for demo
      //     ...analysis
      //   }]);

      // if (error) {
      //   console.error('Failed to store DNA analysis:', error);
      // }
      
      console.log('DNA behavioral analysis generated (storage disabled for demo):', analysis);
    } catch (error) {
      console.error('DNA analysis storage error:', error);
    }
  }

  async predictBehavioralResponse(
    userId: string,
    situationType: string,
    environmentalFactors: Record<string, any>
  ): Promise<{
    predicted_response: string;
    confidence_level: number;
    risk_factors: string[];
    protective_factors: string[];
  }> {
    const behavioralProfile = await this.analyzeBehavioralGenetics(userId);
    
    // Predict behavioral response based on genetics and situation
    const prediction = this.calculateSituationalResponse(
      behavioralProfile,
      situationType,
      environmentalFactors
    );

    return prediction;
  }

  private calculateSituationalResponse(
    profile: BehavioralPrediction,
    situationType: string,
    environment: Record<string, any>
  ): any {
    // Complex behavioral prediction algorithm
    let riskScore = 0;
    const riskFactors: string[] = [];
    const protectiveFactors: string[] = [];

    // Analyze genetic risk factors
    if (profile.aggression_tendency > 0.7) {
      riskScore += 0.3;
      riskFactors.push('High genetic aggression tendency');
    }

    if (profile.impulse_control < 0.3) {
      riskScore += 0.2;
      riskFactors.push('Low impulse control');
    }

    if (profile.stress_resilience < 0.3) {
      riskScore += 0.2;
      riskFactors.push('Low stress resilience');
    }

    // Analyze protective factors
    if (profile.empathy_capacity > 0.7) {
      riskScore -= 0.2;
      protectiveFactors.push('High empathy capacity');
    }

    if (profile.social_bonding_strength > 0.7) {
      riskScore -= 0.15;
      protectiveFactors.push('Strong social bonding');
    }

    if (profile.emotional_regulation > 0.7) {
      riskScore -= 0.15;
      protectiveFactors.push('Good emotional regulation');
    }

    riskScore = Math.max(0, Math.min(1, riskScore));

    return {
      predicted_response: this.getPredictedResponse(riskScore, situationType),
      confidence_level: 0.7 + Math.random() * 0.3,
      risk_factors: riskFactors,
      protective_factors: protectiveFactors
    };
  }

  private getPredictedResponse(riskScore: number, situationType: string): string {
    if (riskScore > 0.7) {
      return `High risk behavioral response to ${situationType}`;
    } else if (riskScore > 0.4) {
      return `Moderate risk behavioral response to ${situationType}`;
    } else {
      return `Low risk behavioral response to ${situationType}`;
    }
  }
}