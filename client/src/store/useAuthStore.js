import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';


const BASE_URL = 'http://localhost:7013';

export const useAuthStore = create((set,get)=>({
    authUser : null,
    isSigningIn: false,
    isLoginIng: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    isCheckingAuth: false,
    socket: null,

    checkAuth: async ()=>{
        try {
            set({ isCheckingAuth: true });
            const res = await axiosInstance.get('/auth/check');
            set({authUser: res.data , isCheckingAuth: false});
            if(res.data){
                get().connectSocket(); // Connect socket after checking auth
            }
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
            get().connectSocket(); // Connect socket after successful signup
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

            get().connectSocket(); // Connect socket after successful login
        } catch (error) {
           toast.error(error.response?.data?.message || "An error occurred during login"); 
        }
    },
    logout: async ()=>{
        try {
          await axiosInstance.post('/auth/logout'); 
          set({ authUser: null });
          toast.success("Logged out successfully"); 
          get().disconncetSocket(); // Disconnect socket on logout
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during logout");
        }
    },
    updateProfile: async (formData) => {
        try {
            set({ isUpdatingProfile: true });
            const res = await axiosInstance.put('/auth/updateProfile-Picture', formData);
            set({ authUser: res.data, isUpdatingProfile: false });
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while updating profile");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () =>{
        const {authUser} = get();
        // console.log("Connecting socket with user:", authUser);
        if(!authUser) return;

        const socket = io(BASE_URL,{
            query:{
                userId: authUser.userId,
            }
        })
        socket.connect();
        set({socket:socket})

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
    },

    disconncetSocket: () => {
        if(get().socket.connected ) get().socket.disconnect();
        set({socket: null});
    }
}))