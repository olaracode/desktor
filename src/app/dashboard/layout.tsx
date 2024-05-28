import React from "react";
import { Dashboard } from "@/components/dashboard-layout";
const layout = ({ children }: { children: React.ReactNode }) => {
  return <Dashboard>{children}</Dashboard>;
};

export default layout;
