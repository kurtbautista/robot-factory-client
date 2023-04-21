import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/robotApi";

export const fetchRobots = createAsyncThunk(
  "robots/fetch",
  async (thunkAPI) => {
    const response = await api.getRobots();
    const data = response.json();
    return data;
  }
);

export const extinguish = createAsyncThunk(
  "robots/extinguish",
  async (id: number, thunkAPI) => {
    const response = await api.postExtinguish(id);
    const data = response.json();
    return data;
  }
);

export const recycle = createAsyncThunk(
  "robots/recycle",
  async (ids: number[], thunkAPI) => {
    const response = await api.postRecycle(ids);
    const data = response.json();
    return data;
  }
);

export const createShipment = createAsyncThunk(
  "robots/createShipment",
  async (ids: number[], thunkAPI) => {
    const response = await api.putShipment(ids);
    const data = response.json();
    return data;
  }
);
