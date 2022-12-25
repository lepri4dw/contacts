import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ApiContactsList, ContactItem} from "../../types";

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
    const response = await axiosApi.get<ApiContactsList | null>('contacts.json');
    const contacts = response.data;
    let newContacts: ContactItem[] = [];

    if (contacts) {
      newContacts = Object.keys(contacts).map(id => {
        const contact = contacts[id];
        return {
          name: contact.name,
          image: contact.image,
          id
        }
      })
    }

    return newContacts;
  }
)