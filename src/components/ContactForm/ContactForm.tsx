import React, {useState} from 'react';
import {ApiContactItem} from "../../types";
import {Link} from "react-router-dom";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  onSubmit: (contact: ApiContactItem) => void;
  isLoading: boolean;
  existingContact?: ApiContactItem;
  isEdit?: boolean;
}

const initialState: ApiContactItem = {
  name: '',
  image: '',
  phone: '',
  email: '',
};

const ContactForm: React.FC<Props> = ({onSubmit, isLoading, existingContact = initialState, isEdit = false}) => {
  const [contact, setContact] = useState<ApiContactItem>(existingContact);

  const onContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setContact(prev => ({...prev, [name]: value}));
  }

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(contact);
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div className="container my-3">
        <h3 className="mb-3">{isEdit ? 'Edit contact' : 'Add new contact'}</h3>
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="name" name="name" value={contact.name} onChange={onContactChange} required/>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
          <div className="col-sm-10">
            <input type="tel" className="form-control" id="phone" name="phone" value={contact.phone} onChange={onContactChange} required/>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="email" name="email" value={contact.email} onChange={onContactChange}/>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="image" className="col-sm-2 col-form-label">Image</label>
          <div className="col-sm-10">
            <input type="url" className="form-control" id="image" name="image" value={contact.image} onChange={onContactChange}/>
          </div>
        </div>
        <div className="d-flex">
          <span className="me-4">Photo preview</span>
          <div className="ms-5">
            <img
              src={contact.image ? contact.image : 'https://abrakadabra.fun/uploads/posts/2021-12/1640528610_2-abrakadabra-fun-p-serii-chelovek-na-avu-2.jpg'}
              alt={contact.name} width="200" height="210" className="d-block"
            />
          </div>
        </div>
        <div className="d-flex mt-4">
          <button type="submit" disabled={isLoading} className="btn btn-primary me-4">{isLoading && <ButtonSpinner/>} Save</button>
          <Link to="/" className="btn btn-success">Back to contacts</Link>
        </div>

      </div>
    </form>
  );
};

export default ContactForm;