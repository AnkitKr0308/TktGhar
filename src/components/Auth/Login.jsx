import React, { useState } from "react";
import Form from "../templates/Form";

function Login() {
  const [formData, setFormData] = useState("");

  const loginFields = [
    {
      id: "email",
      label: "Enter Email address",
      type: "email",
      required: true,
    },
    {
      id: "password",
      label: "Enter Password",
      type: "password",
      required: true,
    },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <Form
        fields={loginFields}
        onChange={handleInputChange}
        formData={formData}
      />
    </div>
  );
}

export default Login;
