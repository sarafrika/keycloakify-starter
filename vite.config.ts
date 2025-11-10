import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import path from "path";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

const isVitest = process.env.VITEST === "true";

const plugins = [react()];

if (!isVitest) {
    plugins.push(tailwindcss());
    plugins.push(
        keycloakify({
            accountThemeImplementation: "none"
        })
    );
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins,
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/setupTests.ts",
        css: true,
        pool: "threads",
        coverage: {
            provider: "v8",
            reports: ["text", "html", "lcov"],
            include: ["src/**/*.{ts,tsx}"],
            exclude: ["src/**/*.stories.{ts,tsx}"]
        },
        exclude: [...configDefaults.exclude, "dist", "dist_keycloak"]
    }
});
