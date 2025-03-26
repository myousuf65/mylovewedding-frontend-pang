import { React, useEffect, useState } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import styles from "../css/viewstylists.module.css";

const ViewStylists = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [stylistData, setStylistData] = useState([]);

    useEffect(() => {
        fetch(`${BACKEND_URL}/stylist/view`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setStylistData(data);
            })
            .catch((error) => {
                console.error("Error fetching stylists:", error);
            });
    }, []);

    const handleDelete = (id) => {
        fetch(`${BACKEND_URL}/stylist/delete/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Delete response:", data);
                setStylistData((prevData) =>
                    prevData.filter((stylist) => stylist.id !== id)
                );
            })
            .catch((error) => {
                console.error("Error deleting stylist:", error);
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
                <h1>All Stylists</h1>
                <Link className={styles.backLink} to="/adminp">
                    Back to Dashboard
                </Link>
            </div>
            <div className={styles.tableContainer}>
                <Table 
                    dataSource={stylistData} 
                    columns={columns} 
                    pagination={{ pageSize: 10 }}
                    rowKey="id"
                />
            </div>
        </div>
    );
};

export default ViewStylists; 