import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "../services/cryptoApi";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});

// import { configureStore } from "@reduxjs/toolkit";

// import { setupListeners } from "@reduxjs/toolkit/query/react";

// import { cryptoApi } from "../services/cryptoApi";

// const store = configureStore({
//   reducer: {
//     [cryptoApi.reducerPath]: cryptoApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(cryptoApi.middleware),
// });

// setupListeners(store.dispatch);
// export default store;
