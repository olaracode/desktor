"use client";
import React, { useEffect } from "react";
import useBoundStore from "@/store";
import { useRouter } from "next/navigation";

const useConfig = () => {
  const router = useRouter();
  const { getFromFile, config } = useBoundStore();
  useEffect(() => {
    console.log(config);
    if (typeof window === "undefined") return;
    console.log(window);
    if (!config) {
      getFromFile();
    } else {
      console.log(config);
      if (config.status == "UserSetup") router.push("/config/user");
      if (config.status == "Setup") router.push("/config/setup");
      if (config.status == "Complete") router.push("/dashboard");
    }
  }, [config]);
  return;
};

export default useConfig;
