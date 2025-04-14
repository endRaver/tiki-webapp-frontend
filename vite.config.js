import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
    },
    plugins: [react(), tailwindcss()],
});
