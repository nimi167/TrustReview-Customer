import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import config from '../../config';

const GoogleSignInButton = () => {
    const Google_Auth_Url =  process.env.Google_Auth_Url
    const navigate = useNavigate();

    const login = useGoogleLogin({
        clientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);

            // Extract access token from response
            const accessToken = tokenResponse.access_token;

            try {
                // Make a request to Google API to fetch user information
                const userInfoResponse = await fetch(`${Google_Auth_Url}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                if (!userInfoResponse.ok) {
                    throw new Error('Failed to fetch user info');
                }

                const userInfo = await userInfoResponse.json();
                console.log('User Info:', userInfo);

                // signup api call
                const userData = {
                    name: userInfo.name,
                    email: userInfo.email,
                    password: "G-Auth",
                    // picture: userInfo.picture,
                    isTnc: userInfo.email_verified
                };
                const response = await fetch(`${config.baseURL}/Signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.authToken) {
                        console.log(data)

                        localStorage.setItem('userName', data.data.name);
                        localStorage.setItem('userId', data.data._id);
                        localStorage.setItem('token', data.authToken);
                        navigate('/');
                    } else {
                        throw new Error('Authentication failed');
                    }
                } else if (response.status === 400) {
                    const data = await response.json();
                    throw new Error(`User Already Exists with this Email: ${data.message}`);
                } else {
                    throw new Error(`Error during Google login: ${response.statusText}`);
                }

            } catch (error) {
                console.error('Failed to fetch user info:', error);
                alert('Failed to fetch user info. Please try again.');
            }
        },
        onError: () => {
            console.log('Login Failed');
            alert('Login failed. Please try again.');
        }
    });

    return (
        <div className="border flex items-center  rounded-full my-2 py-2 hover:cursor-pointer" onClick={login}>
            <FcGoogle size={23} className='w-[10%] ms-2' /> <span className='w-[90%] text-center' >continue with Google</span>
        </div>
    );
};

export default GoogleSignInButton;
