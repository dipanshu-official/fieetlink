import React from 'react'
import Header from '../components/Header'
import AdminVehicleManagement from '../components/AdminVehicleManagement'
import UserBookings from '../components/UserBookings'

const AdminPage = () => {
  return (
    <div>
     <Header />
     <AdminVehicleManagement className = "mt-10"/>
     {/* <UserBookings /> */}
    </div>
  )
}

export default AdminPage
