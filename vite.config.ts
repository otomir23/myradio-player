import { defineConfig } from "vite"

export default defineConfig({
    plugins: [],
    build: {
        lib: {
            name: "myradio-player",
            entry: ["src/main.ts"],
            fileName: "myradio-player",
        },
    },
})
