import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  error: null,
  instrConfig: {
    styles: {
      backgroundColor: "#ffffff",
      textColor: "#000000",
    },
  },
  actConfig: {},
  instrTempConfig: {},
};

const slice = createSlice({
  name: "events/202501/instrEditor/config",
  initialState,
  reducers: {
    setActConfig: (state, action) => {
      state.actConfig = action.payload.actConfig;
    },
    setInstrConfig: (state, action) => {
      state.instrConfig = action.payload.instrConfig;
    },
    setInstrTempConfig: (state, action) => {
      state.instrTempConfig = action.payload.instrTempConfig;
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

export const { setInstrConfig, setActConfig, setInstrTempConfig } =
  slice.actions;

export default slice.reducer;
