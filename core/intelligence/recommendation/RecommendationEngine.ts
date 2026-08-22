import { RecommendationInput } from '../../../lib/recommendation/RecommendationEngine';
import { Recommendation } from '../../../lib/domain/types';

export interface RecommendationEngine {
  generate(input: RecommendationInput): Recommendation | null;
}
