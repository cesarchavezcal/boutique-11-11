import { configureStore } from '@reduxjs/toolkit';
import { ordersApiSlice } from './features/orders/orders-api-slice';
import { userApiSlice } from './features/user/user-api-slice';

import counterReducer from './features/counter/counter-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [ordersApiSlice.reducerPath]: ordersApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ordersApiSlice.middleware,
      userApiSlice.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
