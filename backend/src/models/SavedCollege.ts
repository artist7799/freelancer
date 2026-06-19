import { Schema, model } from 'mongoose';
import { ISavedCollege } from '../types';

const savedCollegeSchema = new Schema<ISavedCollege>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    collegeId: {
      type: Schema.Types.ObjectId,
      ref: 'College',
      required: [true, 'College ID is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Unique bookmark entries
savedCollegeSchema.index({ userId: 1, collegeId: 1 }, { unique: true });

export const SavedCollege = model<ISavedCollege>('SavedCollege', savedCollegeSchema);
