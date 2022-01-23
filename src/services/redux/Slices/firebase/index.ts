import { createSlice } from "@reduxjs/toolkit";

interface IfirebaseSlice {
  fcmToken: any;
  notifyOpen: boolean;
  info: {
    body: any;
    icon: any;
    title: any;
  };
}
const initialState: IfirebaseSlice = {
  fcmToken: "",
  notifyOpen: false,
  info: {
    body: "",
    icon: "",
    title: "",
  },
};

const firebaseSlice = createSlice({
  name: "firebaseSetting",
  initialState,
  reducers: {
    setMessagingToken: (state, action: any) => {
      state.fcmToken = action.payload;
    },
    setNotifyOpen: (state, action: any) => {
      state.notifyOpen = action.payload;
    },
    setInfo: (state, action: any) => {
      state.info = action.payload;
    },
  },
});

export const { setMessagingToken, setNotifyOpen, setInfo } =
  firebaseSlice.actions;
export default firebaseSlice.reducer;
