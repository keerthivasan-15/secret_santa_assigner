import React from 'react';
import { Gift } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-8">
      <Gift className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Secret Santa Assigner</h1>
    </div>
  );
}