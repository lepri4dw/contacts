import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectContactCreateLoading} from "../Contacts/contactsSlice";
import {ApiContactItem} from "../../types";
import {createContact} from "../Contacts/contactsThunks";
import ContactForm from "../../components/ContactForm/ContactForm";

const NewContact = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectContactCreateLoading);

  const onSubmit = async (contact: ApiContactItem) => {
    await dispatch(createContact(contact));
  }

  return (
    <div className="mt-2">
      <ContactForm onSubmit={onSubmit} isLoading={createLoading}/>
    </div>
  );
};

export default NewContact;