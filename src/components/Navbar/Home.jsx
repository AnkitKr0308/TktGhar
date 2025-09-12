import { useState } from "react";

export default function HomePage() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [journeyDate, setJourneyDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect or fetch search results
    console.log("Searching tickets:", { source, destination, journeyDate });
    // Example: navigate to /search-results?source=...&destination=...&date=...
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold">Train Ticket Booking</h1>
      </header>

      <main className="container mx-auto p-6">
        <section className="bg-white p-6 rounded shadow-lg max-w-xl mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Book Your Train Tickets
          </h2>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Source Station</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Enter Source Station"
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Destination Station
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter Destination Station"
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Journey Date</label>
              <input
                type="date"
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Search Trains
            </button>
          </form>
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

      <footer className="bg-gray-800 text-white text-center p-4 mt-12">
        © 2025 Train Ticket Booking App. All rights reserved.
      </footer>
    </div>
  );
}
