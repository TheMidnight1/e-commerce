import unocss from "unocss/vite";
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [unocss(), sveltekit()],
  server: { port: 3000, host: "0.0.0.0" },
  preview: { port: 3000, host: "0.0.0.0" },
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
  }
});
