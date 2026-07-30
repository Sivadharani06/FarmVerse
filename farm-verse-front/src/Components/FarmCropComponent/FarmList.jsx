import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {getFarmsByUsername,deleteFarmById} from "../../Services/FarmService";
import '../../DisplayView.css';


const FarmList = () => {
const [farms, setFarms] = useState([]);
    let navigate = useNavigate();

const setFarmData = () => {
        getFarmsByUsername().then((response) => {
        setFarms(response.data);
      }).catch(error => {
        alert("Error Ocurred while loading data:" + error);
      });
    }
    useEffect(() => {
       setFarmData();
   }, []);
   
  const removeFarm=(id)=>{
    deleteFarmById(id).then( res => {
        let remainFarms=farms.filter((farm) => (farm.farmId !== id));
          setFarms(remainFarms);
          });
    navigate('/farm-list');  
  }
 
  const returnBack=()=>{
     navigate('/farmer-menu');  
  }

  return (
     <div className="text-center">
   <div>
    <h2 className="text-center">Farm List By User</h2>
    <div className = "row">
      <table className = "table table-striped table-bordered">
       <thead>
        <tr>
          <th> Farm Id</th>
          <th> Farm Name</th>
          <th> Farm Area</th>
          <th> Soil Type</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
         {
           farms.map((farm, index) => (
        <tr key = {farm.farmId}>
        <td> {farm.farmId} </td>
        <td> {farm.farmName} </td>    
        <td> {farm.area} </td>
        <td> {farm.soil} </td>
       
        <td><button style={{marginLeft: "10px"}} onClick={()=>removeFarm(farm.farmId)} className="btn btn-danger">Delete Farm</button></td>
     
       </tr>                                        
     ))
     }                        
   </tbody>
   </table>  
   <div>
     <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-danger">Return</button>
    </div>        
  </div>
 </div>
</div>
  );
}

export default FarmList;