import React from 'react';
import { Link } from 'react-router-dom';

const RegisterSensor = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
            <div 
                className="bg-white shadow-lg rounded-3xl p-12"
                style={{
                    width: '50vw', // 50% of the viewport width
                }}
            >
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Air Quality Monitoring Registration
                </h2>
                <form className="flex flex-col space-y-6">
                    <input 
                        type="text" 
                        placeholder="City" 
                        className="border rounded-md p-4 w-full"
                    />
                    <input 
                        type="text" 
                        placeholder="Street Address" 
                        className="border rounded-md p-4 w-full"
                    />
                    <input 
                        type="text" 
                        placeholder="Sensor ID" 
                        className="border rounded-md p-4 w-full"
                    />
                    <input 
                        type="text" 
                        placeholder="Location" 
                        className="border rounded-md p-4 w-full"
                    />
                    <button 
                        type="submit" 
                        className="bg-slate-400 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full"
                        style={{ height: '44px', width: '40%' }} // Ensure button height is 44px
                    >
                        Register
                    </button>
                </form>
                <div className="text-center mt-6">
                    <Link to="/signin" className="text-blue-500 hover:underline">
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterSensor;
