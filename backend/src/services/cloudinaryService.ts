import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary';

const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads');

// Ensure local uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  if (isCloudinaryConfigured) {
    // Upload to Cloudinary using file stream/path
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        file.path,
        {
          folder: 'arunanandedtech',
          resource_type: 'image',
        },
        (error, result) => {
          // Delete temp local file from disk after upload attempt
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
          if (error) return reject(error);
          resolve(result?.secure_url || '');
        }
      );
    });
  } else {
    // Offline local fallback: Move temp file to persistent uploads directory
    const fileName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;
    const destinationPath = path.join(UPLOADS_DIR, fileName);
    
    fs.renameSync(file.path, destinationPath);
    console.log(`Saved file locally: ${destinationPath}`);
    return `/uploads/${fileName}`;
  }
};
