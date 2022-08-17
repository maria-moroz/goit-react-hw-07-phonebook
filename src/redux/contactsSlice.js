import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62fd3d546e617f88dea74f60.mockapi.io',
  }),
  tagTypes: ['Contact'],
  refetchOnFocus: true,
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['Contact'],
    }),

    addContact: builder.mutation({
      query: contact => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contact'],
    }),

    deleteContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
} = contactsApi;

// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState,
//   reducers: {
//     addContact(state, { payload }) {
//       const { items } = state;
//       if (
//         items.some(
//           ({ name }) => name.toLowerCase() === payload.name.toLowerCase()
//         )
//       ) {
//         alert(`${payload.name} is already in contacts`);
//         return state;
//       }

//       items.push(payload);
//     },

//     deleteContact(state, action) {
//       return {
//         ...state,
//         items: state.items.filter(({ id }) => id !== action.payload),
//       };
//     },

//     updateFilter(state, action) {
//       state.filter = action.payload;
//     },
//   },
// });

// export const { addContact, deleteContact, updateFilter } =
//   contactsSlice.actions;

// const persistConfig = {
//   key: 'contacts',
//   storage,
//   whitelist: ['items'],
// };

// export const contactsReducer = persistReducer(
//   persistConfig,
//   contactsSlice.reducer
// );

// export const getContactsItems = state => state.contacts.items;
// export const getContactsFilter = state => state.contacts.filter;
