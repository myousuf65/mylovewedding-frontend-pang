import { React, useState, useEffect } from "react";
import CSSModule from "../css/booking.module.css"
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const CreateBooking = () => {
	const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		venueId: "",
		date: "",
		lawyerId: "",
		stylistId: "",
		photographerId: "",
	});

	const [venues, setVenues] = useState([]);
	const [lawyers, setLawyers] = useState([]);
	const [stylists, setStylists] = useState([]);
	const [photographers, setPhotographers] = useState([]);

	useEffect(() => {
		// Fetch venues
		fetch(`${BACKEND_URL}/venue/view`)
			.then((res) => res.json())
			.then((data) => {
				setVenues(data);
			})
			.catch((error) => message.error("Failed to fetch venues"));

		// Fetch lawyers
		fetch(`${BACKEND_URL}/lawyer/view`)
			.then((res) => res.json())
			.then((data) => {
				setLawyers(data);
			})
			.catch((error) => message.error("Failed to fetch lawyers"));

		// Fetch stylists
		fetch(`${BACKEND_URL}/stylist/view`)
			.then((res) => res.json())
			.then((data) => setStylists(data))
			.catch((error) => message.error("Failed to fetch stylists"));

		// Fetch photographers
		fetch(`${BACKEND_URL}/photographer/view`)
			.then((res) => res.json())
			.then((data) => setPhotographers(data))
			.catch((error) => message.error("Failed to fetch photographers"));
	}, []);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleNext = () => {
		if (currentStep < 5) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		fetch(`${BACKEND_URL}/booking/add`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData),
		})
			.then(res => res.json())
			.then(data => {
				message.success("Booking created successfully!");
				navigate('/viewbooking');
			})
			.catch(error => message.error("Failed to create booking"));
	};

	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return (
					<>
						<h2>Personal Information</h2>
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
						<button type="button" onClick={handleNext}>Next</button>
					</>
				);
			case 2:
				return (
					<>
						<h2>Select Venue and Date</h2>
						<div className={CSSModule.formGroup}>
							<label htmlFor="venueId">Select a Venue</label>
							<select
								id="venueId"
								name="venueId"
								value={formData.venueId}
								onChange={handleInputChange}
								required
							>
								<option value="">Select a venue</option>
								{venues.map((venue) => (
									<option key={venue.venueId} value={venue.venueId}>
										{venue.venueName}
									</option>
								))}
							</select>
						</div>
						<div className={CSSModule.formGroup}>
							<label htmlFor="date">Select Date</label>
							<input
								type="date"
								id="date"
								name="date"
								value={formData.date}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className={CSSModule.buttonGroup}>
							<button type="button" onClick={handleBack}>Back</button>
							<button type="button" onClick={handleNext}>Next</button>
						</div>
					</>
				);
			case 3:
				return (
					<>
						<h2>Select a Lawyer</h2>
						<div className={CSSModule.formGroup}>
							<select
								id="lawyerId"
								name="lawyerId"
								value={formData.lawyerId}
								onChange={handleInputChange}
								required
							>
								<option value="">Select a lawyer</option>
								{lawyers.map((lawyer) => (
									<option key={lawyer.id} value={lawyer.id}>
										{lawyer.name}
									</option>
								))}
							</select>
						</div>
						<div className={CSSModule.buttonGroup}>
							<button type="button" onClick={handleBack}>Back</button>
							<button type="button" onClick={handleNext}>Next</button>
						</div>
					</>
				);
			case 4:
				return (
					<>
						<h2>Select a Stylist</h2>
						<div className={CSSModule.formGroup}>
							<select
								id="stylistId"
								name="stylistId"
								value={formData.stylistId}
								onChange={handleInputChange}
								required
							>
								<option value="">Select a stylist</option>
								{stylists.map((stylist) => (
									<option key={stylist.id} value={stylist.id}>
										{stylist.name}
									</option>
								))}
							</select>
						</div>
						<div className={CSSModule.buttonGroup}>
							<button type="button" onClick={handleBack}>Back</button>
							<button type="button" onClick={handleNext}>Next</button>
						</div>
					</>
				);
			case 5:
				return (
					<>
						<h2>Select a Photographer</h2>
						<div className={CSSModule.formGroup}>
							<select
								id="photographerId"
								name="photographerId"
								value={formData.photographerId}
								onChange={handleInputChange}
								required
							>
								<option value="">Select a photographer</option>
								{photographers.map((photographer) => (
									<option key={photographer.id} value={photographer.id}>
										{photographer.name}
									</option>
								))}
							</select>
						</div>
						<div className={CSSModule.buttonGroup}>
							<button type="button" onClick={handleBack}>Back</button>
							<button type="submit">Finish</button>
						</div>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<div className={CSSModule.container}>
			<h1>Create Booking</h1>
			<div className={CSSModule.progressBar}>
				<div className={`${CSSModule.progressStep} ${currentStep >= 1 ? CSSModule.active : ''}`}>Personal Info</div>
				<div className={`${CSSModule.progressStep} ${currentStep >= 2 ? CSSModule.active : ''}`}>Venue & Date</div>
				<div className={`${CSSModule.progressStep} ${currentStep >= 3 ? CSSModule.active : ''}`}>Lawyer</div>
				<div className={`${CSSModule.progressStep} ${currentStep >= 4 ? CSSModule.active : ''}`}>Stylist</div>
				<div className={`${CSSModule.progressStep} ${currentStep >= 5 ? CSSModule.active : ''}`}>Photographer</div>
			</div>
			<form onSubmit={handleSubmit}>
				{renderStep()}
			</form>
		</div>
	);
};

export default CreateBooking;
