import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser'; 
import FarmerMenu from './Components/LoginComponent/FarmerMenu';
function App() {
  return (
    <div className="App">
      
     <BrowserRouter>
      <Routes>
       <Route path="/" element={<LoginPage/>}/>
       <Route path="/register" element={<RegisterUser/>}/>
       <Route path="/farmer-menu"element={<FarmerMenu/>}/>
       </Routes>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
