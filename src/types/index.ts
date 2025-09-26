export type View = 'main' | 'summarize' | 'settings' | 'toneRewriter' | 'proofread';

export type RewriterTone = 'more-formal' | 'as-is' | 'more-casual';
export type RewriterLength = 'shorter' | 'as-is' | 'longer';
export type RewriterFormat = 'as-is' | 'markdown' | 'plain-text';

export interface ToneOption {
  tone?: RewriterTone;
  length?: RewriterLength;
  format?: RewriterFormat;
  outputLanguage?: Language;
}

export type Theme = 'light' | 'dark';

export type SummaryStyle = 'insight' | 'bullets' | 'detailed';

export type Action = 'translate' | 'proofread' | 'rewrite' | 'summarize_insight' | 'summarize_bullets' | 'summarize_detailed';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ko' | 'ru' | 'ar' | 'pt' | 'it' | 'nl' | 'pl' | 'sv' | 'tr';