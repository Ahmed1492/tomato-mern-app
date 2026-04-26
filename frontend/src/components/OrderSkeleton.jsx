import React from 'react';

const OrderSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-2xl"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="h-5 bg-gray-200 rounded w-16 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-12"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-48"></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="flex gap-2">
            <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
            <div className="h-8 bg-gray-200 rounded-lg w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-200 rounded-2xl p-4 animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-12 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
      ))}
    </div>
  );
};

const TimelineSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
      
      <div className="flex items-center gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { OrderSkeleton, StatsSkeleton, TimelineSkeleton };