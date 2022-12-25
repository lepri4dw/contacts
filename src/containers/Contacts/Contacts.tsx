import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectContacts, selectFetchLoading} from "./contactsSlice";
import {fetchContacts} from "./contactsThunks";
import './Contacts.css';
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/Spinner/Spinner";

const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const fetchLoading = useAppSelector(selectFetchLoading);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch])
  return (
    <>
      <div className="container mt-4">
        {fetchLoading ? <Spinner/> : contacts.map(contact => (
          <div className="card w-50 mb-3" key={contact.id} onClick={() => setShowModal(true)}>
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
        <div className="row">
          <div className="col-4">

          </div>
        </div>
      </Modal>
    </>
  );
};

export default Contacts;