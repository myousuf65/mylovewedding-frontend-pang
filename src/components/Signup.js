import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/auth.module.css';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const onFinish = async (values) => {
        setLoading(true);
        try {
            sessionStorage.setItem('user', JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password
            }));
            
            message.success('Signup successful!');
            navigate('/'); // Navigate to home page instead of login
        } catch (error) {
            message.error('An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <h1>Sign Up</h1>
            <Form
                name="signup"
                onFinish={onFinish}
                layout="vertical"
                className={styles.form}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Sign Up
                    </Button>
                </Form.Item>

                <div className={styles.linkContainer}>
                    Already have an account? <Link to="/login">Login here</Link>
                </div>
            </Form>
        </div>
    );
};

export default Signup; 