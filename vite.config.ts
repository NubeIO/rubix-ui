import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

// Library build: the components (ESM + CJS), rolled-up types, and ONE stylesheet
// (dist/rubix-ui.css, from src/index.ts's `import "./styles/scoped.css"`) for extensions.
//
// EXTERNALS are the contract, not an optimisation:
//   • react / react-dom: an extension resolves the SHELL's one React through the import map
//     (`defineExtConfig()` externalises the same set). A second copy is "Invalid hook call".
//   • @radix-ui/*: peers, so the page holds one copy of each. Two copies of a Radix primitive mean
//     two portal/context identities.
//   • lucide-react: a peer, so the icons come from the consumer's own copy.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ rollupTypes: true, exclude: ["src/**/*.test.tsx", "src/**/*.test.ts", "src/test/**"] }),
  ],
  build: {
    outDir: "dist",
    cssCodeSplit: false,
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      name: "NubeRubixUi",
      formats: ["es", "cjs"],
      fileName: (fmt) => `rubix-ui.${fmt === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react-dom/client",
        /^@radix-ui\//,
        "lucide-react",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
      ],
      output: {
        assetFileNames: "rubix-ui.[ext]",
        globals: { react: "React", "react-dom": "ReactDOM" },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
