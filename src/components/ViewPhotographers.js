import { React, useEffect, useState } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import styles from "../css/viewphotographers.module.css"; // You'll need to create this CSS module

const ViewPhotographers = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [photographerData, setPhotographerData] = useState([]);

    useEffect(() => {
        fetch(`${BACKEND_URL}/photographer/view`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPhotographerData(data);
            })
            .catch((error) => {
                console.error("Error fetching photographers:", error);
            });
    }, []);

    const handleDelete = (id) => {
        fetch(`${BACKEND_URL}/photographer/delete/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Delete response:", data);
                setPhotographerData((prevData) =>
                    prevData.filter((photographer) => photographer.id !== id)
                );
            })
            .catch((error) => {
                console.error("Error deleting photographer:", error);
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
                <h1>All Photographers</h1>
                <Link className={styles.backLink} to="/adminp">
                    Back to Dashboard
                </Link>
            </div>
            <div className={styles.tableContainer}>
                <Table 
                    dataSource={photographerData} 
                    columns={columns} 
                    pagination={{ pageSize: 10 }}
                    rowKey="id"
                />
            </div>
        </div>
    );
};

export default ViewPhotographers; 