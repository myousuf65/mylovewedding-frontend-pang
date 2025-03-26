import { React, useEffect, useState } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import styles from "../css/viewlawyers.module.css";

const ViewLawyers = () => {
	const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
	const [lawyerData, setLawyerData] = useState([]);

	useEffect(() => {
		fetch(`${BACKEND_URL}/lawyer/view`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setLawyerData(data);
			})
			.catch((error) => {
				console.error("Error fetching lawyers:", error);
			});
	}, []);

	const handleDelete = (id) => {
		fetch(`${BACKEND_URL}/lawyer/delete/${id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Delete response:", data);
				// If deletion is successful, remove the lawyer from the state
				setLawyerData((prevData) =>
					prevData.filter((lawyer) => lawyer.id !== id)
				);
			})
			.catch((error) => {
				console.error("Error deleting lawyer:", error);
			});
	};

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			render: (price) => `$${price}`,
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
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>All Lawyers</h1>
				<Link className={styles.backLink} to="/adminp">
					Back to Dashboard
				</Link>
			</div>
			<div className={styles.tableContainer}>
				<Table 
					dataSource={lawyerData} 
					columns={columns} 
					pagination={{ pageSize: 10 }}
					rowKey="id"
				/>
			</div>
		</div>
	);
};

export default ViewLawyers; 