import React, { useEffect } from "react";
import { Users, Clock, MapPin, DollarSign, Truck } from "lucide-react";
import LoadingButton from "./LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllVehicles } from "../store/globalAction";
import { vehicleDataSelector } from "../store/globalSelector";

export default function VehicleResults({ loading = false }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVehicles());
  }, [dispatch]);

  const vehicles = useSelector(vehicleDataSelector);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Searching for vehicles...
        </h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="h-5 w-5 bg-gray-300 rounded mr-2"></div>
                    <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                    <div className="ml-2 h-5 w-16 bg-gray-300 rounded"></div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="flex items-center">
                        <div className="h-4 w-4 bg-gray-300 rounded mr-1"></div>
                        <div className="h-4 bg-gray-300 rounded flex-1"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-10 w-24 bg-gray-300 rounded ml-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Searching for vehicles...
        </h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="h-5 w-5 bg-gray-300 rounded mr-2"></div>
                    <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                    <div className="ml-2 h-5 w-16 bg-gray-300 rounded"></div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="flex items-center">
                        <div className="h-4 w-4 bg-gray-300 rounded mr-1"></div>
                        <div className="h-4 bg-gray-300 rounded flex-1"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-10 w-24 bg-gray-300 rounded ml-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (vehicles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-gray-500">
          <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No vehicles found matching your criteria.</p>
          <p className="text-sm mt-2">Try adjusting your search filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Available Vehicles
      </h2>

      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Truck className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {vehicle.name}
                  </h3>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {vehicle.tyres}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{vehicle.capacityKg} passengers</span>
                  </div>
                 
                   
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-4">
                <LoadingButton
                  onClick={() => onBookVehicle(vehicle)}
                  variant="success"
                  className="w-full md:w-auto"
                  loading={loading}
                >
                  Book Now
                </LoadingButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
