import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "../css/stylistform.module.css"

const StylistForm = () => {
	const backend_url = process.env.REACT_APP_BACKEND_URL;
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [message, setMessage] = useState('');

	const handleNameChange = (e) => setName(e.target.value);
	const handlePriceChange = (e) => setPrice(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (name && price) {
			fetch(`${backend_url}/stylist/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: name,
					price: Number(price)
				})
			})
				.then(res => res.text())
				.then(data => {
						setMessage(`Stylist "${name}" added successfully with price $${price}`);
						setName('');
						setPrice('');
				})
				.catch(error => {
					setMessage('Failed to add stylist. Please try again.');
				});
		} else {
			setMessage('Please fill in all fields!');
		}
	};

	return (
		<div className={styles.container}>
			<Link className={styles.backLink} to="/adminp">Admin Dashboard</Link>

			<h1 className={styles.heading}>Add a Stylist</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor="name" className={styles.label}>Stylist Name</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={handleNameChange}
						className={styles.input}
						placeholder="Enter stylist name"
						required
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="price" className={styles.label}>Price</label>
					<input
						type="number"
						id="price"
						value={price}
						onChange={handlePriceChange}
						className={styles.input}
						placeholder="Enter price"
						min="0"
						step="0.01"
						required
					/>
				</div>
				<button type="submit" className={styles.submitButton}>Add Stylist</button>
			</form>
			{message && <p className={styles.message}>{message}</p>}
		</div>
	);
};

export default StylistForm; 