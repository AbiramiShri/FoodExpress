import React from 'react';
const Message = ({img, msg, showModal, type, closeModal}) => {
  return (
    <div className={`black-scree ${showModal && 'show'}`}>
      <div className="message-box">
        <img src={img} alt="" />
        <p className={type}>{msg}</p>
        <button className="close_btn" onClick={() => closeModal(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Message;
