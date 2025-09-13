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
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <main className="container mx-auto p-6">
        <section className="bg-white p-6 rounded shadow-lg max-w-xl mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

          <Form
            formData={formData}
            fields={loginFields}
            onChange={handleInputChange}
            btnLabel="Login"
          />
        </section>
      </main>
    </div>
  );
}

export default Login;
