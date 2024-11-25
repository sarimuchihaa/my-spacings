import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = "./uploads/";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir); // Ensure the uploads directory exists
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Save files in uploads/
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = Date.now() + fileExtension;
    cb(null, fileName); // Unique filename with timestamp
  },
});

// File size limit (10 MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only .jpeg, .jpg, and .png formats are allowed!"), false);
  }
};

// Multer upload setup
export const fileUpload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: fileFilter,
});