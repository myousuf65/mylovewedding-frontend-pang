import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import styles from "../css/venuelist.module.css"
import { Link } from 'react-router';


const VenueList = () => {
	const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
	const [venues, setVenues] = useState([]);

	useEffect(() => {
		fetch(`${BACKEND_URL}/venue/view`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				setVenues(data)
			});
	}, []);		


	const handleDelete = (venueId) => {
		console.log(venueId)
		fetch(`${BACKEND_URL}/venue/delete/${venueId}`, {
			method: 'DELETE',
		})
			.then((res) => {
				if (res.ok) {
					message.success('Venue deleted');
				} else {
					message.error('Failed to delete venue');
				}
				return res.json()
			})
			.then(data=>{
				setVenues(data)
			})
			.catch((err) => {
				message.error('Error deleting venue');
				console.error(err);
			});
	};

	// Ant Design Table columns
	const columns = [
		{
			title: 'Venue Name',
			dataIndex: 'venueName',
			key: 'venueName',
		},
		{
			title: 'Location',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (_, record) => (
				<Button
					type="danger"
					onClick={() => handleDelete(record.venueId)}
					className={styles.deleteButton}
				>
					Delete
				</Button>
			),
		},
	];

	return (
		<div className={styles.container}>
			<Link style={{border:"1px solid black", margin:"20px"}} to="/adminp">Admin Dashboard</Link>
			<Table
				dataSource={venues}
				columns={columns}
				rowKey="id"
				pagination={false}
				bordered
			/>
		</div>
	);
};

export default VenueList;
