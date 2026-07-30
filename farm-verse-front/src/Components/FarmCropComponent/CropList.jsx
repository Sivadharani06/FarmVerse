import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCropsByUsername, deleteCropById } from "../../Services/CropService";
import '../../DisplayView.css';

const CropList = () => {
    const [crops, setCrops] = useState([]);
    let navigate = useNavigate();

    const setCropData = () => {
        getCropsByUsername().then((response) => {
            setCrops(response.data || []);
        }).catch(error => {
            alert("Error occurred while loading data: " + error);
        });
    }

    useEffect(() => {
        setCropData();
    }, []);

    const removeCrop = (id) => {
        deleteCropById(id).then(res => {
            let remainCrops = crops.filter((crop) => (crop.cropId !== id));
            setCrops(remainCrops);
        }).catch(error => {
            alert("Error deleting crop: " + error);
        });
    }

    const returnBack = () => {
        navigate('/farmer-menu');
    }

    return (
        <div className="text-center">
            <div>
                <h2 className="text-center">Crop List By User</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Crop Id</th>
                                <th>Farm Id</th>
                                <th>Crop Name</th>
                                <th>Crop Area</th>
                                <th>Sown Month & Year</th>
                                <th>Harvest Month & Year</th>
                                <th>Yield</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                crops.map((crop) => (
                                    <tr key={crop.cropId}>
                                        <td> {crop.cropId} </td>
                                        <td> {crop.farmId} </td>
                                        <td> {crop.cropName} </td>
                                        <td> {crop.cropArea} </td>
                                        <td> {crop.sownMonthYear} </td>
                                        <td> {crop.harvestMonthYear} </td>
                                        <td> {crop.yield} </td>
                                        <td>
                                            


                                             <Link to={`/farm-crop/${crop.cropId}`}><button style={{marginLeft: "10px"}} className="btn btn-warning">Crop Yield</button></Link>
                                             &nbsp;&nbsp;

                                             <button style={{ marginLeft: "10px" }} onClick={() => removeCrop(crop.cropId)} className="btn btn-danger">
                                                Delete Crop
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div>
                        <button style={{ marginLeft: "10px" }} onClick={returnBack} className="btn btn-danger">Return</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CropList;