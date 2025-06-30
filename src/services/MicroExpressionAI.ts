import { supabase } from '../lib/supabase';

export interface FacialActionUnit {
  au_number: number;
  au_name: string;
  intensity: number;
  duration_ms: number;
  onset_time: number;
}

export interface MicroExpression {
  expression_type: string;
  duration_milliseconds: number;
  intensity_score: number;
  facial_action_units: FacialActionUnit[];
  emotional_leakage: boolean;
  deception_probability: number;
  cultural_context: string;
}

export interface EmotionalLeakage {
  concealed_emotion: string;
  leaked_emotion: string;
  leakage_intensity: number;
  suppression_effort: number;
  authenticity_score: number;
}

export class MicroExpressionAI {
  private static instance: MicroExpressionAI;
  private facialActionUnits: Map<number, string> = new Map();
  private culturalExpressionNorms: Map<string, Record<string, number>> = new Map();
  private deceptionIndicators: string[] = [];

  static getInstance(): MicroExpressionAI {
    if (!MicroExpressionAI.instance) {
      MicroExpressionAI.instance = new MicroExpressionAI();
    }
    return MicroExpressionAI.instance;
  }

  constructor() {
    this.initializeFacialActionUnits();
    this.initializeCulturalNorms();
    this.initializeDeceptionIndicators();
  }

  private initializeFacialActionUnits(): void {
    // Facial Action Coding System (FACS) units
    const facs = [
      { number: 1, name: 'Inner Brow Raiser' },
      { number: 2, name: 'Outer Brow Raiser' },
      { number: 4, name: 'Brow Lowerer' },
      { number: 5, name: 'Upper Lid Raiser' },
      { number: 6, name: 'Cheek Raiser' },
      { number: 7, name: 'Lid Tightener' },
      { number: 9, name: 'Nose Wrinkler' },
      { number: 10, name: 'Upper Lip Raiser' },
      { number: 12, name: 'Lip Corner Puller' },
      { number: 15, name: 'Lip Corner Depressor' },
      { number: 17, name: 'Chin Raiser' },
      { number: 20, name: 'Lip Stretcher' },
      { number: 23, name: 'Lip Tightener' },
      { number: 24, name: 'Lip Pressor' },
      { number: 25, name: 'Lips Part' },
      { number: 26, name: 'Jaw Drop' },
      { number: 27, name: 'Mouth Stretch' }
    ];

    facs.forEach(au => {
      this.facialActionUnits.set(au.number, au.name);
    });

    console.log('😊 Micro-Expression AI: FACS units initialized');
  }

  private initializeCulturalNorms(): void {
    // Cultural expression norms for different populations
    this.culturalExpressionNorms.set('western', {
      eye_contact_comfort: 0.8,
      smile_frequency: 0.7,
      emotional_expressiveness: 0.6,
      personal_space_preference: 0.7
    });

    this.culturalExpressionNorms.set('eastern', {
      eye_contact_comfort: 0.4,
      smile_frequency: 0.5,
      emotional_expressiveness: 0.3,
      personal_space_preference: 0.5
    });

    this.culturalExpressionNorms.set('mediterranean', {
      eye_contact_comfort: 0.9,
      smile_frequency: 0.8,
      emotional_expressiveness: 0.9,
      personal_space_preference: 0.3
    });
  }

  private initializeDeceptionIndicators(): void {
    this.deceptionIndicators = [
      'asymmetric_smile',
      'micro_fear_expression',
      'eye_contact_avoidance',
      'lip_compression',
      'nostril_dilation',
      'eyebrow_flash',
      'forced_smile_markers',
      'emotional_incongruence'
    ];
  }

  async analyzeMicroExpressions(
    userId: string,
    faceImageData: ImageData,
    culturalContext: string = 'western'
  ): Promise<{
    microExpressions: MicroExpression[];
    emotionalLeakage: EmotionalLeakage | null;
    deceptionProbability: number;
    authenticityScore: number;
  }> {
    // Simulate advanced micro-expression analysis
    const facialActionUnits = this.detectFacialActionUnits(faceImageData);
    const microExpressions = this.identifyMicroExpressions(facialActionUnits);
    const emotionalLeakage = this.detectEmotionalLeakage(microExpressions);
    const deceptionProbability = this.calculateDeceptionProbability(microExpressions, emotionalLeakage);
    const authenticityScore = this.calculateAuthenticityScore(microExpressions, culturalContext);

    // Store micro-expression analysis (commented out to avoid RLS policy violations)
    // for (const microExpression of microExpressions) {
    //   await this.storeMicroExpressionAnalysis(userId, microExpression, culturalContext);
    // }

    return {
      microExpressions,
      emotionalLeakage,
      deceptionProbability,
      authenticityScore
    };
  }

