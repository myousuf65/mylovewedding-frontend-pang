import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../css/lawyerform.module.css"
import { message } from 'antd';

const LawyerForm = () => {
	const backend_url = process.env.REACT_APP_BACKEND_URL;
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
    const navigate = useNavigate();

	const handleNameChange = (e) => setName(e.target.value);
	const handlePriceChange = (e) => setPrice(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (name && price) {
			fetch(`${backend_url}/lawyer/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: name,
					price: Number(price)
				})
			})
				.then(res => res.json())
				.then(data => {
					message.info(`Lawyer "${name}" added successfully with price $${price}`);
                    navigate("/view-lawyers")
				})
				.catch(error => {
					message.error('Failed to add lawyer. Please try again.');
				});
		} else {
			message.error('Please fill in all fields!');
		}
	};

	return (
		<div className={styles.container}>
			<Link className={styles.backLink} to="/adminp">Admin Dashboard</Link>

			<h1 className={styles.heading}>Add a Lawyer</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor="name" className={styles.label}>Lawyer Name</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={handleNameChange}
						className={styles.input}
						placeholder="Enter lawyer name"
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
				<button type="submit" className={styles.submitButton}>Add Lawyer</button>
			</form>
		</div>
	);
};

export default LawyerForm; 