import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterCustomer from './components/RegisterCustomer';
import CreateBooking from './components/CreateBooking';
import CSSModule from "./css/landing.module.css"
import AdminLogin from './components/AdminLogin';
import ViewBookings from './components/ViewBookings';
import { FaHome, FaUserCircle } from "react-icons/fa"; // Import an icon from react-icons
import VenueForm from './components/VenueForm';
import AdminPage from './components/AdminPage';
import VenueList from './components/VenueList';
import LawyerForm from './components/LawyerForm';
import StylistForm from './components/StylistForm';
import PhotographerForm from './components/PhotographerForm';
import ViewLawyers from './components/ViewLawyers';
import ViewPhotographers from './components/ViewPhotographers';
import ViewStylists from './components/ViewStylists';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';


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
					<li><a href='/booking'>Create Booking</a></li>
					{/* <li><a href='/viewbooking'>All Bookings</a></li> */}
					<li><a href='/profile'>
						<FaUserCircle style={{ fontSize: "30px", color: "white" }} />
					</a></li>
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
				<Route path="/add-lawyer" element={<LawyerForm />} />
				<Route path="/add-stylist" element={<StylistForm />} />
				<Route path="/add-photographer" element={<PhotographerForm />} />
				<Route path="/view-lawyers" element={<ViewLawyers />} />
				<Route path="/view-photographers" element={<ViewPhotographers />} />
				<Route path="/view-stylists" element={<ViewStylists />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</Router>
	);
}

export default App;
