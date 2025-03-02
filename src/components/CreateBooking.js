import { React, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import CSSModule from "../css/booking.module.css" 


const CreateBooking = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    timeslot: "",
    venue: "",
  });
  const [venues, setVenues] = useState([]);
  const [timeslots, setTimeslots] = useState([
    { id: 1, time: "10:00 AM - 12:00 PM" },
    { id: 2, time: "2:00 PM - 4:00 PM" },
    { id: 3, time: "6:00 PM - 8:00 PM" },
  ]);

  useEffect(() => {
    //get all venues
    fetch(`${BACKEND_URL}/venue/view`)
      .then((res) => res.json())
      .then((data) => setVenues(data));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {};

  return (
    <div className={CSSModule.container}>
      <h1>Create Booking</h1>
      <form id="weddingForm" onSubmit={handleSubmit}>
        <div className={CSSModule.formGroup}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className={CSSModule.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className={CSSModule.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Timeslot Selection */}
        <div className={CSSModule.formGroup}>
          <label htmlFor="timeslot">Select a Timeslot</label>
          <select
            id="timeslot"
            name="timeslot"
            value={formData.timeslot}
            onChange={handleInputChange}
            required
          >
            <option value="">
              {timeslots.length ? "Select a timeslot" : "Loading timeslots..."}
            </option>
            {timeslots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.time}
              </option>
            ))}
          </select>
        </div>

        <div className={CSSModule.formGroup}>
          <label htmlFor="venue">Select a Venue</label>
          <select
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            required
          >
            <option value="">
              {venues.length ? "Select a venue" : "Loading venues..."}
            </option>
            {venues.map((venue) => (
              <option key={venue.venueId} value={venue.venueId}>
                {venue.venueName}
              </option>
            ))}
          </select>
        </div>

        <div className={CSSModule.formGroup}>
          <label htmlFor="date">Select a Date</label>
          <DatePicker />
          {/* <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          /> */}
        </div>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default CreateBooking;
