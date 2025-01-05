import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  error: null,
  instrConfig: {},
};

const slice = createSlice({
  name: "events/202501/instrEditor/config",
  initialState,
  reducers: {
    setInstrConfig: (state, { payload }) => {
      const { instrConfig } = payload;

      return {
        instrConfig,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, { payload }) => {
      return {
        ...state,
        ...payload.events.instrEditor202501?.config,
      };
    });
  },
});

export const { setInstrConfig } = slice.actions;

export default slice.reducer;
