import React from 'react';

const StockMetrics = ({ data }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="bg-gray-900 text-white p-4 rounded-lg shadow">
          <h4 className="text-sm font-medium uppercase text-gray-400">{key}</h4>
          <p className="text-xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default StockMetrics;
