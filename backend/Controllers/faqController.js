const FAQs = require("../Models/FAQ");

// Create FAQ
const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and Answer are required" });
    }

    const newFAQ = new FAQs({ question, answer });
    await newFAQ.save();

    res.status(201).json({
      message: "FAQ created successfully",
      faq: newFAQ,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create FAQ", error: error.message });
  }
};

// Get all FAQs
const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQs.find();
    res.status(200).json(faqs.length ? faqs : { message: "No FAQs found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch FAQs", error: error.message });
  }
};

// Get FAQ by ID
const getFAQById = async (req, res) => {
  try {
    const faq = await FAQs.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch FAQ", error: error.message });
  }
};

// Update FAQ by ID
const updateFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question && !answer) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updatedFAQ = await FAQs.findByIdAndUpdate(
      req.params.id,
      { $set: { ...(question && { question }), ...(answer && { answer }) } },
      { new: true, runValidators: true }
    );

    if (!updatedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json({
      message: "FAQ updated successfully",
      faq: updatedFAQ,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update FAQ", error: error.message });
  }
};

// Delete FAQ by ID
const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQs.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete FAQ", error: error.message });
  }
};

// Export CRUD functions
module.exports = {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
};
