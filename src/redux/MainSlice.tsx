import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { currencyType } from "../types";
import axios from "axios";

export const getData = createAsyncThunk("/data", async (url: string) => {
  const res = await axios.get(url);
  console.log(res);
  return res.data;
});

interface InitialStateTypes {
  currentPage: currencyType[];
  data: currencyType[];
  status: string;
}

const initialState: InitialStateTypes = {
  currentPage: [],
  data: [],
  status: "fulfilled",
};

export const MainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateCurrentPage(state, { payload }) {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, { payload }) => {
        state.status = "fulfilled";
        state.data = payload;
      })
      .addCase(getData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getData.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { updateCurrentPage } = MainSlice.actions;

export default MainSlice.reducer;
