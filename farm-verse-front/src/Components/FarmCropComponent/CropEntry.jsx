import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCrop, generateCropId } from "../../Services/CropService";
import { getAllFarmIdsByUser } from "../../Services/FarmService";
import '../../DisplayView.css';

const CropEntry = () => {
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [crop, setCrop] = useState({
        cropId: "",
        farmId: "",
        username: "abcd",
        cropName: "",
        cropArea: 0.0,
        sownMonthYear: "",
        harvestMonthYear: "",
        yield: 0.0,
    });
    
    const [idList, setIdList] = useState([]);
    const [flag, setFlag] = useState(false);
    const [newId, setNewId] = useState("");
    
    const setCropId = () => {
        generateCropId().then(response => {
            setNewId(response.data);
        }).catch(err => {
            console.error("Error generating Crop ID:", err);
        });
    };

    const setFarmIds = () => {
        getAllFarmIdsByUser().then(response => {
            setIdList(response.data || []);
        }).catch(err => {
            console.error("Error fetching farm IDs:", err);
        });
    }

    useEffect(() => {
        setCropId();
        setFarmIds();
        setFlag(false);
    }, []);

    const onChangeHandler = (event) => {
        event.persist();
        setFlag(false);
        const name = event.target.name;
        const value = event.target.value;
        setCrop(values => ({ ...values, [name]: value }));
    };

    const saveCrop = (event) => {
        event.preventDefault();
        const cropToSave = {
            ...crop,
            cropId: newId,
            farmId: Number(crop.farmId),
            cropArea: Number(crop.cropArea),
            yield: Number(crop.yield)
        };
        addCrop(cropToSave).then(response => {
            setFlag(true);
        }).catch(err => {
            console.error("Error saving crop:", err);
        });
    };

    const clearAll = (event) => {
        if (event) event.preventDefault();
        setCrop({
            cropId: "",
            farmId: "",
            username: "abcd",
            cropName: "",
            cropArea: 0.0,
            sownMonthYear: "",
            harvestMonthYear: "",
            yield: 0.0
        });
        setErrors({});
        setFlag(false);
    };

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!crop.farmId) {
            tempErrors.farmId = "Farm ID is required";
            isValid = false;
        } else if (isNaN(crop.farmId) || Number(crop.farmId) <= 0) {
            tempErrors.farmId = "Farm ID must be a positive number";
            isValid = false;
        } else if (idList.length > 0 && !idList.includes(Number(crop.farmId))) {
            tempErrors.farmId = `Invalid Farm ID. Choose from your registered farms (Available IDs: ${idList.join(', ')})`;
            isValid = false;
        }

        if (!crop.cropName || !crop.cropName.trim()) {
            tempErrors.cropName = "Crop name is required";
            isValid = false;
        }

        if (crop.cropArea === undefined || crop.cropArea === null || String(crop.cropArea).trim() === "" || Number(crop.cropArea) <= 0) {
            tempErrors.cropArea = "Crop area must be greater than 0";
            isValid = false;
        }

        if (!crop.sownMonthYear || !crop.sownMonthYear.trim()) {
            tempErrors.sownMonthYear = "Sown month/year is required";
            isValid = false;
        }

        if (!crop.harvestMonthYear || !crop.harvestMonthYear.trim()) {
            tempErrors.harvestMonthYear = "Harvest month/year is required";
            isValid = false;
        }

        if (crop.yield === undefined || crop.yield === null || String(crop.yield).trim() === "" || Number(crop.yield) < 0) {
            tempErrors.yield = "Yield must be a valid number";
            isValid = false;
        }

        setErrors(tempErrors);
        if (isValid) {
            saveCrop(event);
        }
    };

    const returnBack = (event) => {
        if (event) event.preventDefault();
        navigate('/farmer-menu');
    };

    return (
        <div className="container">
            <div className="login-box">
                <h2 className="text-center">New Crop Entry</h2>
                <br />
                <form>
                    <div className="form-group text-left">
                        <label>Crop Id: </label>
                        <input placeholder="Crop Id" name="cropId" className="form-control" value={newId} readOnly />
                    </div>
                    <div className="form-group text-left">
                        <label>Farm ID: </label>
                        <input placeholder="Enter Farm ID" name="farmId" className="form-control" value={crop.farmId} onChange={onChangeHandler} />
                        {errors.farmId && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", textAlign: "left" }}>{errors.farmId}</p>}
                    </div>
                    <div className="form-group text-left">
                        <label>Crop Name: </label>
                        <input placeholder="Crop Name" name="cropName" className="form-control" value={crop.cropName} onChange={onChangeHandler} />
                        {errors.cropName && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", textAlign: "left" }}>{errors.cropName}</p>}
                    </div>
                    <div className="form-group text-left">
                        <label>Crop Area: </label>
                        <input placeholder="Crop Area" name="cropArea" className="form-control" value={crop.cropArea} onChange={onChangeHandler} />
                        {errors.cropArea && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", textAlign: "left" }}>{errors.cropArea}</p>}
                    </div>
                    <div className="form-group text-left">
                        <label>Sown Month & Year: </label>
                        <input placeholder="e.g. June 2026" name="sownMonthYear" className="form-control" value={crop.sownMonthYear} onChange={onChangeHandler} />
                        {errors.sownMonthYear && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", textAlign: "left" }}>{errors.sownMonthYear}</p>}
                    </div>
                    <div className="form-group text-left">
                        <label>Harvest Month & Year: </label>
                        <input placeholder="e.g. December 2026" name="harvestMonthYear" className="form-control" value={crop.harvestMonthYear} onChange={onChangeHandler} />
                        {errors.harvestMonthYear && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", textAlign: "left" }}>{errors.harvestMonthYear}</p>}
                    </div>
                    <div className="form-group text-left">
                        <label>Yield: </label>
                        <input placeholder="Yield" name="yield" className="form-control" value={crop.yield} onChange={onChangeHandler} />
                        {errors.yield && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", textAlign: "left" }}>{errors.yield}</p>}
                    </div>
                    <br />
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
                    {flag && <p style={{ color: "blue", fontWeight: "600" }}>New Crop Added</p>}
                </div>
            </div>
        </div>
    );
};

export default CropEntry;
