import React, { useEffect, useState } from "react";
import { Search, Calendar, Plus, Settings } from "lucide-react";
import { useAsync } from "../hooks/useAsync";
import SearchVehicles from "./SearchVehicles";
import VehicleResults from "./VehicleResults";
import BookingModal from "./BookingModal";
import UserBookings from "./UserBookings";
import AdminVehicleManagement from "./AdminVehicleManagement";
import { useSelector, useDispatch } from "react-redux";
import { userDataSelector } from "../store/globalSelector";
import { use } from "react";
import { registerAsync } from "../store/globalAction";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("search");

 

  const user = useSelector(userDataSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(registerAsync());
  }, [dispatch]);

  const [searchResults, setSearchResults] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState(null);

  // Loading states
  const searchAsync = useAsync();
  const addVehicleAsync = useAsync();
  const updateVehicleAsync = useAsync();
  const deleteVehicleAsync = useAsync();
  const bookingAsync = useAsync();
  const cancelBookingAsync = useAsync();

  const [deletingVehicle, setDeletingVehicle] = useState(null);
  const [cancellingBooking, setCancellingBooking] = useState(null);

 

 



  const handleSearch = async (criteria) => {
    setSearchCriteria(criteria);

    const results = await searchAsync.execute(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const availableVehicles = vehicles.filter((vehicle) => {
        const hasCapacity = vehicle.capacity >= criteria.capacity;
        const hasRoute =
          vehicle.availableRoutes.includes(criteria.fromPincode) ||
          vehicle.availableRoutes.includes(criteria.toPincode) ||
          vehicle.availableRoutes.length === 0;
        return hasCapacity && hasRoute && vehicle.isAvailable;
      });

      return availableVehicles.map((vehicle) => {
        const estimatedDistance = Math.floor(Math.random() * 50) + 20;
        const estimatedDuration = `${Math.floor(
          (estimatedDistance / 30) * 60
        )} mins`;
        const totalPrice = Math.round(estimatedDistance * vehicle.pricePerKm);

        return {
          ...vehicle,
          estimatedDuration,
          estimatedDistance,
          totalPrice,
        };
      });
    });

    setSearchResults(results || []);
  };

  const handleBookVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };


  const tabs =
    user?.role === "admin"
      ? [
          { id: "search", label: "Search Vehicles", icon: Search },
          { id: "manage", label: "Manage Vehicles", icon: Settings },
          { id: "bookings", label: "All Bookings", icon: Calendar },
        ]
      : [
          { id: "search", label: "Search Vehicles", icon: Search },
          { id: "bookings", label: "My Bookings", icon: Calendar },
        ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Navigation */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "search" && (
          <>
            <SearchVehicles
              
            />
            <VehicleResults
              results={searchResults}
              onBookVehicle={handleBookVehicle}
              loading={searchAsync.loading}
            />
          </>
        )}

        {activeTab === "manage" && user?.role === "admin" && (
          <AdminVehicleManagement
            vehicles={vehicles}
            onAddVehicle={handleAddVehicle}
            onUpdateVehicle={handleUpdateVehicle}
            onDeleteVehicle={handleDeleteVehicle}
            addingVehicle={addVehicleAsync.loading}
            updatingVehicle={updateVehicleAsync.loading ? "updating" : null}
            deletingVehicle={deletingVehicle}
          />
        )}

        {activeTab === "bookings" && (
          <UserBookings
            bookings={user?.role === "admin" ? bookings : bookings}
            onCancelBooking={handleCancelBooking}
            cancellingBooking={cancellingBooking}
          />
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        vehicle={selectedVehicle}
        searchCriteria={searchCriteria}
        onClose={() => setSelectedVehicle(null)}
        onConfirmBooking={handleConfirmBooking}
        loading={bookingAsync.loading}
      />
    </div>
  );
}
