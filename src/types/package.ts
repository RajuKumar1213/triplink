import { Types } from "mongoose";

export interface Itinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface Pricing {
  label: string;
  price: number;
  originalPrice?: number;
  includes: string[];
  notes?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface IPackage extends Document {
  _id: Types.ObjectId;
  slug: string;
  name: string;
  region?: string;
  shortTagline?: string;
  heroImage?: string;
  gallery: string[];
  duration?: string;
  difficulty?: string;
  altitude?: string;
  bestSeason?: string;

  category?: string;

  overview: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];

  itinerary: Itinerary[];
  pricing: Pricing[];
  faqs: FAQ[];

  bookingNote?: string;
  trending: boolean;
  icon?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPackageRequest {
  slug: string;
  name: string;
  region?: string;
  shortTagline?: string;
  heroImage?: string;
  gallery: string[];
  duration?: string;
  difficulty?: string;
  altitude?: string;
  bestSeason?: string;

  category?: string;

  overview: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];

  itinerary: Itinerary[];
  pricing: Pricing[];
  faqs: FAQ[];

  bookingNote?: string;
  trending: boolean;
  icon?: string;
}
