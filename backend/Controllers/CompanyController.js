const Company = require("../Models/Company"); // Adjust the path as necessary
const {  ImageDelete } = require("../Middlewares/ImageUploading"); // Assuming your image middleware is shared

// Create a new company
const createCompany = async (req, res) => {
  try {
    const { title, description } = req.body;
    const companyImage = req.file; // Getting the uploaded image

    if (!companyImage) {
      return res.status(400).json({ message: "Company image is required" });
    }

    const newCompany = new Company({
      title,
      image: companyImage.path, // Store the image path
      ImageID : companyImage.filename, // store the image id
      description,
    });

    const savedCompany = await newCompany.save();

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: savedCompany,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create company",
      error: error.message,
    });
  }
};

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch companies",
      error: error.message,
    });
  }
};

// Get a single company by ID
const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch company",
      error: error.message,
    });
  }
};

// Update a company by ID
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, oldImage, Imagefilename } = req.body; // Get the old image info
    const companyImage = req.file; // Check if a new image is uploaded
    let companyImagePath;
    let fileID;

    // Find the company to update
    const companyToUpdate = await Company.findById(id);
    if (!companyToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // If a new image is uploaded, delete the old one from Cloudinary
    if (companyImage) {
      companyImagePath = companyImage.path;
      fileID = companyImage.filename;

      // Delete the old image from Cloudinary (if exists)
      if (companyToUpdate.ImageID) {
        try {
          // Use ImageDelete middleware to remove the old image from Cloudinary
          req.body.OLDimageID = companyToUpdate.ImageID;  // Pass the ImageID to the next middleware
          await ImageDelete(req, res, () => {}); 
        } catch (error) {
          console.error("Error deleting old image:", error.message);
          return res.status(500).json({ message: "Failed to delete old image", error: error.message });
        }
      }
    } else {
      companyImagePath = oldImage; // Keep the old image if no new one is uploaded
      fileID = Imagefilename; // Use the old image's file ID
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(title && { title }),
          ...(description && { description }),
          ...(companyImagePath && { image: companyImagePath }),
          ...(fileID && { ImageID: fileID }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      data: updatedCompany,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update company",
      error: error.message,
    });
  }
};

// Delete a company by ID
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const companyToDelete = await Company.findById(id);
    if (!companyToDelete) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Delete the image from Cloudinary if it exists
    if (companyToDelete.ImageID) {
      try {
        req.body.OLDimageID = companyToDelete.ImageID;
        await ImageDelete(req, res, () => {});
      } catch (error) {
        console.error("Error deleting image:", error.message);
        return res.status(500).json({ message: "Failed to delete image", error: error.message });
      }
    }

    // Delete the company from the database
    await Company.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete company",
      error: error.message,
    });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
