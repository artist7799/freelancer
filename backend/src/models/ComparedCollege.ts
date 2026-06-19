import { Schema, model } from 'mongoose';
import { IComparedCollege } from '../types';

const comparedCollegeSchema = new Schema<IComparedCollege>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true, // One comparison basket per user
    },
    collegeIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'College',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ComparedCollege = model<IComparedCollege>('ComparedCollege', comparedCollegeSchema);
