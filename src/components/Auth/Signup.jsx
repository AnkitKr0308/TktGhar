import React, { useState } from "react";
import Form from "../templates/Form";

function Signup() {
  const [formData, setFormData] = useState("");

  const signupFields = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      required: true,
    },

    {
      id: "email",
      label: "Email Address",
      type: "email",
      required: true,
    },
    {
      id: "password",
      label: "Enter Password",
      type: "password",
      required: true,
    },
    {
      id: "phoneNumber",
      label: "Enter Contact",
      type: "tel",
      required: true,
    },
    {
      id: "address",
      label: "Address",
      type: "text",
    },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <Form
        formData={formData}
        fields={signupFields}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Signup;
