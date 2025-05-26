import { StatusCodes } from "http-status-codes";
import User from "../models/user.model.js";
import { generateTokenWithCookie } from "../lib/utilis.js";
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Email already in use!" });
    }

    const user = new User({
      email,
      fullName,
      password,
    });

    generateTokenWithCookie(user._id, res);

    await user.save();

    if (!user) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "User registration failed",
      });
    }

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User registered successfully",
      user: {
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.log("Error", error);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });
    }
    const isPasswordValid = await user.comparePassword(password);
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized, invalid credentials",
      });
    }

    generateTokenWithCookie(user._id, res);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Login successful",
      userId: user._id,
      user: {
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.log("Error", error);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Error", error);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateProfile = async ( req, res ) =>{
  try {
    const { profilePicture} = req.body;
    const userId = req.user._id;

    if(!profilePicture) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Profile picture is required",
      });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePicture,{
      folder: "Chit-Chat",
      transformation: [
        {width: 500, crop:'limit'}, // limits the width to 500px
        {quality: 'auto'}, // auto compress 
        {fetch_format: 'auto'} // auto convert to webp  if supperoted
      ]
    });

    const updatedUser = await User.findByIdAndUpdate( userId , {
      profilePicture: uploadResponse.secure_url,
    }, { new: true });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Profile updated successfully",});
   
  } catch (error) {
     console.log("Error", error);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  
  }
}

export const checkAuth = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      user: {
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
        _id: user._id,
      },
    });
  } catch (error) {
    console.error("Error in checkAuth:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
