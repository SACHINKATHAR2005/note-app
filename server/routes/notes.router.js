import express from "express";
import { creteNote, deleteNote, getNotes, getSingleNote, updateNote } from "../controllers/note.controller.js";
import { auth } from "../middlewares/auth.js";


const router = express.Router();

router.post("/create",auth,creteNote);
// /notes/create
router.put("/update/:id",auth,updateNote);
// /notes/update/:id

router.delete("/delete/:id",auth,deleteNote);
// /notes/delete/:id
router.get("/getAll",auth,getNotes);
// /notes/getAll

router.get("/getOne/:id",auth,getSingleNote)
// /notes/getOne/:id
export default router;
