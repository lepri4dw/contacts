import React from 'react';
import Backdrop from "../Backdrop/Backdrop";

interface Props extends React.PropsWithChildren {
  show: boolean;
  onClose: React.MouseEventHandler;
}

const Modal: React.FC<Props> = ({show , onClose, children}) => {
  return (
    <>
      <Backdrop show={show}/>
      <div className="modal show" style={{display: show ? 'block' : 'none'}} onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;