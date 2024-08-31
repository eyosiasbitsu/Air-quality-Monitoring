import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import TableComponent from './TableComponent';

const DashboardLayout = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const tableData = [
        { sensors: "Sensor 1", spi: "Value 1", temperature: "Value 2", humidity: "Value 3", location: "Location 1", city: "City 1" },
        { sensors: "Sensor 2", spi: "Value 4", temperature: "Value 5", humidity: "Value 6", location: "Location 2", city: "City 2" },
        { sensors: "Sensor 3", spi: "Value 7", temperature: "Value 8", humidity: "Value 9", location: "Location 1", city: "City 3" },
        { sensors: "Sensor 4", spi: "Value 10", temperature: "Value 11", humidity: "Value 12", location: "Location 3", city: "City 1" },
        { sensors: "Sensor 5", spi: "Value 13", temperature: "Value 14", humidity: "Value 15", location: "Location 2", city: "City 2" },
        { sensors: "Sensor 6", spi: "Value 16", temperature: "Value 17", humidity: "Value 18", location: "Location 3", city: "City 3" }
    ];

    const filteredData = tableData.filter(row => 
        (selectedLocation ? row.location === selectedLocation : true) &&
        (selectedCity ? row.city === selectedCity : true) &&
        (searchText ? row.sensors.toLowerCase().includes(searchText.toLowerCase()) : true)
    );

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start p-8 font-[Prata]">
            <div className="w-4/5 flex items-start space-x-4">
                {/* Left Column */}
                <div className="flex flex-col w-60">
                    <div className="text-4xl font-bold mb-2">
                        <Link to="/">Air Quality Monitoring</Link>
                    </div>
                    {/* Search Section */}
                    <div className="flex flex-col space-y-2 pt-10">
                        <div className="flex flex-col space-y-2">
                            <select 
                                className="border rounded-md p-2"
                                value={selectedLocation} 
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <option value="">Select Location</option>
                                <option value="Location 1">Location 1</option>
                                <option value="Location 2">Location 2</option>
                                <option value="Location 3">Location 3</option>
                            </select>
                            <input 
                                type="text" 
                                className="border rounded-md p-2 w-full" 
                                placeholder="Search by Sensor ID"
                                value={searchText} 
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <select 
                                className="border rounded-md p-2"
                                value={selectedCity} 
                                onChange={(e) => setSelectedCity(e.target.value)}
                            >
                                <option value="">Select City</option>
                                <option value="City 1">City 1</option>
                                <option value="City 2">City 2</option>
                                <option value="City 3">City 3</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Center Column */}
                <div className="w-4/5">
                    <Outlet context={{ filteredData }} />
                </div>
                {/* Right Column */}
                <div className="w-1/10 flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Add Sensors
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
