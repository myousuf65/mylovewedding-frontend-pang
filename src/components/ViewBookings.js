import { React, useEffect, useState } from "react";
import { Table, Button } from "antd";

const ViewBookings = () => {
	const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
	const [bookingData, setBookingData] = useState([]);

	useEffect(() => {
		fetch(`${BACKEND_URL}/booking/view`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setBookingData(data);
			});
	}, []);

	const handleDelete = (id) => {
		console.log(id)
		fetch(`${BACKEND_URL}/booking/delete/${id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Delete response:", data);
				// If deletion is successful, remove the booking from the state
				setBookingData((prevData) =>
					prevData.filter((booking) => booking.id !== id)
				);
			})
			.catch((error) => {
				console.error("Error deleting booking:", error);
			});
	};

	const columns = [
		{
			title: "Id",
			dataIndex: "id",
			key: "id",
			render: (text) => text,
		},
		{
			title: "Customer",
			dataIndex: "customer",
			key: "customer.id",
			render: (text) => {
				console.log("text", text.name);
				return text.name;
			},
		},
		{
			title: "Timing",
			dataIndex: "timing",
			key: "timing",
			render: (text) => {
				if (text === "1") {
					return "10:00 AM - 12:00 PM";
				} else if (text === "2") {
					return "2:00 PM - 4:00 PM";
				} else if (text === "3") {
					return "6:00 PM - 8:00 PM";
				}
			},
		},
		{
			title: "Venue",
			dataIndex: "venue",
			key: "venue",
			render: (text) => {
				return text.venueName;
			},
		},
		{
			title: "Actions",
			key: "actions",
			render: (text, record) => (
				<Button
					danger
					onClick={() => handleDelete(record.id)}
				>
					Delete
				</Button>
			),
		},
	];

	return (
		<div>
			<Table dataSource={bookingData} columns={columns} />
		</div>
	);
};

export default ViewBookings;
