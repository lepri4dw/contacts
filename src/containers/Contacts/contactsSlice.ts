import {ContactItem, FullContactInfo} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchContacts, fetchOneContact} from "./contactsThunks";
import {RootState} from "../../app/store";

interface ContactsState {
  items: ContactItem[],
  fetchLoading: boolean,
  contactInfo: FullContactInfo | null,
  contactInfoLoading: boolean
}

const initialState: ContactsState = {
  items: [],
  fetchLoading: false,
  contactInfo: null,
  contactInfoLoading: false
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

    builder.addCase(fetchOneContact.pending, (state) => {
      state.contactInfoLoading = true;
    });
    builder.addCase(fetchOneContact.fulfilled, (state, {payload: contact}) => {
      state.contactInfo = contact;
      state.contactInfoLoading = false;
    });
    builder.addCase(fetchOneContact.rejected, (state) => {
      state.contactInfoLoading = false;
    });
  }
});

export const contactsReducer = contactsSlice.reducer;

export const selectContacts = (state: RootState) => state.contacts.items;
export const selectFetchLoading = (state: RootState) => state.contacts.fetchLoading;
export const selectContactInfo = (state: RootState) => state.contacts.contactInfo;
export const selectContactInfoLoading = (state: RootState) => state.contacts.contactInfoLoading;