import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterCustomer from './components/RegisterCustomer';
import CreateBooking from './components/CreateBooking';
import CSSModule from "./css/landing.module.css"

function App() {
	const url = process.env.REACT_APP_BACKEND_URL;
	console.log("url is ", url)
	return (
		<Router>
			<nav>
				<ul>
					<li><a className={CSSModule.home} href="#services">Services</a></li>
					<li><a className={CSSModule.home} href="#about">About Us</a></li>
					<li><a className={CSSModule.home} href="#contact">Contact</a></li>
					<li><a href='/booking.html'>Create Booking</a></li>
				</ul>
			</nav>

			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/register" element={<RegisterCustomer />} />
				<Route path="/booking" element={<CreateBooking />} />
			</Routes>
		</Router>
	);
}

export default App;
