import { useState } from "react";
import Form from "../templates/Form";

export default function HomePage() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [formData, setFormData] = useState({});

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching tickets:", { source, destination, journeyDate });
  };

  const fields = [
    {
      id: "fromStation",
      label: "From",
      type: "text",
      required: true,
    },
    {
      id: "toStation",
      label: "To",
      type: "select",
      required: true,
    },
    {
      id: "journeyDate",
      label: "Journey Date",
      type: "date",
      required: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <main className="container mx-auto p-6">
        <section className="bg-white p-6 rounded shadow-lg max-w-xl mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Book Your Train Tickets
          </h2>

          <Form fields={fields} />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4"
          >
            Search Trains
          </button>
        </section>

        <section className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
          <p className="max-w-xl mx-auto">
            Fast, Secure, and Reliable train ticket booking experience. Manage
            your bookings easily, get instant confirmations, and enjoy
            hassle-free travel planning.
          </p>
        </section>
      </main>
    </div>
  );
}
