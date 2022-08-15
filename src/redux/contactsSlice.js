import { createSlice } from '@reduxjs/toolkit';

const contacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: contacts, filter: '' },
  reducers: {
    addContact(state, action) {
      //state.items = state.items.push(action.payload);
      state.items = [...state.items, action.payload];
    },
    deleteContact(state, action) {
      state.items = state.items.filter(el => el.id !== action.payload);
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, changeFilter } =
  contactsSlice.actions;

export default contactsSlice.reducer;

//export const getContacts = state => state.contactsReducer.items;

export const getContacts = state => {
  console.log(state);
  return state.contactsReducer.items;
};

export const getFilter = state => state.contactsReducer.filter;
