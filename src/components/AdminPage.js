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

  const handleCreateLawyer = () => {
    navigate('/add-lawyer');
  };

  const handleViewLawyers = () => {
    navigate('/view-lawyers');
  };

  const handleCreateStylist = () => {
    navigate('/add-stylist');
  };

  const handleViewStylists = () => {
    navigate('/view-stylists');
  };

  const handleCreatePhotographer = () => {
    navigate('/add-photographer');
  };

  const handleViewPhotographers = () => {
    navigate('/view-photographers');
  };

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <div className={styles.gridContainer}>
        <div className={styles.section}>
          <h2>Venue Management</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={handleCreateVenue}>
              Create Venue
            </button>
            <button className={styles.button} onClick={handleViewAllVenues}>
              View All Venues
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Lawyer Management</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={handleCreateLawyer}>
              Add Lawyer
            </button>
            <button className={styles.button} onClick={handleViewLawyers}>
              View All Lawyers
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Stylist Management</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={handleCreateStylist}>
              Add Stylist
            </button>
            <button className={styles.button} onClick={handleViewStylists}>
              View All Stylists
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Photographer Management</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={handleCreatePhotographer}>
              Add Photographer
            </button>
            <button className={styles.button} onClick={handleViewPhotographers}>
              View All Photographers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
