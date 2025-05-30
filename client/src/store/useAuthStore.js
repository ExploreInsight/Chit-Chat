import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
    authUser : null,
    isSigningIn: false,
    isLoginIng: false,
    isUpdatingProfile: false,

    isCheckingAuth: false,

    checkAuth: async ()=>{
        try {
            set({ isCheckingAuth: true });
            const res = await axiosInstance.get('/auth/check');
            set({authUser: res.data , isCheckingAuth: false});
        } catch (error) {
            console.error("Error checking authentication:", error);
            set({authUser: null})
        }finally{
            set({ isCheckingAuth: false});
        }
    },
    signup: async (formData)=>{
        try {
            set({ isSigningIn: true });
            const res = await axiosInstance.post('/auth/signup', formData);
            set({ authUser: res.data , isSigningIn:false})
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during signup");
        }
    },
    login: async (formData) => {
        try {
            set({isLoginIng: true});
            const res = await axiosInstance.post('/auth/login', formData);
            set({authUser: res.data , isLoginIng: false});
            toast.success("Logged in successfully");
        } catch (error) {
           toast.error(error.response?.data?.message || "An error occurred during login"); 
        }
    },
    logout: async ()=>{
        try {
          await axiosInstance.post('/auth/logout'); 
          set({ authUser: null });
          toast.success("Logged out successfully"); 
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during logout");
        }
    }
}))