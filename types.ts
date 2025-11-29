export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
  delivery?: string;
  support?: string;
  amc?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string[];
  duration: string;
}

export interface CaseStudy {
  title: string;
  client: string;
  metric: string;
  description: string;
  image: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
}