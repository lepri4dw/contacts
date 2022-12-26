import React from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectContactInfo, selectContactUpdateLoading} from "../Contacts/contactsSlice";
import {ApiContactItem} from "../../types";
import {updateContact} from "../Contacts/contactsThunks";
import ContactForm from "../../components/ContactForm/ContactForm";

const EditContact = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const updateLoading = useAppSelector(selectContactUpdateLoading);
  const contact = useAppSelector(selectContactInfo);

  const onSubmit = async (contact: ApiContactItem) => {
    await dispatch(updateContact({id, contact}));
  }
  return (
    <div className="mt-4">
      {contact && <ContactForm onSubmit={onSubmit} isLoading={updateLoading} existingContact={contact} isEdit/>}
    </div>
  );
};

export default EditContact;