import { Schema, model } from 'mongoose';
import { ICourse } from '../types';

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Course category is required'],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },
    eligibility: {
      type: String,
      required: [true, 'Eligibility information is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    averageFees: {
      type: String,
      required: [true, 'Average fees information is required'],
    },
    careerOptions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Course = model<ICourse>('Course', courseSchema);
