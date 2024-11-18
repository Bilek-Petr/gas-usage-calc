import React from 'react';

const GasInput: React.FC = () => {
   return (
      <div className="fuel-calculator p-4 bg-white shadow rounded ">
         <h2>Fuel Consumption</h2>
         <div className="flex">
            <label htmlFor="fuelConsumption">Fuel Consumption (L/100km):</label>
            <input id="fuelConsumption" type="number" className="border p-2" />
         </div>
         <div className="flex">
            <label htmlFor="fuelCost">Fuel Cost (per Liter):</label>
            <input id="fuelCost" type="number" className="border p-2" />
         </div>
         <button className="bg-blue-500 text-white p-2 mt-2 rounded">Calculate</button>
      </div>
   );
};

export default GasInput;
