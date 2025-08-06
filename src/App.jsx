import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashBored from './pages/DashBored'
import GymSearch from './pages/GymSearch'
import Navbar from './component/Navbar'
import MembershipPlan from './pages/MembershipPlan'
import PersonalData from './pages/PersonalData'
import { AutheriseProvider } from './contexts/AutheriseContext'
import PrivateRoute from './routes/PrivateRoutes'

const App = () => {
    
  return ( 
    <AutheriseProvider>
  <Router>
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBored />
            </PrivateRoute>
          }
        />
        <Route
          path="/gym-search"
          element={
            
              <GymSearch />
            
          }
        />
        <Route
          path="/membership"
          element={
           
              <MembershipPlan />
            
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PersonalData />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  </Router>
</AutheriseProvider>
 

  )  
}

export default App

