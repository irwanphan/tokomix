import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    sourcemap: false, // Nonaktifkan sourcemap
  },
  optimizeDeps: {
    exclude: ["@remix-run/react"],
  },
  server: {
    headers: {
      "Content-Type": "application/javascript", // Pastikan file JS dikirim dengan tipe MIME yang benar
    },
    hmr: {
      overlay: true, // Menampilkan overlay error di browser
    },
  },
});
