import React from 'react';

const TableComponent = ({ data }) => {
    return (
        <div className="flex justify-center items-center w-full">
            <table className="w-full bg-[#FBF4F4] rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-4 px-6 text-left text-gray-600 font-semibold">Sensors</th>
                        <th className="py-4 px-6 text-left text-gray-600 font-semibold">SPI</th>
                        <th className="py-4 px-6 text-left text-gray-600 font-semibold">Temperature</th>
                        <th className="py-4 px-6 text-left text-gray-600 font-semibold">Humidity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="border-b border-gray-300">
                            <td className="py-4 px-6 text-gray-700">{row.sensors}</td>
                            <td className="py-4 px-6 text-gray-700">{row.spi}</td>
                            <td className="py-4 px-6 text-gray-700">{row.temperature}</td>
                            <td className="py-4 px-6 text-gray-700">{row.humidity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
