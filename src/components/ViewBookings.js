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
		},
		{
			title: "Customer",
			dataIndex: "customer",
			key: "customer",
			render: (customer) => customer.name,
		},
		{
			title: "Venue",
			dataIndex: "venue",
			key: "venue",
			render: (venue) => venue.venueName,
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
		},
		{
			title: "Lawyer",
			dataIndex: "lawyer",
			key: "lawyer",
			render: (lawyer) => lawyer.name,
		},
		{
			title: "Stylist",
			dataIndex: "stylist",
			key: "stylist",
			render: (stylist) => stylist.name,
		},
		{
			title: "Photographer",
			dataIndex: "photographer",
			key: "photographer",
			render: (photographer) => photographer.name,
		},
		{
			title: "Actions",
			key: "actions",
			render: (_, record) => (
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
		<div style={{ margin: '20px' }}>
			<Table dataSource={bookingData} columns={columns} />
		</div>
	);
};

export default ViewBookings;