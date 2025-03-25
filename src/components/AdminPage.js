import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../css/adminpage.module.css" 

const AdminPage = () => {
  const navigate = useNavigate();

  const handleCreateVenue = () => {
    navigate('/createvenue');
  };

  const handleViewAllVenues = () => {
    navigate('/venues');
  };

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleCreateVenue}>
          Create Venue
        </button>
        <button className={styles.button} onClick={handleViewAllVenues}>
          View All Venues
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
