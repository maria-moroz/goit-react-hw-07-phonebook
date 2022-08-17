import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  items: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, { payload }) {
      const { items } = state;
      if (
        items.some(
          ({ name }) => name.toLowerCase() === payload.name.toLowerCase()
        )
      ) {
        alert(`${payload.name} is already in contacts`);
        return state;
      }

      items.push(payload);
    },

    deleteContact(state, action) {
      return {
        ...state,
        items: state.items.filter(({ id }) => id !== action.payload),
      };
    },

    updateFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, updateFilter } =
  contactsSlice.actions;

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'],
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

// selectors

export const getContactsItems = state => state.contacts.items;
export const getContactsFilter = state => state.contacts.filter;
