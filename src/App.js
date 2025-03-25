import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterCustomer from './components/RegisterCustomer';
import CreateBooking from './components/CreateBooking';
import CSSModule from "./css/landing.module.css"
import AdminLogin from './components/AdminLogin';
import ViewBookings from './components/ViewBookings';
import { FaHome } from "react-icons/fa"; // Import an icon from react-icons
import VenueForm from './components/VenueForm';
import AdminPage from './components/AdminPage';
import VenueList from './components/VenueList';


function App() {
	const url = process.env.REACT_APP_BACKEND_URL;
	console.log("url is ", url)
	return (
		<Router>
			<nav>
				<ul>
					<li><a className={CSSModule.home} href="/">
						<FaHome style={{ fontSize: "30px", color: "white" }} />
					</a></li>
					{/*
						<li><a className={CSSModule.home} href="/#services">Services</a></li>
						<li><a className={CSSModule.home} href="/#about">About Us</a></li>
						<li><a className={CSSModule.home} href="/#contact">Contact</a></li>
					*/}
					<li><a href='/booking'>Create Booking</a></li>
					<li><a href='/viewbooking'>All Bookings</a></li>

				</ul>
			</nav>

			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/register" element={<RegisterCustomer />} />
				<Route path="/booking" element={<CreateBooking />} />
				<Route path="/admin" element={<AdminLogin />} />
				<Route path="/adminp" element={<AdminPage />} />
				<Route path="/viewbooking" element={<ViewBookings />} />
				<Route path="/createvenue" element={<VenueForm />} />
				<Route path="/venues" element={<VenueList />} />
			</Routes>
		</Router>
	);
}

export default App;
