"use client";
import React, { useState } from "react";
import useBoundStore from "@/store";
import { useRouter } from "next/navigation";
const Config = () => {
  const router = useRouter();
  const { getFromFile, config } = useBoundStore();
  React.useEffect(() => {
    if (!config) {
      getFromFile();
    } else {
      if (config.status == "UserSetup") router.push("/config/user");
      if (config.status == "Setup") router.push("/config/setup");
      if (config.status == "Complete") router.push("/dashboard");
    }
  }, [config]);
  return null;
};

export default Config;
