import React from 'react';

export function FileUploader({ label, onChange, icon, buttonColor }) {
  const colorClasses = {
    red: 'file:bg-red-50 file:text-red-700 hover:file:bg-red-100',
    green: 'file:bg-green-50 file:text-green-700 hover:file:bg-green-100'
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <div className="mb-4">{icon}</div>
      <label className="block">
        <span className="text-gray-700 font-medium">{label}</span>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={onChange}
          className={`block w-full text-sm text-gray-500 mt-2
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            ${colorClasses[buttonColor]}`}
        />
      </label>
    </div>
  );
}