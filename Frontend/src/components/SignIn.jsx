import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Make sure to install @heroicons/react

const SignIn = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
            <div 
                className=" bg-white shadow-lg rounded-3xl p-32"
                style={{
                    width: '50vw', // 60% of the viewport width
                }}
            >
                <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
                <form className="flex flex-col space-y-6">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="border rounded-md p-4 w-full"
                    />
                    <div className="relative">
                        <input 
                            type={passwordVisible ? 'text' : 'password'} 
                            placeholder="Password" 
                            className="border rounded-md p-4 w-full pr-12"
                        />
                        <button 
                            type="button" 
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                            {passwordVisible ? (
                                <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                            ) : (
                                <EyeIcon className="h-6 w-6 text-gray-500" />
                            )}
                        </button>
                    </div>
                    <button 
                        type="submit" 
                        className="bg-slate-400 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full"
                        style={{  height :"64px" ,width: '40%' }} // Ensure button height is 44px
                    >
                        Sign In
                    </button>
                </form>
                <div className="text-center mt-6">
                    <Link to="/forgot-password" className="text-blue-500 hover:underline">
                        Forgot Your Password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
