import { create } from "zustand";
import configSlice from "./config";
import { ConfigSlice } from "./config.type";
const useBoundStore = create<ConfigSlice>()((...a) => ({
  ...configSlice(...a),
}));

export default useBoundStore;
