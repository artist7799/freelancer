import { Schema, model } from 'mongoose';
import { IExam } from '../types';

const examSchema = new Schema<IExam>(
  {
    examName: {
      type: String,
      required: [true, 'Exam name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    eligibility: {
      type: String,
      required: [true, 'Eligibility criteria is required'],
    },
    applicationStartDate: {
      type: Date,
      required: [true, 'Application start date is required'],
    },
    applicationEndDate: {
      type: Date,
      required: [true, 'Application end date is required'],
    },
    examDate: {
      type: Date,
      required: [true, 'Exam date is required'],
    },
    resultDate: {
      type: Date,
      required: [true, 'Result date is required'],
    },
    conductingBody: {
      type: String,
      required: [true, 'Conducting body is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    mode: {
      type: String,
      enum: ['online', 'offline', 'both'],
      default: 'online',
    },
    courses: {
      type: [String],
      default: [],
    },
    syllabus: {
      type: [String],
      default: [],
    },
    pattern: {
      type: String,
      default: '',
    },
    difficulty: {
      type: String,
      default: 'Medium',
    },
  },
  {
    timestamps: true,
  }
);

export const Exam = model<IExam>('Exam', examSchema);
