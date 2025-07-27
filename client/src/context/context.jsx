import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/api";

export const AuthContext = createContext(null);

export const ContectProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const loginUser = async (data) => {
        setLoading(true);
        try {
            const res = await axios.post("https://note-app-crjj.onrender.com/auth/login", data, {
                withCredentials: true,
            });
            setUser(res.data.data)
            setLoading(false);
            if (res.data.success) {
                navigate("/");
            }
            return res.data;
        } catch (error) {
            console.error("Auth Error:", error?.response?.data || error.message);
            setLoading(false);
            throw error;
        }
    };

    const registerUser = async (data) => {
        setLoading(true);
        try {
            const res = await axios.post("https://note-app-crjj.onrender.com/auth/register", data, {
                withCredentials: true,
            });
            setUser(res.data.data)
            setLoading(false);
            if (res.data.success) {
                navigate("/login");
            }
            console.log(res.data);
            console.log(data);
            return res.data;
        } catch (error) {
            console.error("Auth Error:", error?.response?.data || error.message);
            setLoading(false);
            throw error;
        }
    };

 const getMyProfile = async () => {
    try {
      const res = await api.get("/auth/me"); 
      setUser(res.data.data);
    } catch (err) {
      setUser(null); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

    const getAllNotes = async () => api.get("/notes/getAll")
    const getSingleNotes = async (id) => api.get(`/notes/getOne/${id}`)
    const createNote = async (data) => api.post("/notes/create", data);
    const updateNote = async (id, data) => api.put(`/notes/update/${id}`, data);
    const deleteNote = async (id) => api.delete(`/notes/delete/${id}`);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                loginUser,
                registerUser,
                getAllNotes, getSingleNotes, createNote, updateNote, deleteNote
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