  private detectFacialActionUnits(imageData: ImageData): FacialActionUnit[] {
    // Simulate facial action unit detection using computer vision
    const detectedAUs: FacialActionUnit[] = [];
    
    // Simulate detection of various facial action units
    const activeAUs = [1, 2, 6, 12, 25]; // Common AUs for analysis
    
    activeAUs.forEach(auNumber => {
      if (Math.random() > 0.3) { // 70% chance of detection
        detectedAUs.push({
          au_number: auNumber,
          au_name: this.facialActionUnits.get(auNumber) || 'Unknown',
          intensity: Math.random() * 5, // 0-5 intensity scale
          duration_ms: 50 + Math.random() * 450, // 50-500ms duration
          onset_time: Math.random() * 1000 // Onset within 1 second
        });
      }
    });

    return detectedAUs;
  }

  private identifyMicroExpressions(facialActionUnits: FacialActionUnit[]): MicroExpression[] {
    const microExpressions: MicroExpression[] = [];
    
    // Analyze combinations of facial action units to identify micro-expressions
    const expressionPatterns = this.analyzeExpressionPatterns(facialActionUnits);
    
    expressionPatterns.forEach(pattern => {
      if (pattern.duration < 500) { // Micro-expressions are < 500ms
        microExpressions.push({
          expression_type: pattern.emotion,
          duration_milliseconds: pattern.duration,
          intensity_score: pattern.intensity,
          facial_action_units: pattern.actionUnits,
          emotional_leakage: pattern.isLeakage,
          deception_probability: pattern.deceptionRisk,
          cultural_context: 'western' // Default context
        });
      }
    });

    return microExpressions;
  }

  private analyzeExpressionPatterns(aus: FacialActionUnit[]): any[] {
    const patterns = [];
    
    // Fear micro-expression pattern (AU 1+2+4+5+20+26)
    if (this.hasAUCombination(aus, [1, 2, 4, 5])) {
      patterns.push({
        emotion: 'micro_fear',
        duration: this.calculateAverageDuration(aus),
        intensity: this.calculateAverageIntensity(aus),
        actionUnits: aus.filter(au => [1, 2, 4, 5].includes(au.au_number)),
        isLeakage: true,
        deceptionRisk: 0.7
      });
    }

    // Disgust micro-expression pattern (AU 9+15+16)
    if (this.hasAUCombination(aus, [9, 15])) {
      patterns.push({
        emotion: 'micro_disgust',
        duration: this.calculateAverageDuration(aus),
        intensity: this.calculateAverageIntensity(aus),
        actionUnits: aus.filter(au => [9, 15].includes(au.au_number)),
        isLeakage: true,
        deceptionRisk: 0.6
      });
    }

    // Contempt micro-expression pattern (AU 12+14)
    if (this.hasAUCombination(aus, [12])) {
      patterns.push({
        emotion: 'micro_contempt',
        duration: this.calculateAverageDuration(aus),
        intensity: this.calculateAverageIntensity(aus),
        actionUnits: aus.filter(au => au.au_number === 12),
        isLeakage: true,
        deceptionRisk: 0.8
      });
    }

    // Forced smile detection (AU 12 without AU 6)
    const hasSmile = this.hasAUCombination(aus, [12]);
    const hasEyeSmile = this.hasAUCombination(aus, [6]);
    
    if (hasSmile && !hasEyeSmile) {
      patterns.push({
        emotion: 'forced_smile',
        duration: this.calculateAverageDuration(aus),
        intensity: this.calculateAverageIntensity(aus),
        actionUnits: aus.filter(au => au.au_number === 12),
        isLeakage: true,
        deceptionRisk: 0.9
      });
    }

    return patterns;
  }

  private detectEmotionalLeakage(microExpressions: MicroExpression[]): EmotionalLeakage | null {
    // Detect when concealed emotions leak through micro-expressions
    const leakageExpressions = microExpressions.filter(expr => expr.emotional_leakage);
    
    if (leakageExpressions.length === 0) return null;

    const strongestLeakage = leakageExpressions.reduce((prev, current) => 
      current.intensity_score > prev.intensity_score ? current : prev
    );

    return {
      concealed_emotion: this.inferConcealedEmotion(strongestLeakage),
      leaked_emotion: strongestLeakage.expression_type,
      leakage_intensity: strongestLeakage.intensity_score,
      suppression_effort: this.calculateSuppressionEffort(strongestLeakage),
      authenticity_score: 1 - strongestLeakage.deception_probability
    };
  }

  private calculateDeceptionProbability(
    microExpressions: MicroExpression[],
    emotionalLeakage: EmotionalLeakage | null
  ): number {
    let deceptionScore = 0;
    let factorCount = 0;

    // Analyze micro-expression indicators
    microExpressions.forEach(expr => {
      if (expr.deception_probability > 0.5) {
        deceptionScore += expr.deception_probability;
        factorCount++;
      }
    });

    // Factor in emotional leakage
    if (emotionalLeakage && emotionalLeakage.suppression_effort > 0.7) {
      deceptionScore += 0.3;
      factorCount++;
    }

    // Check for specific deception markers
    const hasDeceptionMarkers = this.checkDeceptionMarkers(microExpressions);
    if (hasDeceptionMarkers) {
      deceptionScore += 0.4;
      factorCount++;
    }

    return factorCount > 0 ? Math.min(1, deceptionScore / factorCount) : 0;
  }

