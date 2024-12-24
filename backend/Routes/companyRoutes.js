const express = require("express");
const router = express.Router();
const { ImageUpload } = require("../Middlewares/ImageUploading");
const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../Controllers/CompanyController");
// Initialize upload middleware
const upload = ImageUpload("companies");
const upload2 = ImageUpload("companies");
// Route to create a new company
router.post("/company", upload.single("companyImage"), createCompany);

// Route to get all companies
router.get("/company", getAllCompanies);

// Route to get a company by ID
router.get("/company/:id", getCompanyById);

// Route to update a company by ID
router.put("/company/:id", upload2.single("companyImage"), updateCompany);

// Route to delete a company by ID
router.delete("/company/:id", deleteCompany);

module.exports = router;
