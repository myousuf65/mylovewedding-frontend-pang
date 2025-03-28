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
		totalPrice: 0,
	});

	const [venues, setVenues] = useState([]);
	const [lawyers, setLawyers] = useState([]);
	const [stylists, setStylists] = useState([]);
	const [photographers, setPhotographers] = useState([]);

	const [selectedServices, setSelectedServices] = useState({
		venue: { name: '', price: 0 },
		lawyer: { name: '', price: 0 },
		stylist: { name: '', price: 0 },
		photographer: { name: '', price: 0 }
	});

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
		let newPrice = formData.totalPrice;
		let newSelectedServices = { ...selectedServices };

		// Update total price and selected service details based on selection
		if (name === 'venueId') {
			const venue = venues.find(v => v.venueId == value);
			newSelectedServices.venue = {
				name: venue?.venueName || '',
				price: venue?.price || 0
			};
		} else if (name === 'lawyerId') {
			const lawyer = lawyers.find(l => l.id == value);
			newPrice = formData.totalPrice - (selectedServices.lawyer.price || 0) + (lawyer?.price || 0);
			newSelectedServices.lawyer = {
				name: lawyer?.name || '',
				price: lawyer?.price || 0
			};
		} else if (name === 'stylistId') {
			const stylist = stylists.find(s => s.id == value);
			newPrice = formData.totalPrice - (selectedServices.stylist.price || 0) + (stylist?.price || 0);
			newSelectedServices.stylist = {
				name: stylist?.name || '',
				price: stylist?.price || 0
			};
		} else if (name === 'photographerId') {
			const photographer = photographers.find(p => p.id == value);
			newPrice = formData.totalPrice - (selectedServices.photographer.price || 0) + (photographer?.price || 0);
			newSelectedServices.photographer = {
				name: photographer?.name || '',
				price: photographer?.price || 0
			};
		}

		setFormData({
			...formData,
			[name]: value,
			totalPrice: newPrice
		});
		setSelectedServices(newSelectedServices);
	};

	const handleNext = () => {
		if (currentStep < 6) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSubmit = () => {
		// event.preventDefault();
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
				if(sessionStorage.getItem("user") !== null){
					navigate('/profile');
				}else{
					message.info("Successfully added booking!!");
				}
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
										{lawyer.name} - ${lawyer.price}
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
										{stylist.name} - ${stylist.price}
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
										{photographer.name} - ${photographer.price}
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
			case 6:
				return (
          <>
            <h2>Booking Summary</h2>
            <div className={CSSModule.summary}>
              <div className={CSSModule.summaryItem}>
                <h3>Personal Information</h3>
                <div className={CSSModule.infoRow}>
                  <span className={CSSModule.label}>Name:</span>
                  <span className={CSSModule.value}>{formData.name}</span>
                </div>
                <div className={CSSModule.infoRow}>
                  <span className={CSSModule.label}>Email:</span>
                  <span className={CSSModule.value}>{formData.email}</span>
                </div>
                <div className={CSSModule.infoRow}>
                  <span className={CSSModule.label}>Phone:</span>
                  <span className={CSSModule.value}>{formData.phone}</span>
                </div>
              </div>
              <br />

              <div className={CSSModule.summaryItem}>
                <h3>Venue & Date</h3>
                <div className={CSSModule.infoRow}>
                  <span className={CSSModule.label}>Venue:</span>
                  <span className={CSSModule.value}>
                    {selectedServices.venue.name || "None"}
                  </span>
                </div>
                <div className={CSSModule.infoRow}>
                  <span className={CSSModule.label}>Date:</span>
                  <span className={CSSModule.value}>{formData.date}</span>
                </div>
              </div>

              <br />
              <div className={CSSModule.summaryItem}>
                <h3>Selected Services</h3>
                <div className={CSSModule.serviceRow}>
                  <div className={CSSModule.serviceName}>
                    <span className={CSSModule.label}>Lawyer: </span>
                    <span className={CSSModule.value}>
                      {selectedServices.lawyer.name || "None"}
                    </span>
                    <span>---</span>
                    <span className={CSSModule.price}>
                      ${selectedServices.lawyer.price}
                    </span>
                  </div>
                </div>

                <div className={CSSModule.serviceRow}>
                  <div className={CSSModule.serviceName}>
                    <span className={CSSModule.label}>Stylist: </span>
                    <span className={CSSModule.value}>
                      {selectedServices.stylist.name || "None"}
                    </span>
                    <span>---</span>
                    <span className={CSSModule.price}>
                      ${selectedServices.stylist.price}
                    </span>
                  </div>
                </div>

                <div className={CSSModule.serviceRow}>
                  <div className={CSSModule.serviceName}>
                    <span className={CSSModule.label}>Photographer: </span>
                    <span className={CSSModule.value}>
                      {selectedServices.photographer.name || "None"}
                    </span>
                    <span>---</span>
                    <span className={CSSModule.price}>
                      ${selectedServices.photographer.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className={CSSModule.totalPrice}>
                <span className={CSSModule.label}>Total Price:</span>
                <span className={CSSModule.price}>${formData.totalPrice}</span>
              </div>
            </div>

            <div className={CSSModule.buttonGroup}>
              <button type="button" onClick={handleBack}>
                Back
              </button>
              <button type="button" onClick={handleSubmit}>
                Confirm Booking
              </button>
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
				<div className={`${CSSModule.progressStep} ${currentStep >= 6 ? CSSModule.active : ''}`}>Summary</div>
			</div>
			<form>
				{renderStep()}
			</form>
		</div>
	);
};

export default CreateBooking;
