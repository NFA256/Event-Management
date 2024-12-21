const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET_KEY
});

// Image Upload middleware with dynamic folder based on collection
function ImageUpload(collection) {
  // Set default folder to 'uploads' if no collection is provided
  const folder = collection || 'uploads';

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder, // Dynamic folder based on collection
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
  });

  const upload = multer({ storage });

  return upload;
}

// Image Deletion from Cloudinary
async function ImageDelete(req, res, next) {
  try {
    const { OLDimageID } = req.body; 
    console.log("Extracted imageID:", OLDimageID);

    if (!OLDimageID) {
      return res.status(400).json({ error: "Image ID is required." });
    }

    await cloudinary.uploader.destroy(OLDimageID); // Delete the image from Cloudinary
    next();  // Continue with the request
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image from Cloudinary." });
  }
}

module.exports = { ImageUpload, ImageDelete };
