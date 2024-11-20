import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './ui-slice'
import revenueReducer from './revenue-slice'


 const store = configureStore({
    reducer: {
         ui : uiReducer,
         revenue : revenueReducer,
        
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

