import React from "react";
import { logoutUser } from '../../Services/LoginService';
import { useNavigate } from 'react-router-dom';
const FarmerMenu = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
      })
  };
  return (
    <div className="farmer-menu-container">
      <div className="menu-header">
        <h1 className="menu-title">FarmVerse</h1>
        <p className="menu-subtitle">Your Digital Agriculture Control Center</p>
      </div>

      <div className="dashboard-grid">
        {/* Farms Card */}
        <div className="dashboard-card">
          <div className="card-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1500937386664-56d1590d333c?auto=format&fit=crop&w=600&q=80" 
              alt="Green Farm Field" 
              className="card-image"
            />
          </div>
          <div className="card-content">
            <h3 className="card-title">My Farms</h3>
            <p className="card-description">
              Register new farm plots, classify soil types, and track area details across your registered land.
            </p>
            <div className="card-actions">
              <button className="btn btn-success" onClick={() => navigate('/farm-add')}>Register Farm</button>
              <button className="btn btn-secondary" onClick={() => navigate('/farm-list')}>View List</button>
            </div>
          </div>
        </div>

        {/* Crops Card */}
        <div className="dashboard-card">
          <div className="card-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80" 
              alt="Green Crops" 
              className="card-image"
            />
          </div>
          <div className="card-content">
            <h3 className="card-title">Crop Operations</h3>
            <p className="card-description">
              Record new crop items, track sowing/harvest months, and log yields of active plots.
            </p>
            <div className="card-actions">
              <button className="btn btn-success" onClick={() => navigate('/crop-add')}>Add Crop</button>
              <button className="btn btn-secondary" onClick={() => navigate('/crop-list')}>View List</button>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <button className="btn btn-danger" onClick={handleLogout}>Logout from FarmVerse</button>
      </div>
    </div>
  );
}
export default FarmerMenu;
