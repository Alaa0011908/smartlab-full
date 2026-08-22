import { RecommendationEngine as CoreEngine } from '../../core/intelligence/recommendation/RecommendationEngine';
import { RecommendationEngine as LegacyEngine, RecommendationInput } from '../../lib/recommendation/RecommendationEngine';
import { Recommendation } from '../../lib/domain/types';

export class LegacyRecommendationAdapter implements CoreEngine {
  private legacyEngine: LegacyEngine;

  constructor() {
    this.legacyEngine = new LegacyEngine();
  }

  generate(input: RecommendationInput): Recommendation | null {
    return this.legacyEngine.generate(input);
  }
}
