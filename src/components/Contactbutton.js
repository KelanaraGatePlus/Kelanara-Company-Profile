import React from "react";
import "./Contactbutton.css";

const Contactbutton = () => {
  const handleSubmit = () => {
    const fullname = document.querySelector(
      'input[aria-label="Fullname"]'
    ).value;
    const organization = document.querySelector(
      'input[aria-label="Organization"]'
    ).value;
    const email = document.querySelector('input[aria-label="Email"]').value;
    const phone = document.querySelector('input[aria-label="Phone"]').value;
    const message = document.querySelector(
      'input[aria-label="Additional Message"]'
    ).value;

    const mailtoLink = `mailto:01@gmail.com?subject=New Contact Form Submission&body=Full Name: ${fullname}%0D%0AOrganization: ${organization}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0AMessage: ${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact-button" onClick={handleSubmit}>
      <p className="text">
        Submit
        <span>
          <img
            src="/icon/send email.png"
            alt="send-email-icon"
            className="send-email-icon"
          />
        </span>
      </p>
    </div>
  );
};

export default Contactbutton;
