import React, { useState } from "react";
import Form from "../templates/Form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { setPopup } from "../../store/popupSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const loading = useSelector((state) => state.auth?.loading);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleLogin = async (formData) => {
    if (isSubmitting) return;
    setErrors({});
    setIsSubmitting(true);

    try {
      const submit = await dispatch(loginUser(formData));

      if (submit.error) {
        dispatch(setPopup({ message: submit.payload, type: "error" }));
      } else {
        dispatch(setPopup({ message: "Login successful", type: "success" }));
        navigate("/");
      }
    } catch (e) {
      dispatch(
        setPopup({ message: e.message || "Network Error", type: "error" })
      );
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
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
            btnLabel={loading ? "Logging in..." : "Login"}
            onSubmit={handleLogin}
            errors={errors}
            disabled={isSubmitting}
          />
        </section>
      </main>
    </div>
  );
}

export default Login;
