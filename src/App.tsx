import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import Contacts from "./containers/Contacts/Contacts";
import NewContact from "./containers/NewContact/NewContact";
import EditContact from "./containers/EditContact/EditContact";


function App() {
  return (
    <div>
      <header className="border-bottom border-2 border-dark py-4">
        <div className="container d-flex justify-content-between">
          <Link to="/" className="text-decoration-none text-black fs-3">Contacts</Link>
          <Link to="/new-contact" className="btn btn-primary">Add new contact</Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={(<Contacts/>)}/>
        <Route path="/new-contact" element={(<NewContact/>)}/>
        <Route path="/edit-contact/:id" element={(<EditContact/>)}/>
      </Routes>
    </div>
  );
}

export default App;
