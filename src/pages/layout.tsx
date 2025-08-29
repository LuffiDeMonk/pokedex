import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="font-Poppins">
      <Outlet />
      <Toaster />
    </div>
  );
}
