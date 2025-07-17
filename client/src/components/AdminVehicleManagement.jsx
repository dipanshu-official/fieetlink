import React, { useState } from 'react';
import { Edit, Trash2, Plus, Save, X } from 'lucide-react';
import LoadingButton from './LoadingButton';
import SkeletonLoader from './SkeletonLoader';



export default function AdminVehicleManagement({

  onAddVehicle,
  onUpdateVehicle,
  onDeleteVehicle,
  loading = false,
  addingVehicle = false,
  updatingVehicle = null,
  deletingVehicle = null,
}) {
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
   const [vehicles, setVehicles] = useState([
      {
        id: "1",
        name: "Toyota Hiace",
        capacity: 12,
        type: "Van",
        availableRoutes: ["110001", "110002", "110003"],
        pricePerKm: 15,
        isAvailable: true,
      },
      {
        id: "2",
        name: "Tata Winger",
        capacity: 17,
        type: "Minibus",
        availableRoutes: ["110001", "110004", "110005"],
        pricePerKm: 20,
        isAvailable: true,
      },
      {
        id: "3",
        name: "Mahindra Bolero",
        capacity: 7,
        type: "Car",
        availableRoutes: ["110002", "110003", "110006"],
        pricePerKm: 12,
        isAvailable: true,
      },
    ]);
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    type: '',
    availableRoutes: '',
    pricePerKm: '',
    isAvailable: true,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      capacity: '',
      type: '',
      availableRoutes: '',
      pricePerKm: '',
      isAvailable: true,
    });
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle.id);
    setFormData({
      name: vehicle.name,
      capacity: vehicle.capacity.toString(),
      type: vehicle.type,
      availableRoutes: vehicle.availableRoutes.join(', '),
      pricePerKm: vehicle.pricePerKm.toString(),
      isAvailable: vehicle.isAvailable,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.capacity || !formData.type || !formData.pricePerKm) {
      alert('Please fill in all required fields');
      return;
    }

    const vehicleData = {
      name: formData.name,
      capacity: parseInt(formData.capacity),
      type: formData.type,
      availableRoutes: formData.availableRoutes.split(',').map(route => route.trim()),
      pricePerKm: parseFloat(formData.pricePerKm),
      isAvailable: formData.isAvailable,
    };

    if (editingId) {
      onUpdateVehicle(editingId, vehicleData);
      setEditingId(null);
    } else {
      onAddVehicle(vehicleData);
      setShowAddForm(false);
    }
    resetForm();
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      onDeleteVehicle(id);
    }
  };

  if (loading) {
    return <SkeletonLoader type="table" />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Vehicle Management</h2>
        <LoadingButton
          onClick={() => setShowAddForm(true)}
          icon={<Plus className="h-5 w-5" />}
          disabled={showAddForm}
        >
          Add Vehicle
        </LoadingButton>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Add New Vehicle</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Vehicle Name"
              value={formData.name}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={formData.type}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="Bus">Bus</option>
              <option value="Van">Van</option>
              <option value="Minibus">Minibus</option>
              <option value="Car">Car</option>
            </select>
            <input
              type="number"
              placeholder="Price per KM"
              value={formData.pricePerKm}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Available Routes (comma-separated)"
              value={formData.availableRoutes}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="isAvailable" className="text-sm text-gray-700">Available</label>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Vehicle List */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Capacity</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Price/KM</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                {editingId === vehicle.id ? (
                  <>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="Bus">Bus</option>
                        <option value="Van">Van</option>
                        <option value="Minibus">Minibus</option>
                        <option value="Car">Car</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={formData.pricePerKm}
                        onChange={(e) => setFormData({ ...formData, pricePerKm: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={formData.isAvailable}
                        onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3 text-sm text-gray-900">{vehicle.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{vehicle.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{vehicle.capacity}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">₹{vehicle.pricePerKm}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        vehicle.isAvailable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {vehicle.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(vehicle)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(vehicle.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}