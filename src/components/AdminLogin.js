import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from '../css/adminlogin.module.css'; // Import CSS Module

const AdminLogin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Email:', email, 'Password:', password);
		if(email === "admin@email.com" && password ==="admin"){
			navigate("/adminp")
		}
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginBox}>
				<h2 className={styles.loginTitle}>Admin Login</h2>
				<form onSubmit={handleSubmit} className={styles.loginForm}>
					<div className={styles.formGroup}>
						<label htmlFor="email" className={styles.label}>
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={styles.input}
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="password" className={styles.label}>
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={styles.input}
							placeholder="Enter your password"
							required
						/>
					</div>
					<button type="submit" className={styles.loginButton}>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default AdminLogin;
