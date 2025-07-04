import preact from "@preact/preset-vite"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [preact()],
    build: {
        lib: {
            name: "myradio-player",
            entry: ["src/main.ts"],
            fileName: "myradio-player",
        },
    },
})
