import React, { useState } from 'react';
import { Search, MapPin, Users, Clock } from 'lucide-react';



export default function SearchVehicles({ onSearch }) {
  const [searchData, setSearchData] = useState({
    capacity: '',
    fromPincode: '',
    toPincode: '',
    startTime: '',
    startDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchData.capacity || !searchData.fromPincode || !searchData.toPincode || !searchData.startDate) {
      alert('Please fill in all required fields');
      return;
    }

    onSearch({
      capacity: parseInt(searchData.capacity),
      fromPincode: searchData.fromPincode,
      toPincode: searchData.toPincode,
      startTime: searchData.startTime,
      startDate: searchData.startDate,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Search className="h-6 w-6 text-green-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Search Available Vehicles</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline h-4 w-4 mr-1" />
              Required Capacity *
            </label>
            <input
              type="number"
              value={searchData.capacity}
              onChange={(e) => setSearchData({ ...searchData, capacity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Number of passengers"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              From Pincode *
            </label>
            <input
              type="text"
              value={searchData.fromPincode}
              onChange={(e) => setSearchData({ ...searchData, fromPincode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 110001"
              maxLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              To Pincode *
            </label>
            <input
              type="text"
              value={searchData.toPincode}
              onChange={(e) => setSearchData({ ...searchData, toPincode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 110002"
              maxLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Travel Date *
            </label>
            <input
              type="date"
              value={searchData.startDate}
              onChange={(e) => setSearchData({ ...searchData, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline h-4 w-4 mr-1" />
              Start Time
            </label>
            <input
              type="time"
              value={searchData.startTime}
              onChange={(e) => setSearchData({ ...searchData, startTime: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          <Search className="h-5 w-5 mr-2" />
          Search Vehicles
        </button>
      </form>
    </div>
  );
}