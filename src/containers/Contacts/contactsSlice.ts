import {ContactItem, FullContactInfo} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createContact, deleteContact, fetchContacts, fetchOneContact, updateContact} from "./contactsThunks";
import {RootState} from "../../app/store";

interface ContactsState {
  items: ContactItem[];
  fetchLoading: boolean;
  contactInfo: FullContactInfo | null;
  contactInfoLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  updateLoading: boolean;
}

const initialState: ContactsState = {
  items: [],
  fetchLoading: false,
  contactInfo: null,
  contactInfoLoading: false,
  createLoading: false,
  deleteLoading: false,
  updateLoading: false,
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

    builder.addCase(createContact.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createContact.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createContact.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(deleteContact.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteContact.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteContact.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(updateContact.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateContact.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateContact.rejected, (state) => {
      state.updateLoading = false;
    });
  }
});

export const contactsReducer = contactsSlice.reducer;

export const selectContacts = (state: RootState) => state.contacts.items;
export const selectFetchLoading = (state: RootState) => state.contacts.fetchLoading;
export const selectContactInfo = (state: RootState) => state.contacts.contactInfo;
export const selectContactInfoLoading = (state: RootState) => state.contacts.contactInfoLoading;
export const selectContactCreateLoading = (state: RootState) => state.contacts.createLoading;
export const selectContactDeleteLoading = (state: RootState) => state.contacts.deleteLoading;
export const selectContactUpdateLoading = (state: RootState) => state.contacts.updateLoading;