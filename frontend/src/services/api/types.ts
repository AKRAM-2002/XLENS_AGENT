// src/services/api/types.ts
export interface TweetAnalysis {
  fact_check: {
    accuracy_score: number;
    verified_claims: string[];
    unverified_claims: string[];
    evidence: Record<string, string>;
  };
  sentiment: {
    score: number;
    tone: string;
    emotional_triggers: string[];
    potential_impact: string;
  };
}

export interface GeneratedTweet {
  tweet_text: string;
  engagement_score: number;
  hashtags: string[];
  best_posting_time: string;
}