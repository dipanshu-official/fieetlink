import React, { useState } from 'react';
import { X, Check, MapPin, Users, Clock, DollarSign } from 'lucide-react';
import LoadingButton from './LoadingButton';



export default function BookingModal({ 
  vehicle, 
  searchCriteria, 
  onClose, 
  onConfirmBooking,
  loading = false
}) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });

  if (!vehicle) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please fill in all required fields');
      return;
    }

    const booking = {
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      fromPincode: searchCriteria.fromPincode,
      toPincode: searchCriteria.toPincode,
      startTime: searchCriteria.startTime,
      startDate: searchCriteria.startDate,
      capacity: searchCriteria.capacity,
      totalPrice: vehicle.totalPrice,
      status: 'pending',
    };

    onConfirmBooking(booking);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Confirm Booking</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Trip Details</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-gray-600 mr-2" />
                <span>{searchCriteria.fromPincode} → {searchCriteria.toPincode}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 text-gray-600 mr-2" />
                <span>{searchCriteria.startDate} {searchCriteria.startTime && `at ${searchCriteria.startTime}`}</span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 text-gray-600 mr-2" />
                <span>{searchCriteria.capacity} passengers</span>
              </div>
              <div className="flex items-center text-sm font-semibold">
                <DollarSign className="h-4 w-4 text-gray-600 mr-2" />
                <span>₹{vehicle.totalPrice}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <LoadingButton
                onClick={onClose}
                variant="secondary"
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                loading={loading}
                loadingText="Booking..."
                icon={<Check className="h-5 w-5" />}
                type="submit"
                variant="success"
                className="flex-1"
              >
                Confirm Booking
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
