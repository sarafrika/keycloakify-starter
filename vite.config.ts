import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        keycloakify({
            accountThemeImplementation: "none"
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }
});
