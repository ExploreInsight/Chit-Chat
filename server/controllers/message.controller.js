import { StatusCodes } from "http-status-codes";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";


export const getAllUsers = async (req, res) => {
    try {
        console.log(req.user)
        const userID = req.user._id;
        const filterUsers = await User.find({_id: {$ne: userID}}).select('-password');

        res.status(StatusCodes.OK).json({
            message: "Users fetched successfully",
            users: filterUsers
        });


    } catch (error) {
       console.error("Error fetching users:", error);
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
           message: "An error occurred while fetching users.",
           error: error.message
       }); 
    }
}

export const getAllMessages = async (req , res )=> {
    try {
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 });
        res.status(StatusCodes.OK).json({
            message: "Messages fetched successfully",
            messages
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred while fetching messages.",
            error: error.message
        });
    }
}

export const sendMessages = async (req, res) => {
    try {
        const { id: receiverId} = req.params;

        const senderId = req.user._id;
        
        const { text, image } = req.body;
        if (!text && !image) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Message text or image is required."
            });
        }
        let imageURl;
        if(image){
            imageURl = (await cloudinary.uploader.upload(image,{folder: "chat-app/messages"})).secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageURl || ''
        })
        await newMessage.save();

        // TODO: Send push notification to receiver when a new message is received.

        res.status(StatusCodes.CREATED).json({
            message: "Message sent successfully",
            message: newMessage
        });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred while sending the message.",
            error: error.message
        })
    }
}