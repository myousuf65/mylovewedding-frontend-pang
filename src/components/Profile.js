import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Avatar, Typography, Button } from 'antd';
import { UserOutlined, CalendarOutlined, LogoutOutlined } from '@ant-design/icons';

function Profile() {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (!userData) {
            // Redirect to login if no user data found
            navigate('/login');
            return;
        }
        setUser(userData);

        // Fetch user's bookings
        const user = JSON.parse(sessionStorage.getItem("user"));
        fetch(`${BACKEND_URL}/booking/view/${user.username}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setBookings(data);
            })
            .catch((error) => {
                console.error("Error fetching bookings:", error);
            });

    }, [navigate, BACKEND_URL]);

    // Define table columns
    const columns = [
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
    ];

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <Card 
                style={{ 
                    marginBottom: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
            >
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <Avatar 
                            size={64} 
                            icon={<UserOutlined />} 
                            style={{ 
                                backgroundColor: '#1890ff'
                            }}
                        />
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            {user.username}
                        </Typography.Title>
                    </div>

                    <Button 
                        type="primary" 
                        danger
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            height: 'auto',
                            borderRadius: '6px',
                            width: "100px",
                            boxShadow: '0 2px 4px rgba(255, 77, 79, 0.2)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </Card>

            <Card
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CalendarOutlined />
                        <span>My Bookings</span>
                    </div>
                }
                style={{ 
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
            >
                <Table 
                    dataSource={bookings} 
                    columns={columns} 
                    pagination={{ pageSize: 5 }}
                    style={{ marginTop: '16px' }}
                />
            </Card>
        </div>
    );
}

export default Profile; 