  private calculateAuthenticityScore(
    microExpressions: MicroExpression[],
    culturalContext: string
  ): number {
    const culturalNorms = this.culturalExpressionNorms.get(culturalContext) || 
                         this.culturalExpressionNorms.get('western')!;

    let authenticityScore = 1;

    // Reduce authenticity for forced expressions
    const forcedExpressions = microExpressions.filter(expr => 
      expr.expression_type.includes('forced') || expr.deception_probability > 0.7
    );

    authenticityScore -= forcedExpressions.length * 0.2;

    // Adjust for cultural context
    const expressiveness = microExpressions.length / 10; // Normalize expression count
    const culturalExpectedExpressiveness = culturalNorms.emotional_expressiveness;
    
    const expressivenessDifference = Math.abs(expressiveness - culturalExpectedExpressiveness);
    authenticityScore -= expressivenessDifference * 0.1;

    return Math.max(0, Math.min(1, authenticityScore));
  }

  private hasAUCombination(aus: FacialActionUnit[], requiredAUs: number[]): boolean {
    return requiredAUs.every(requiredAU => 
      aus.some(au => au.au_number === requiredAU)
    );
  }

  private calculateAverageDuration(aus: FacialActionUnit[]): number {
    return aus.reduce((sum, au) => sum + au.duration_ms, 0) / aus.length;
  }

  private calculateAverageIntensity(aus: FacialActionUnit[]): number {
    return aus.reduce((sum, au) => sum + au.intensity, 0) / aus.length;
  }

  private inferConcealedEmotion(leakageExpression: MicroExpression): string {
    // Infer what emotion is being concealed based on the leaked micro-expression
    const emotionMap: Record<string, string> = {
      'micro_fear': 'anxiety',
      'micro_disgust': 'disapproval',
      'micro_contempt': 'superiority',
      'forced_smile': 'sadness_or_anger'
    };

    return emotionMap[leakageExpression.expression_type] || 'unknown';
  }

  private calculateSuppressionEffort(expression: MicroExpression): number {
    // Calculate how much effort is being put into suppressing the emotion
    const baseEffort = expression.deception_probability;
    const intensityFactor = expression.intensity_score / 5; // Normalize to 0-1
    const durationFactor = Math.min(1, expression.duration_milliseconds / 500); // Longer = more effort
    
    return Math.min(1, baseEffort + intensityFactor * 0.3 + durationFactor * 0.2);
  }

  private checkDeceptionMarkers(microExpressions: MicroExpression[]): boolean {
    // Check for specific patterns associated with deception
    const deceptionPatterns = [
      'forced_smile',
      'micro_fear',
      'micro_contempt'
    ];

    return microExpressions.some(expr => 
      deceptionPatterns.includes(expr.expression_type)
    );
  }

  private async storeMicroExpressionAnalysis(
    userId: string,
    microExpression: MicroExpression,
    culturalContext: string
  ): Promise<void> {
    try {
      // Commented out to avoid RLS policy violations in demo environment
      // const { error } = await supabase
      //   .from('micro_expression_analysis')
      //   .insert([{
      //     user_id: '550e8400-e29b-41d4-a716-446655440000', // Valid UUID for demo
      //     expression_type: microExpression.expression_type,
      //     duration_milliseconds: Math.round(microExpression.duration_milliseconds), // Round to integer
      //     intensity_score: Math.round(microExpression.intensity_score * 100), // Convert to integer percentage
      //     facial_action_units: microExpression.facial_action_units,
      //     emotional_leakage_indicators: { emotional_leakage: microExpression.emotional_leakage },
      //     deception_probability: microExpression.deception_probability,
      //     cultural_expression_context: { context: culturalContext },
      //     micro_muscle_movements: microExpression.facial_action_units,
      //     pupil_dilation_data: { simulated: true } // Would be real pupil data
      //   }]);

      // if (error) {
      //   console.error('Failed to store micro-expression analysis:', error);
      // }
      
      console.log('Micro-expression analysis generated (storage disabled for demo):', microExpression);
    } catch (error) {
      console.error('Micro-expression storage error:', error);
    }
  }

  async detectDeceptionInRealTime(
    userId: string,
    videoStream: MediaStream
  ): Promise<{
    isDeceptionDetected: boolean;
    confidence: number;
    deceptionIndicators: string[];
    recommendations: string[];
  }> {
    // Real-time deception detection from video stream
    // This would integrate with camera feed for continuous monitoring
    
    const mockAnalysis = {
      isDeceptionDetected: Math.random() > 0.8,
      confidence: 0.7 + Math.random() * 0.3,
      deceptionIndicators: this.deceptionIndicators.slice(0, Math.floor(Math.random() * 3)),
      recommendations: [
        'Continue monitoring for additional deception markers',
        'Cross-reference with voice stress analysis',
        'Consider environmental factors affecting expression'
      ]
    };

    return mockAnalysis;
  }
}