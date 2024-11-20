import { createSlice } from "@reduxjs/toolkit";



interface UiState {
  name: string;
  darkMode: boolean;
 expenses: any;
  notificationCount: number;
loading: boolean;
error: any
}

const initialState: UiState = {
  name: "",
  darkMode: false,
  expenses: [
    {
      id: '',
      category: "",
      name: "",
      amount: 0,
    },
  ],
  notificationCount: 0,

  loading: false,
  error: null,
};
  const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
      setDarkMode(state) {
        state.darkMode = !state.darkMode;
      },
      setExpenses(state, action) {
        state.expenses = action.payload;
      },
      setLoading(state, action) {
        state.loading = action.payload
      },
       setError(state, action) {
        state.error = action.payload
      },
      addExpense(state, action) {
        state.expenses.push(action.payload);
      },
      addExpenseFailure(state, action) {
        state.error = action.payload
        
      },
    
      
      
      
      incrementNotificationCount(state) {
        state.notificationCount += 1;
      },
      resetNotificationCount(state) {
        state.notificationCount = 0;
      },
     
    },
  
  });

 export const { setDarkMode, setExpenses, addExpense, incrementNotificationCount,addExpenseFailure, resetNotificationCount,   setLoading, setError} = uiSlice.actions;
 export default uiSlice.reducer;