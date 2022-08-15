//import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';

/* const persistConfig = {
  key: 'root',
  storage,
}; */

//const persistedReducer = persistReducer(persistConfig, contactsSlice.reducer);

export const store = configureStore({
  reducer: { contacts: contactsReducer },
});

//export const persistor = persistStore(store);
