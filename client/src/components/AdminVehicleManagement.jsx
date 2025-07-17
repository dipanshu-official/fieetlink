import React, { useState } from "react";
import { Edit, Trash2, Plus, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addVehicleAsync } from "../store/globalAction";

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
  const dispatch = useDispatch();
  const [vehicles, setVehicles] = useState([
    {
      id: "1",
      name: "Toyota Hiace",
      capacityKg: 1200,
      tyres: 4,
    },
    {
      id: "2",
      name: "Tata Winger",
      capacityKg: 1500,
      tyres: 4,
    },
    {
      id: "3",
      name: "Mahindra Bolero",
      capacityKg: 800,
      tyres: 4,
    },
  ]);

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
    setEditingId(vehicle.id);
    setFormData({
      name: vehicle.name,
      capacityKg: vehicle.capacityKg.toString(),
      tyres: vehicle.tyres.toString(),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.capacityKg || !formData.tyres) {
      toast.error("All fields are required");
      return;
    }

    const vehicleData = {
      name: formData.name,
      capacityKg: parseInt(formData.capacityKg),
      tyres: parseInt(formData.tyres),
    };
    dispatch(addVehicleAsync(vehicleData))


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
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      onDeleteVehicle(id);
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
          disabled={showAddForm}
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
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Save className="h-4 w-4" />
              Save Vehicle
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2 shadow-sm"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
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
                key={vehicle.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {editingId === vehicle.id ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors"
                          title="Edit vehicle"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(vehicle.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors"
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
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No vehicles found</p>
          <p className="text-gray-400 text-sm mt-2">
            Click "Add Vehicle" to get started
          </p>
        </div>
      )}
    </div>
  );
}
