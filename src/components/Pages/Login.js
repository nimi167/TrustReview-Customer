import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import GoogleSignInButton from '../GoogleLogin/GoogleSignInButton';
import config from '../../config';

export default function Login() {
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isTnc: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, isTnc } = formData;
        try {
            const response = await fetch(`${config.baseURL}/Signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, isTnc })
            });
            if (response.status === 401) {
                alert("Invalid credentials")
            }

            if (response.ok) {
                const data = await response.json();
                if (data.authToken) {
                    console.log("Login or Signup Successfully")
                    localStorage.setItem('userName', data.data.name);
                    localStorage.setItem('userId', data.data._id);
                    localStorage.setItem('token', data.authToken);
                    navigate('/');
                    setFormData({
                        email: '',
                        password: ''
                    })
                }
            } else {
                alert('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            alert(error.message || 'Signup failed.');
            console.error('Signup failed:', error);
        }
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div className='bg-Creem'>
                <div className="flex justify-center">
                    <h3 className='font-black text-xl lg:text-3xl mt-4 px-3'>Read reviews. Write reviews. Find companies.</h3>
                </div>
                <div className="flex justify-center mt-4 m-2">
                    <div className="bg-white rounded border w-[500px] px-14 sm:px-28 py-5 text-center font-bold">
                        {/* Log in or sign up below */}
                        <GoogleSignInButton />

                        <div className="border flex items-center  blueBtn rounded-full my-2 py-2 hover:cursor-pointer"><FaFacebook size={23} className='w-[10%] ms-2' /> <span className='w-[90%] text-center' >continue with Facebook</span></div>
                        <div className="border flex items-center font-normal bg-black text-white rounded-full my-2 py-2 hover:cursor-pointer"><FaApple size={23} className='w-[10%] ms-2' /> <span className='w-[90%] text-center'>continue with Apple</span></div>
                        <div className="font-normal text-Blue underline hover:no-underline cursor-pointer" onClick={() => setShowForm(!showForm)}>
                            continue with email
                        </div>
                        {showForm && (
                            <form onSubmit={handleSubmit}>
                                <div className="text-start font-normal text-xs">Email</div>
                                <input type="email" name="email" className='font-normal border-1px-solid-black rounded-md px-3 py-2 text-sm w-100' placeholder='your@email.com' value={formData.email} required onChange={handleInputChange} />
                                {formData.email &&
                                    <>
                                        <div className="text-start font-normal text-xs mt-2">Name</div>
                                        <input type="text" name="name" className='font-normal border-1px-solid-black rounded-md px-3 py-2 mb-2 text-sm w-100' placeholder='Enter Your Name' value={formData.name} required onChange={handleInputChange} />
                                        <input type="password" name="password" className='font-normal border-1px-solid-black rounded-md px-3 py-2 text-sm w-100' placeholder='Enter Strong Password' value={formData.password} required onChange={handleInputChange} />
                                        <div className="flex">
                                            <div>
                                                <input type="checkbox" name="isTnc" className='font-normal' checked={formData.isTnc} onChange={handleInputChange} />
                                            </div>
                                            <div className="ms-1 text-start text-sm text-Gray font-semibold">term and condition</div>
                                        </div>
                                    </>
                                }

                                <button type="submit" className="blueBtn rounded-full text-sm font-bold w-100 py-[10px] mt-2">Continue with email</button>
                            </form>
                        )}
                    </div>
                </div>
                <div className="flex justify-center text-center py-5">
                    <div>
                        <h3 className='font-black text-3xl'>Are you a business?</h3>
                        <h3 className='text-Gray my-3 text-[13px]'>Set up your business account on TrustReview-Customer for free</h3>
                        <div className="sm:flex justify-center">
                            <button type="button" className="blueBtn rounded-full text-xs px-3  py-[10px] my-1 sm:py-[6px] mx-2 w-100 sm:w-auto">Log in</button>
                            <button type="button" className="BorderBlue rounded-full text-xs px-3  py-[10px] my-1 sm:py-[6px] mx-2 w-100 sm:w-auto">Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
