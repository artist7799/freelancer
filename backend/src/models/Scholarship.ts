import { Schema, model } from 'mongoose';
import { IScholarship } from '../types';

const scholarshipSchema = new Schema<IScholarship>(
  {
    scholarshipName: {
      type: String,
      required: [true, 'Scholarship name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    provider: {
      type: String,
      required: [true, 'Provider information is required'],
      trim: true,
    },
    amount: {
      type: String,
      required: [true, 'Scholarship amount is required'],
    },
    eligibility: {
      type: String,
      required: [true, 'Eligibility information is required'],
    },
    deadline: {
      type: Date,
      required: [true, 'Application deadline is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    type: {
      type: String,
      required: [true, 'Scholarship type is required'],
    },
    details: {
      type: String,
      required: [true, 'Details are required'],
    },
  },
  {
    timestamps: true,
  }
);

export const Scholarship = model<IScholarship>('Scholarship', scholarshipSchema);
