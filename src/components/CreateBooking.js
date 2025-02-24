import { React, useState } from "react";

const CreateBooking = () => {
	const [formData, setData] = useState({
		name : "",
		email : "",
		phone:  "",
		timeslot : "",
		venue : ""
	})

	handleInputChange = (event) =>{

	}

	return (
		<div className="container">
			<h1>Wedding Planner</h1>
			<form id="weddingForm" onSubmit={handleSubmit}>
				<div className="form-group">
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
				<div className="form-group">
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
				<div className="form-group">
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
				<div className="form-group">
					<label htmlFor="timeslot">Select a Timeslot</label>
					<select
						id="timeslot"
						name="timeslot"
						value={formData.timeslot}
						onChange={handleInputChange}
						required
					>
						<option value="">{timeslots.length ? 'Select a timeslot' : 'Loading timeslots...'}</option>
						{timeslots.map((slot) => (
							<option key={slot.value} value={slot.value}>
								{slot.label}
							</option>
						))}
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="venue">Select a Venue</label>
					<select
						id="venue"
						name="venue"
						value={formData.venue}
						onChange={handleInputChange}
						required
					>
						<option value="">{venues.length ? 'Select a venue' : 'Loading venues...'}</option>
						{venues.map((venue) => (
							<option key={venue.value} value={venue.value}>
								{venue.label}
							</option>
						))}
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="date">Select a Date</label>
					<input
						type="date"
						id="date"
						name="date"
						value={formData.date}
						onChange={handleInputChange}
						required
					/>
				</div>

				<button type="submit">Book Now</button>
			</form>
		</div>
	)
}

export default CreateBooking;
