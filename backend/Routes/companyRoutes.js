const express = require("express");
const router = express.Router();
const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../Controllers/CompanyController");

// Route to create a new company
router.post("/", createCompany);

// Route to get all companies
router.get("/", getAllCompanies);

// Route to get a company by ID
router.get("/:id", getCompanyById);

// Route to update a company by ID
router.put("/:id", updateCompany);

// Route to delete a company by ID
router.delete("/:id", deleteCompany);

module.exports = router;
