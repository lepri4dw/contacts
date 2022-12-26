import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  selectContactDeleteLoading,
  selectContactInfo,
  selectContactInfoLoading,
  selectContacts,
  selectFetchLoading
} from "./contactsSlice";
import {deleteContact, fetchContacts, fetchOneContact} from "./contactsThunks";
import './Contacts.css';
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/Spinner/Spinner";
import {EnvelopeFill, PencilFill, TelephoneFill, TrashFill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";

const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const fetchLoading = useAppSelector(selectFetchLoading);
  const contactInfo = useAppSelector(selectContactInfo);
  const contactInfoLoading = useAppSelector(selectContactInfoLoading);
  const deleteLoading = useAppSelector(selectContactDeleteLoading);
  const [showModal, setShowModal] = useState(false);

  const getContactInfo = async (id: string) => {
    await dispatch(fetchOneContact(id));
    setShowModal(true);
  }

  const removeContact = async () => {
    if (contactInfo) {
      await dispatch(deleteContact(contactInfo.id));
      setShowModal(false);
      await dispatch(fetchContacts());
    }
  }


  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch])
  return (
    <>
      <div className="container mt-4">
        {fetchLoading ? <Spinner/> : contacts.map(contact => (
          <div className="card w-50 mb-3" key={contact.id} onClick={() => getContactInfo(contact.id)}>
            <div className="card-body d-flex">
              <div className="img-sizing">
                <img
                  src={contact.image ? contact.image : 'https://abrakadabra.fun/uploads/posts/2021-12/1640528610_2-abrakadabra-fun-p-serii-chelovek-na-avu-2.jpg'}
                  alt={contact.name} width="100" height="100" className="d-block"
                />
              </div>
              <div className="fw-bold fs-4 ms-3 d-flex"><span className="my-auto">{contact.name}</span></div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {contactInfoLoading ? <Spinner/> : contactInfo &&
        <>
          <div className="row p-4">
            <div className="col-6 img-sizing-big">
              <img
                src={contactInfo.image ? contactInfo.image : 'https://abrakadabra.fun/uploads/posts/2021-12/1640528610_2-abrakadabra-fun-p-serii-chelovek-na-avu-2.jpg'}
                alt={contactInfo.name} width="200" height="210" className="d-block"
              />
            </div>
            <div className="col-6 ps-3">
              <p className="fs-1 mb-2 fw-bold">{contactInfo.name}</p>
              <p><TelephoneFill/><span className="ms-2 text-primary text-decoration-underline">{contactInfo.phone}</span></p>
              {contactInfo.email && <p><EnvelopeFill/><span className="ms-2 text-primary text-decoration-underline">{contactInfo.email}</span></p>}
            </div>
          </div>
          <div className="d-flex justify-content-center mb-2">
            {deleteLoading ? <Link to={"/edit-contact/" + contactInfo.id} className="btn btn-primary btn-lg me-2 px-5" onClick={(e) => e.preventDefault()}>{deleteLoading && <ButtonSpinner/>}<PencilFill className="me-2"/>Edit</Link>
            : <Link to={"/edit-contact/" + contactInfo.id} className="btn btn-primary btn-lg me-2 px-5"><PencilFill className="me-2"/>Edit</Link>}
            <button className="btn btn-danger btn-lg px-5" disabled={deleteLoading} onClick={removeContact}>{deleteLoading && <ButtonSpinner/>}<TrashFill size={25} className="me-2"/>Delete</button>
          </div>
        </>
        }
      </Modal>
    </>
  );
};

export default Contacts;