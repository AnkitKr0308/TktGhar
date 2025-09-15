import { useEffect, useState } from "react";
import Form from "../templates/Form";
import { useDispatch, useSelector } from "react-redux";
import { getStations } from "../../store/stationSlice";
import { getAvailableTrains } from "../../store/trainSlice";
import { useNavigate } from "react-router-dom";
import { setPopup } from "../../store/popupSlice";

export default function HomePage() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const [journeyDate, setJourneyDate] = useState("");
  const [formData, setFormData] = useState({});
  const [filteredSource, setFilteredSource] = useState([]);
  const [filteredDestination, setFilteredDestination] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const stations = async () => {
      const stn = await dispatch(getStations());
      console.log(stn);
      if (stn.success) {
        setSource(stn);
        setDestination(stn);
      }
    };
    stations();
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "fromStation") {
      const filtered = source.filter((s) =>
        s.StationName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSource(filtered);
    }

    if (name === "toStation") {
      const filtered = destination.filter((s) =>
        s.StationName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDestination(filtered);
    }
  };

  const handleSearchAvailableTrains = async () => {
    const res = await dispatch(getAvailableTrains(formData));

    if (res.error) {
      dispatch(setPopup({ message: res.payload, type: "error" }));
    } else {
      navigate("/");
    }
  };

  const fields = [
    {
      id: "fromStation",
      label: "From",
      type: "text",
      required: true,
      options: filteredSource.map((s) => `${s.StationName} (${s.StationCode})`),
    },
    {
      id: "toStation",
      label: "To",
      type: "text",
      required: true,
      options: filteredDestination.map(
        (s) => `${s.StationName} (${s.StationCode})`
      ),
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

          <Form
            fields={fields}
            onChange={handleInputChange}
            formData={formData}
          />

          <button
            type="submit"
            onClick={handleSearchAvailableTrains}
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
