const users = require("../Models/Users");
const  roles  = require("../Models/Roles");
const bcrypt = require("bcrypt");

// Method -------  GET
// API   --------  http://localhost:5000/users
// Description --  CREATE USERS FUNCTION
const createUser = async (req, res) => {
  const role = await roles.findOne({ RoleName: "attendee" });
  if (!role) {
    console.error("Role not found!");
    return;
  }
  try {
    const { name, email, cnic, password } = req.body;

    // Validate required fields
    if (!name || !email || !cnic || !password ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Validate NIC format
    const nicRegex = /^\d{5}-\d{7}-\d{1}$/;
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
        message:
          "Name must be at least 3 characters long and contain only alphabets.",
      });
    }

    // Check if email already exists
    const existingEmail = await users.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists." });
    }

    // Check if CNIC already exists
    const existingCNIC = await users.findOne({ cnic });
    if (existingCNIC) {
      return res
        .status(400)
        .json({ success: false, message: "CNIC already exists." });
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
      role: role._id,
    });

    const savedUser = await newUser.save();
    return res.status(201).json({ success: true, data: savedUser });
  } catch (error) {
    // if (error.code === 11000) {
    //   // Handle unique constraint errors
    //   const field = Object.keys(error.keyValue)[0];
    //   return res.status(400).json({ success: false, message: `${field} already exists.` });
    // }
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

// Method -------  POST
// API   --------  http://localhost:5000/users
// Description --  GET ALL USERS FUNCTION
const getAllUsers = async (req, res) => {
  try {
    const getusers = await users.find().populate("role", "RoleName Status"); // Populate role details
    return res.status(200).json({ success: true, data: getusers });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// Method -------  GET
// API   --------  http://localhost:5000/users/:id
// Description --  GET USER BY ID FUNCTION
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const foundUser = await users
      .findById(id)
      .populate("roles", "RoleName Status");
    if (!foundUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: foundUser });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};
const OTPs = {};
// Method -------  GET
// API   --------  http://localhost:5000/users/:id
// Description --  GET USER BY ID FUNCTION
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const foundUser = await users
      .findOne({ email })
      .populate("role", "RoleName");

    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    // OTPs[email] = otp; // Save OTP temporarily
    // console.log(`OTP for ${email}: ${otp}`); // Debug log (send this OTP via email in production)
  
    // res.status(200).json({ message: "OTP sent to your email" });
    return res.status(200).json({
      success: true,
      message: "User found",
      data: foundUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
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
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Validate Name (if being updated)
    if (updates.name) {
      const nameRegex = /^[A-Za-z]{3,}$/;
      if (!nameRegex.test(updates.name)) {
        return res.status(400).json({
          success: false,
          message:
            "Name must be at least 3 characters long and contain only alphabets.",
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
    const updatedUser = await users
      .findByIdAndUpdate(id, updates, {
        new: true,
      })
      .populate("roles", "RoleName Status");

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
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};


const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from the request parameters
    const { RoleName } = req.body; // Get new role from the body
 const roleID = await roles.findOne({ RoleName });
 const role =roleID._id
    // Find and update the user's role
    const user = await users.findByIdAndUpdate({_id : id}, {role }, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User role updated', data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating user role', error: error.message });
  }
};
// const OTPs = {}; // Store OTPs temporarily for simplicity

// Forgot Password
// app.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   const user = await users.findOne({ email });
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
//   OTPs[email] = otp; // Save OTP temporarily
//   console.log(`OTP for ${email}: ${otp}`); // Debug log (send this OTP via email in production)

//   res.status(200).json({ message: "OTP sent to your email" });
// });

// // Verify OTP
// app.post("/verify-otp", (req, res) => {
//   const { email, otp } = req.body;

//   if (OTPs[email] && OTPs[email] === parseInt(otp)) {
//     delete OTPs[email]; // Remove OTP after successful verification
//     return res.status(200).json({ message: "OTP verified successfully" });
//   }

//   res.status(400).json({ message: "Invalid or expired OTP" });
// });

// Export all controllers
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  updateUserRole,
};
