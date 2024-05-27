"use client";
import React from "react";
import { invoke } from "@tauri-apps/api";

async function getConfigs() {
  const response = await invoke("get_configs");
  console.log(response);
}

const Config = () => {
  getConfigs();
  return <div>Config</div>;
};

export default Config;
