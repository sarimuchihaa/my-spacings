import multer from 'multer';
import cloudinary from '../utils/cloudinaryConfig.js';

export const uploadPhoto = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 20_000_000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Not image! Please upload only images.'), false);
    },
});


const uploadToCloudinary = (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error) reject(error);
        else resolve( result);
        }).end(buffer);
    });
};


export const resizeAndUploadImage = async (req, res, next) => {
    if (!req.file) return next();

    try {
        const result = await uploadToCloudinary(req.file.buffer, {
            transformation: [{ width: 200, height: 200, crop: "limit" }],
        });
    console.log("result---------------",result)
        req.image = result.url;
        next();
    } catch (error) {
        next(error);
    }
};