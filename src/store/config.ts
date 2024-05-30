"use client";
import { StateCreator } from "zustand";
import { invoke } from "@tauri-apps/api";
import { toast } from "sonner";
import {
  ConfigSlice,
  ConfigResponse,
  Config,
  UserData,
  ConfigData,
  ConfigForm,
} from "./config.type";
import tauriCommands from "@/lib/commands";

const configSlice: StateCreator<ConfigSlice, [], [], ConfigSlice> = (
  set,
  get
) => ({
  config: null,
  getFromFile: async () => {
    const response = (await invoke(
      tauriCommands.config.getConfigs
    )) as ConfigResponse;
    console.log(response);
    set((state) => ({ config: response }));
  },
  updateUser: async (data: UserData) => {
    try {
      const response = (await invoke(
        tauriCommands.config.updateUser,
        data
      )) as Config;
      if (typeof response === "string") throw new Error(response);
      const configs = get().config;
      if (configs) {
        set((state) => ({ config: { ...configs, config_file: response } }));
      }
      toast.success("Usuario actualizado con exito");
      return true;
    } catch (e) {
      if (typeof e === "string") {
        toast.error(e);
      } else {
        toast.error("Ha ocurrido un error");
      }
      return false;
    }
  },
  updateConfigData: async (data: ConfigForm) => {
    try {
      const response = (await invoke(
        tauriCommands.config.updateConfig,
        data
      )) as Config;
      console.log(response);
      const configs = get().config;
      if (typeof response == "string") {
        throw new Error(response);
      }
      if (configs) {
        set((state) => ({ config: { ...configs, config_file: response } }));
      }
      toast.success("Configuracion actualizada");
      return true;
    } catch (e) {
      if (typeof e === "string") {
        toast.error(e);
      } else {
        toast.error("Ha ocurrido un error inesperado");
      }
      return false;
    }
  },
});

export default configSlice;
