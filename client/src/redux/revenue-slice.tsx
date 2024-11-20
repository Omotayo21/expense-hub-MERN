import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface revenueState {
  name: string;
  
  revenues: any;
  notificationCount: number;
  loading: boolean;
  error: any;
}

const initialState: revenueState = {
  name: "",
  
  notificationCount: 0,
  revenues: [
    {   id:'',
      name: "",
      amount:0,
    },
  ],

  loading: false,
  error: null,
};
  const revenueSlice = createSlice({
    name: "revenue",
    initialState,
    reducers: {
     
      setLoading(state, action) {
        state.loading = action.payload
      },
       setError(state, action) {
        state.error = action.payload
      },
     
     
      setRevenue(state, action) {
        state.revenues = action.payload;
      },
      addRevenue(state, action) {
        state.revenues.push(action.payload);
      },
      
      incrementNotificationCount(state) {
        state.notificationCount += 1;
      },
      resetNotificationCount(state) {
        state.notificationCount = 0;
      },
     addRevenueFailure(state, action) {
        state.error = action.payload
        
      },
    },
 
  });

 export const {addRevenue, addRevenueFailure, setRevenue, incrementNotificationCount, } = revenueSlice.actions;
 export default revenueSlice.reducer;