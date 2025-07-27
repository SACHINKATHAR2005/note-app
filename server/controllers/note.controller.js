import { Notes } from "../models/notes.model.js";
import { User } from "../models/user.models.js";


export const creteNote = async(req,res)=>{
    try {
        const {name,description}=req.body;
        if(!name){
            return res.status(400).json({
                message:"title is required",
                success:false
            })
        }
        const note = await Notes({
            name,
            description,
           createdBy: req.user._id

        })
        await note.save();
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                notes:[note._id]
            }
        })
        const newNote = await Notes.findOne(note._id)
        .populate("createdBy", "name email _id")
        return res.status(201).json({
            message:"note creted successfully",
            success:true,
            data:newNote
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            success:false,
            error:error.message
        })
    }
}

export const updateNote = async(req,res)=>{
    try {
        const {name,description} = req.body;
        const {id} = req.params;
        const note = await Notes.findByIdAndUpdate(id,{
            $set:{
                name,
                description
            }
        },{new:true})

        return res.status(200).json({
            message:"note updated successfully",
            success:true,
            data:note
        })
    
        
    } catch (error) {
         return res.status(500).json({
            message:"Internal server error",
            success:false,
            error:error.message
        })
    }
}

export const deleteNote = async (req,res)=>{
    try {
        const {id} = req.params;
        const note = await Notes.findByIdAndDelete(id);
        await User.findByIdAndUpdate(note.createdBy,{
            $pull:{
                notes:id
            }
        })
        return res.status(200).json({
            message:'note deleted successfully',
            success:true,
            data:note

        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            success:false,
            error:error.message
       
        })
    }
}

export const getNotes = async (req,res)=>{
    try {
        const getAll = await Notes.find({createdBy:req.user._id})
        .populate("createdBy", "name email _id")
        return res.status(200).json({
            message:"note fetched successfully",
            success:true,
            data:getAll
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            success:false,
            error:error.message
        })
    }
}

export const getSingleNote = async(req,res)=>{
    try {
        const {id}= req.params;
        const note = await Notes.findById(id)
        .populate("createdBy", "name email _id")
        return res.status(200).json({
            message:"note fetched successfully",
            success:true,
            data:note
        })
    
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            success:false,
            error:error.message
        })
    }
}