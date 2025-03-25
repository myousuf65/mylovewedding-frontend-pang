import React, { useState } from 'react';
import { Link } from 'react-router';
import styles from "../css/venueform.module.css"

const VenueForm = () => {
	const backend_url = process.env.REACT_APP_BACKEND_URL;
	const [venueName, setVenueName] = useState('');
	const [address, setAddress] = useState('');
	const [message, setMessage] = useState('');

	const handleVenueNameChange = (e) => setVenueName(e.target.value);
	const handleAddressChange = (e) => setAddress(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (venueName && address) {

			fetch(`${backend_url}/venue/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					venueName: venueName,
					venueAddress: address
				})

			})
				.then(res => res.text())
				.then(data => {
					if (data === "success") {
						setMessage(`Venue "${venueName}" created successfully at ${address}`);
						setVenueName('');
						setAddress('');
					}
				})

		} else {
			setMessage('Please fill in both fields!');
		}
	};

	return (
		<div className={styles.container}>
			<Link style={{ border: "1px solid black", margin: "20px" }} to="/adminp">Admin Dashboard</Link>

			<h1 className={styles.heading}>Create a Venue</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor="venue_name" className={styles.label}>Venue Name</label>
					<input
						type="text"
						id="venue_name"
						value={venueName}
						onChange={handleVenueNameChange}
						className={styles.input}
						placeholder="Enter venue name"
						required
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="address" className={styles.label}>Address</label>
					<input
						type="text"
						id="address"
						value={address}
						onChange={handleAddressChange}
						className={styles.input}
						placeholder="Enter address"
						required
					/>
				</div>
				<button type="submit" className={styles.submitButton}>Create Venue</button>
			</form>
			{message && <p className={styles.message}>{message}</p>}
		</div>
	);
};

export default VenueForm;
