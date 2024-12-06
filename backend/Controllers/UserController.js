const users = require("../Models/Users"); 
const bcrypt = require("bcrypt");

// Method -------  GET
// API   --------  http://localhost:5000/users
// Description --  CREATE USERS FUNCTION
const createUser = async (req, res) => {
  try {
    const { name, email, cnic, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !cnic || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Validate NIC format
    const nicRegex = /^\d{4}-\d{7}-\d{1}$/;
    if (!nicRegex.test(cnic)) {
      return res.status(400).json({
        success: false,
        message: "Invalid NIC format. Format should be 1234-1234567-1.",
      });
    }

    // Validate Name
    const nameRegex = /^[A-Za-z]{3,}$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 3 characters long and contain only alphabets.",
      });
    }

    // Check if email already exists
    const existingEmail = await users.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: "Email already exists." });
    }

    // Check if CNIC already exists
    const existingCNIC = await users.findOne({ cnic });
    if (existingCNIC) {
      return res.status(400).json({ success: false, message: "CNIC already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new users({
      name,
      email,
      cnic,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();
    return res.status(201).json({ success: true, data: savedUser });
  } catch (error) {
    // if (error.code === 11000) {
    //   // Handle unique constraint errors
    //   const field = Object.keys(error.keyValue)[0];
    //   return res.status(400).json({ success: false, message: `${field} already exists.` });
    // }
    return res.status(500).json({ success: false, message: "Error creating user", error: error.message });
  }
};

// Method -------  POST
// API   --------  http://localhost:5000/users
// Description --  GET ALL USERS FUNCTION
const getAllUsers = async (req, res) => {
  try {
    const getusers = await users.find().populate("roles", "RoleName Status"); // Populate role details
    return res.status(200).json({ success: true, data: getusers });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching users", error: error.message });
  }
};

// Method -------  GET
// API   --------  http://localhost:5000/users/:id
// Description --  GET USER BY ID FUNCTION
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const foundUser = await users.findById(id).populate("roles", "RoleName Status");
    if (!foundUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: foundUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching user", error: error.message });
  }
};

// Method -------  PUT
// API   --------  http://localhost:5000/users/:id
// Description --  UPDATE USER FUNCTION
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if user exists
    const existingUser = await users.findById(id);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Validate Name (if being updated)
    if (updates.name) {
      const nameRegex = /^[A-Za-z]{3,}$/;
      if (!nameRegex.test(updates.name)) {
        return res.status(400).json({
          success: false,
          message: "Name must be at least 3 characters long and contain only alphabets.",
        });
      }
    }

    // Validate Email (if being updated)
    if (updates.email && updates.email !== existingUser.email) {
      const existingEmail = await users.findOne({ email: updates.email });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already exists. Please use a different email.",
        });
      }
    }

    // Validate CNIC (if being updated)
    if (updates.cnic && updates.cnic !== existingUser.cnic) {
      const nicRegex = /^\d{4}-\d{7}-\d{1}$/;
      if (!nicRegex.test(updates.cnic)) {
        return res.status(400).json({
          success: false,
          message: "Invalid NIC format. Format should be 1234-1234567-1.",
        });
      }

      const existingCNIC = await users.findOne({ cnic: updates.cnic });
      if (existingCNIC) {
        return res.status(400).json({
          success: false,
          message: "CNIC already exists. Please use a different CNIC.",
        });
      }
    }

    // Hash the password (if being updated)
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    // Update the user
    const updatedUser = await users.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate("roles", "RoleName Status");

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

// Method -------  DELETE
// API   --------  http://localhost:5000/users/:id
// Description --  DELETE USER FUNCTION
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await users.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error deleting user", error: error.message });
  }
};

// Export all controllers
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
