import React from 'react'
import Header from '../components/Header'
import SearchVehicles from '../components/SearchVehicles'
import VehicleResults from '../components/VehicleResults'

const UserPage = () => {
  return (
    <div>
      <Header />
      <SearchVehicles/>
      <VehicleResults/>
    </div>
  )
}

export default UserPage
