import { create } from "zustand";

export const useThemeStore = create((set)=>({
    theme: localStorage.getItem("ChitChat-Theme") || "abyss", // Default to light theme if not set

    setTheme: ( theme ) => {
        localStorage.setItem(" ChitChat-Theme", theme);
        set({theme});
    }
}))