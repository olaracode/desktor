import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard/DashboardLayout";
const layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
