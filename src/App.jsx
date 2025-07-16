import React from 'react';
import Toolbar from './components/Toolbar';
import Spreadsheet from './components/Spreadsheet';

export default function App() {
  return (
    <div className="max-w-full h-screen bg-platinum-50 mx-auto border border-gray-300 overflow-hidden flex flex-col">
      <Toolbar />
      <Spreadsheet />
    </div>
  );
}