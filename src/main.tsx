import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";

if (localStorage.getItem("verify-theme") === "dark") {
  document.documentElement.classList.add("theme-dark");
}

createRoot(document.getElementById("root")!).render(
  <SidebarProvider>
    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 3500,
        style: {
          borderRadius: "14px",
          padding: "14px 18px",
          fontSize: "15px",
          fontWeight: 600,
        },
        success: {
          style: {
            background: "#16a34a",
            color: "#ffffff",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#16a34a",
          },
        },
        error: {
          style: {
            background: "#dc2626",
            color: "#ffffff",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#dc2626",
          },
        },
      }}
    />
  </SidebarProvider>
);