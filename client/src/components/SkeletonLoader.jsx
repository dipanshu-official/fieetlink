import React from 'react';



export default function SkeletonLoader({ type, count = 1 }) {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="flex items-center mb-4">
              <div className="h-6 w-6 bg-gray-300 rounded mr-3"></div>
              <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="mt-4 h-10 bg-gray-300 rounded"></div>
          </div>
        );

      case 'table':
        return (
          <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="h-4 bg-gray-300 rounded flex-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'form':
        return (
          <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-10 bg-gray-300 rounded"></div>
          </div>
        );

      case 'search-results':
        return (
          <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
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

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
}