import React, { useState } from 'react';
import { Plus, Truck } from 'lucide-react';
import { Vehicle } from '../types';
import LoadingButton from './LoadingButton';
import LoadingButton from './LoadingButton';



export default function AddVehicle({ onAddVehicle, loading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    type: '',
    availableRoutes: '',
    pricePerKm: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.capacity || !formData.type || !formData.pricePerKm) {
      alert('Please fill in all required fields');
      return;
    }

    const vehicle = {
      name: formData.name,
      capacity: parseInt(formData.capacity),
      type: formData.type,
      availableRoutes: formData.availableRoutes.split(',').map(route => route.trim()),
      pricePerKm: parseFloat(formData.pricePerKm),
      isAvailable: true,
    };

    onAddVehicle(vehicle);
    setFormData({
      name: '',
      capacity: '',
      type: '',
      availableRoutes: '',
      pricePerKm: '',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Truck className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Add New Vehicle</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Toyota Hiace"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacity (passengers) *
            </label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 12"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select type</option>
              <option value="Bus">Bus</option>
              <option value="Van">Van</option>
              <option value="Minibus">Minibus</option>
              <option value="Car">Car</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price per KM (₹) *
            </label>
            <input
              type="number"
              value={formData.pricePerKm}
              onChange={(e) => setFormData({ ...formData, pricePerKm: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 15"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Routes (Pincodes)
          </label>
          <input
            type="text"
            value={formData.availableRoutes}
            onChange={(e) => setFormData({ ...formData, availableRoutes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 110001, 110002, 110003"
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter comma-separated pincodes for available routes
          </p>
        </div>

     
        <LoadingButton>
          loading={loading}
          loadingText="Adding vehicle..."
          icon={<Plus className="h-5 w-5" />}
          type="submit"
          className="w-full"
          Add Vehicle
        </LoadingButton>
      </form>
    </div>
  )
 
}