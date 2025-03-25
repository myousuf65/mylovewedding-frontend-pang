import { React } from "react";
import CSSModule from "../css/landing.module.css"

const LandingPage = () => {
	return (
		<>
			<header>
				<h1>MyLoveWedding</h1>
			</header>
			<div className={CSSModule.container}>
				<section id="services" className={CSSModule.services}>
					<h2>Our Services</h2>
					<div className={CSSModule.servicegrid}>
						<div className={CSSModule.serviceItem}>
							<h3>Wedding Planning</h3>
							<p>Full-service wedding planning to make your day unforgettable.</p>
						</div>
						<div className={CSSModule.serviceItem}>
							<h3>Venue Selection</h3>
							<p>Find the perfect venue that matches your vision.</p>
						</div>
						<div className={CSSModule.serviceItem}>
							<h3>Event Design</h3>
							<p>Custom designs to create a unique and beautiful atmosphere.</p>
						</div>
					</div>
				</section>

				{/* About Section */}
				<section id="about" className={CSSModule.about}>
					<h2>About Us</h2>
					<p>
						We are a team of passionate wedding planners dedicated to creating the most memorable experiences for our
						clients. With years of experience, we ensure every detail is perfect.
					</p>
				</section>

				{/* Contact Section */}
				<section id="contact" className={CSSModule.contact}>
					<h2>Contact Us</h2>
					<p>Ready to start planning your dream wedding? Get in touch with us today!</p>
					<form id="contactForm">
						<input type="text" id="name" placeholder="Your Name" required />
						<input type="email" id="email" placeholder="Your Email" required />
						<textarea id="message" placeholder="Your Message" required></textarea>
						<button type="submit">Send Message</button>
					</form>
				</section>
			</div>
		</>
	)
}

export default LandingPage;
