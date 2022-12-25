import {ContactItem} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchContacts} from "./contactsThunks";
import {RootState} from "../../app/store";

interface ContactsState {
  items: ContactItem[],
  fetchLoading: boolean
}

const initialState: ContactsState = {
  items: [],
  fetchLoading: false,
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, {payload: contacts}) => {
      state.items = contacts;
      state.fetchLoading = false;
    });
    builder.addCase(fetchContacts.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const contactsReducer = contactsSlice.reducer;

export const selectContacts = (state: RootState) => state.contacts.items;
export const selectFetchLoading = (state: RootState) => state.contacts.fetchLoading;