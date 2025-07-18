import React, { useEffect, useState } from "react";
import { Edit, Trash2, Plus, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addVehicleAsync,
  deleteVehiclesAsync,
  getAllVehicles,
  updateVehiclesAsync,
} from "../store/globalAction";
import { vehicleDataSelector } from "../store/globalSelector";

export default function AdminVehicleManagement({
  
  loading = false,
  
}) {
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVehicles());
  }, [dispatch]);
  
  const vehicles = useSelector(vehicleDataSelector);

  const [formData, setFormData] = useState({
    name: "",
    capacityKg: "",
    tyres: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      capacityKg: "",
      tyres: "",
    });
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle._id);
    setFormData({
      name: vehicle.name,
      capacityKg: vehicle.capacityKg,
      tyres: vehicle.tyres,
    });
    // Don't dispatch update here - only when saving
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.capacityKg || !formData.tyres) {
      toast.error("All fields are required");
      return;
    }

    const vehicleData = {
      name: formData.name,
      capacityKg: parseInt(formData.capacityKg),
      tyres: parseInt(formData.tyres),
    };

    if (editingId) {
      // Update existing vehicle
      dispatch(updateVehiclesAsync({ id: editingId, ...vehicleData }))
        .unwrap()
        .then(() => {
          toast.success("Vehicle updated successfully");
          setEditingId(null);
          resetForm();
        })
        .catch((error) => {
          toast.error(error.message || "Failed to update vehicle");
        });
    } else {
      // Add new vehicle
      dispatch(addVehicleAsync(vehicleData))
        .unwrap()
        .then(() => {
          toast.success("Vehicle added successfully");
          setShowAddForm(false);
          resetForm();
        })
        .catch((error) => {
          toast.error(error.message || "Failed to add vehicle");
        });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      dispatch(deleteVehiclesAsync(id))
        .unwrap()
        .then(() => {
          toast.success("Vehicle deleted successfully");
        })
        .catch((error) => {
          toast.error(error.message || "Failed to delete vehicle");
        });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Vehicle Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          disabled={showAddForm || editingId}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-5 w-5" />
          Add Vehicle
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Add New Vehicle
          </h3>
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Vehicle Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter vehicle name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Capacity in KG */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Capacity (KG) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="capacityKg"
                  placeholder="Enter capacity in kg"
                  value={formData.capacityKg}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Number of Tyres */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Tyres <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="tyres"
                  placeholder="Enter number of tyres"
                  value={formData.tyres}
                  onChange={handleChange}
                  min="2"
                  max="18"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Save className="h-4 w-4" />
                Save Vehicle
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2 shadow-sm"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Vehicle List */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Vehicle Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Capacity (KG)
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Tyres
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <tr
                key={vehicle._id}
                className="hover:bg-gray-50 transition-colors"
              >
                {editingId === vehicle._id ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        name="capacityKg"
                        value={formData.capacityKg}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        name="tyres"
                        value={formData.tyres}
                        onChange={handleChange}
                        min="2"
                        max="18"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors"
                          title="Save changes"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 p-2 rounded-md transition-colors"
                          title="Cancel editing"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {vehicle.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {vehicle.capacityKg} kg
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {vehicle.tyres}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(vehicle)}
                          disabled={editingId !== null || showAddForm}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Edit vehicle"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(vehicle._id)}
                          disabled={editingId !== null || showAddForm}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete vehicle"
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

      {vehicles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0M15 17a2 2 0 104 0" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium">No vehicles found</p>
          <p className="text-gray-400 text-sm mt-2">
            Click "Add Vehicle" to get started with managing your fleet
          </p>
        </div>
      )}
    </div>
  );
}