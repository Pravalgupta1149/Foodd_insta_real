import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';;   
import UserRegister from '../Pages/auth/UserRegister.jsx';
import UserLogin from '../Pages/auth/UserLogin.jsx';
import FoodPartnerRegister from '../Pages/auth/FoodPartnerRegister.jsx';
import FoodPartnerLogin from '../Pages/auth/FoodPartnerLogin.jsx';
import Home from '../genral/Home.jsx';
import CreatefoodPartner from '../Pages/food-partner/CreatefoodPartner.jsx';
import Profile from '../Pages/food-partner/Profile.jsx';

const RoutesComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path="/user/register" element={<UserRegister/>} />  
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />  
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
                <Route path="/" element={<UserLogin />} />
                <Route path="/create/food" element={<CreatefoodPartner />} />
                <Route path="/food-partner/:id" element={<Profile />} />
            </Routes>   
        </Router>
    );
};

export default RoutesComponent;