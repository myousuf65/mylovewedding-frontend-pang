import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/auth.module.css';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Store credentials in sessionStorage
            sessionStorage.setItem('user', JSON.stringify({
                username: values.username,
                password: values.password
            }));
            
            
            message.success('Login successful!');
            navigate('/profile');
        } catch (error) {
            message.error('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <h1>Login</h1>
            <Form
                name="login"
                onFinish={onFinish}
                layout="vertical"
                className={styles.form}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: 'Please input your username!' },
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
                        Login
                    </Button>
                </Form.Item>

                <div className={styles.linkContainer}>
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </div>
            </Form>
        </div>
    );
};

export default Login; 