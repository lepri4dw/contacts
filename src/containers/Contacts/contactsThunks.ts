import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ApiContactItem, ApiContactsList, ContactItem, FullContactInfo} from "../../types";

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
);

export const fetchOneContact = createAsyncThunk<FullContactInfo, string>(
  'contacts/fetchOne',
  async (id) => {
    const response = await axiosApi.get<FullContactInfo | null>('contacts/' + id + '.json');
    const contactInfo = response.data;

    if (contactInfo === null) {
      throw new Error('Not Found!');
    }

    return {
      ...contactInfo,
      id
    }
  }
);

export const createContact = createAsyncThunk<void, ApiContactItem>(
  'contacts/create',
  async (contact) => {
    await axiosApi.post('contacts.json', contact);
  }
);

export const deleteContact = createAsyncThunk<void, string>(
  'contact/delete',
  async (id) => {
    await axiosApi.delete('contacts/' + id + '.json');
  }
);

interface UpdateContactParams {
  id: string;
  contact: ApiContactItem;
}

export const updateContact = createAsyncThunk<void, UpdateContactParams>(
  'contacts/update',
  async (params) => {
    await axiosApi.put('contacts/' + params.id + '.json', params.contact);
  }
);