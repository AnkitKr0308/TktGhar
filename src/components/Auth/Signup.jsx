import React, { useState } from "react";
import Form from "../templates/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../store/authSlice";
import { setPopup } from "../../store/popupSlice";

function Signup() {
  const [formData, setFormData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const loading = useSelector((state) => state.auth?.loading);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signupFields = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      required: true,
    },
    {
      id: "userName",
      label: "Username",
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
      label: "Password",
      type: "password",
      required: true,
    },
    {
      id: "phoneNumber",
      label: "Contact",
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
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSignup = async (formData) => {
    if (isSubmitting) return;
    setErrors({});
    setIsSubmitting(true);
    try {
      const submit = await dispatch(signupUser(formData));

      if (submit.error) {
        // submit.payload can be string (general error) or object (field errors)
        if (typeof submit.payload === "string") {
          dispatch(setPopup({ message: submit.payload, type: "error" }));
        } else if (typeof submit.payload === "object") {
          setErrors(submit.payload);
        }
        return;
      }

      const res = submit.payload;

      if (res?.success) {
        dispatch(
          setPopup({
            message: res.message || "Account created successfully",
            type: "success",
          })
        );
        navigate("/login");
      } else if (res?.errors) {
        setErrors(res.errors);
      } else {
        dispatch(setPopup({ message: "Signup failed", type: "error" }));
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
          <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>

          <Form
            formData={formData}
            fields={signupFields}
            onChange={handleInputChange}
            btnLabel={loading ? "Creating Account..." : "Register Account"}
            onSubmit={handleSignup}
            errors={errors}
            disabled={isSubmitting}
          />
        </section>
      </main>
    </div>
  );
}

export default Signup;
