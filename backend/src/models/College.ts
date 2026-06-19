import { Schema, model } from 'mongoose';
import { ICollege } from '../types';

const collegeSchema = new Schema<ICollege>(
  {
    collegeName: {
      type: String,
      required: [true, 'College name is required'],
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Display name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    logo: {
      type: String,
      default: '',
    },
    banner: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    about: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    country: {
      type: String,
      default: 'India',
      trim: true,
    },
    ranking: {
      type: String,
      default: '',
    },
    nirfRanking: {
      type: Number,
      default: null,
    },
    accreditation: {
      type: String,
      default: '',
    },
    establishedYear: {
      type: Number,
      required: [true, 'Established year is required'],
    },
    fees: {
      type: String,
      required: [true, 'Fees information is required'],
    },
    placementPercentage: {
      type: Number,
      default: null,
    },
    averagePackage: {
      type: String,
      default: '',
    },
    highestPackage: {
      type: String,
      default: '',
    },
    placements: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 4.0,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    website: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    facilities: {
      type: [String],
      default: [],
    },
    infrastructure: {
      type: [String],
      default: [],
    },
    gallery: {
      type: [String],
      default: [],
    },
    courses: [
      {
        name: { type: String, required: true },
        fees: { type: String, required: true },
        seats: { type: Number, default: 60 },
      },
    ],
    placementDetails: [
      {
        company: { type: String, required: true },
        package: { type: String, required: true },
      },
    ],
    scholarships: [
      {
        name: { type: String, required: true },
        criteria: { type: String, default: '' },
        amount: { type: String, required: true },
      },
    ],
    hostels: [
      {
        type: { type: String, required: true },
        sharing: { type: String, default: '' },
        fees: { type: String, required: true },
      },
    ],
    reviews: [
      {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        text: { type: String, required: true },
        date: { type: String, required: true },
      },
    ],
    faq: [
      {
        q: { type: String, required: true },
        a: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index fields for fast text-based search queries
collegeSchema.index({ name: 'text', collegeName: 'text', city: 'text', state: 'text', description: 'text', category: 'text' });

export const College = model<ICollege>('College', collegeSchema);
