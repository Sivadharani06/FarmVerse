import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFarm, generateFarmId } from "../../Services/FarmService";
import '../../DisplayView.css';

const FarmEntry = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [farm, setFarm] = useState({
    farmId: 0,
    farmName: "",
    area: 0.0,
    soil: "",
    username: "abcd",

  });

  const [flag, setFlag] = useState(false);
  const [newId, setNewId] = useState(0);


  const setFarmId = () => {
    generateFarmId().then(response => {
      setNewId(response.data);
    });
  }

  useEffect(() => {
    setFarmId();
    setFlag(false);
  }, []);


  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setFarm(values => ({ ...values, [name]: value }));
  };

  const saveFarm = (event) => {
    event.preventDefault();
    const farmToSave = {
      ...farm,
      farmId: newId,
      area: Number(farm.area)
    };
    addFarm(farmToSave).then(response => {
      setFlag(true);
    }).catch(err => {
      console.error("Error saving farm:", err);
    });
  };

  const clearAll = (event) => {
    if (event) event.preventDefault();
    setFarm({
      farmId: 0,
      farmName: "",
      area: 0.0,
      soil: "",
      username: "abcd",
    });
    setErrors({});
    setFlag(false);
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!farm.farmName || !farm.farmName.trim()) {
      tempErrors.farmName = "Farm name is required";
      isValid = false;
    }

    if (farm.area === undefined || farm.area === null || String(farm.area).trim() === "" || Number(farm.area) <= 0) {
      tempErrors.area = "Farm area must be greater than 0";
      isValid = false;
    }

    if (!farm.soil || !farm.soil.trim()) {
      tempErrors.soil = "Soil type is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      saveFarm(event);
    }
  };

  const returnBack = () => {
    navigate('/farmer-menu');
  }

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="text-center">New Farm Entry</h2>
        <br />
        <form>
          <div className="form-group text-left">
            <label>Farm Id: </label>
            <input placeholder="Farm Id" name="farmId" className="form-control" value={newId} readOnly />
          </div>
          <div className="form-group text-left">
            <label> Farm Name: </label>
            <input placeholder="Farm Name" name="farmName" className="form-control" value={farm.farmName} onChange={onChangeHandler} />
            {errors.farmName && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", textAlign: "left" }}>{errors.farmName}</p>}
          </div>

          <div className="form-group text-left">
            <label> Farm Area: </label>
            <input placeholder="Farm Area" name="area" className="form-control" value={farm.area} onChange={onChangeHandler} />
            {errors.area && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", textAlign: "left" }}>{errors.area}</p>}
          </div>

          <div className="form-group text-left">
            <label> Soil Type: </label>
            <select name="soil" className="form-control" value={farm.soil} onChange={onChangeHandler}>
              <option value="">Select Soil Type</option>
              <option value="Alluvial">Alluvial</option>
              <option value="Black">Black</option>
              <option value="Lateriate">Lateriate</option>
              <option value="Red">Red</option>
            </select>
            {errors.soil && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", textAlign: "left" }}>{errors.soil}</p>}
          </div>

          <div className="form-group">
            <button className="btn btn-success" onClick={handleValidation}>Save</button>
            &nbsp;&nbsp;
            <button className="btn btn-secondary" onClick={clearAll}>Reset</button>
            &nbsp;&nbsp;
            <button className="btn btn-warning" onClick={returnBack}>Return Back</button>
          </div>
        </form>
        <br />
        <div>
          {flag && <p style={{ color: "blue", fontWeight: "600" }}>New Farm Added</p>}
        </div>
      </div>
    </div>

  );

}

export default FarmEntry;