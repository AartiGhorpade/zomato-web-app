import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FoodPartnerSignup from '../pages/auth/FoodPartnerSignup'
import UserSignup from '../pages/auth/UserSignup'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/CreateFood'
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/user/register' element={<UserSignup />} />
                <Route path='/user/login' element={<UserLogin />} />
                <Route path='/food-partner/register' element={<FoodPartnerSignup />} />
                <Route path='/food-partner/login' element={<FoodPartnerLogin />} />
                <Route path='/' element={<Home />} />
                <Route path='/create-food' element={<CreateFood />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes