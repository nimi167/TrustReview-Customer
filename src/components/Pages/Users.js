import React, { useCallback, useEffect, useState } from 'react'
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GoCheckCircleFill } from "react-icons/go";
import ProfilePicture from '../Assets/ProfilePicture'
import Star from '../Assets/Star';
import TimeAgo from '../Assets/TimeAgo';
import { Link } from 'react-router-dom';
import LikeBtn from '../Assets/LikeBtn';
import SavedBtn from '../Assets/SavedBtn';
import Share from '../Assets/Share';
import config from '../../config';
export default function Users() {
    const [companyReviews, setCompanyReviews] = useState([]);
    const [useful, setUseful] = useState(0);
    const [UserData, setUserData] = useState([]);
    const userId = localStorage.getItem('userId');
   
    const fetchCompanyReviews = useCallback(async () => {
        try {
            const response = await fetch(`${config.baseURL}/Get/User/Review/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data.User[0]);
            setCompanyReviews(data.reviews);
            setUseful(data.totalLikes);
        } catch (error) {
            console.error('Failed to fetch company reviews:', error);
        }
    }, [userId]);

    useEffect(() => {
        fetchCompanyReviews();
    }, [fetchCompanyReviews]);

    return (
        <div>
            <div className="border-bottom p-4 bg-white">
                <div className="container">
                    <div className="md:flex flex-wrap justify-between">
                        {/* Left Side Content */}
                        <div className="flex justify-center p-4">
                            <div className="flex items-center justify-center">
                                <ProfilePicture name={UserData && UserData.name ? UserData.name : "User Name"} size="lg" />
                            </div>
                            <div className="ps-3 flex flex-col justify-evenly">
                                <div className="font-black text-2xl">{UserData && UserData.name ? UserData.name : "User Name"}</div>
                                <div className="text-Gray ">{UserData && UserData.country ? UserData.country : "India"}</div>
                            </div>
                        </div>

                        {/* Right sidebar */}
                        <div className="flex items-center justify-between">
                            <div className="mx-3">
                                <div className="font-bold text-4xl text-center">{companyReviews ? companyReviews.length : 0}</div>
                                <div className="text-Blue underline decoration-dashed underline-offset-4 font-semibold text-sm flex items-center">
                                    <svg viewBox="0 0 16 16" fill="blue" className="me-1" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px"><path fillRule="evenodd" clipRule="evenodd" d="m8 9.382 1.813 1.398-.694-2.243 1.936-1.485H8.66L8 4.902l-.661 2.15H4.945l1.936 1.485-.694 2.243L8 9.382ZM4.3 13.5l1.42-4.593L2 6.052h4.6L8 1.5l1.4 4.552H14l-3.72 2.855L11.7 13.5 8 10.645 4.3 13.5Z"></path></svg>Reviews</div>
                            </div>
                            <div className="mx-3">
                                <div className="font-bold text-4xl text-center">0</div>
                                <div className="text-Blue underline decoration-dashed underline-offset-4 font-semibold text-sm flex items-center">
                                    <svg viewBox="0 0 16 16" fill="blue" className="me-1" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px"><path fillRule="evenodd" clipRule="evenodd" d="M8 3.125c-2.319 0-4.274 1.177-5.621 2.304a14.108 14.108 0 0 0-2.01 2.077 7.83 7.83 0 0 0-.141.19l-.008.011-.003.004v.001L0 8l.216.288.001.001.003.004.008.011a4.571 4.571 0 0 0 .142.19 14.111 14.111 0 0 0 2.01 2.077c1.346 1.127 3.301 2.304 5.62 2.304s4.274-1.177 5.621-2.304a14.107 14.107 0 0 0 2.009-2.077 7.81 7.81 0 0 0 .142-.19l.008-.011.003-.004v-.001L16 8l-.216-.288-.001-.001-.003-.004-.008-.011a4.367 4.367 0 0 0-.142-.19 14.104 14.104 0 0 0-2.009-2.077C12.274 4.302 10.319 3.125 8 3.125ZM1.55 8.356A11.604 11.604 0 0 1 1.254 8 13.107 13.107 0 0 1 3.02 6.196C4.287 5.136 6.019 4.125 8 4.125c1.981 0 3.713 1.01 4.979 2.07A13.103 13.103 0 0 1 14.746 8a13.103 13.103 0 0 1-1.767 1.804c-1.266 1.06-2.998 2.071-4.979 2.071-1.981 0-3.713-1.01-4.979-2.07a13.107 13.107 0 0 1-1.47-1.449Zm3.95-.481a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm2.5-3.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"></path></svg>
                                    Reads</div>
                            </div>
                            <div className="mx-3">
                                <div className="font-bold text-4xl text-center">{useful ? useful : 0}</div>
                                <div className="text-Blue underline decoration-dashed underline-offset-4 font-semibold text-sm flex items-center">
                                    <svg viewBox="0 0 16 16" fill="blue" className="me-1" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px"><path fillRule="evenodd" clipRule="evenodd" d="M7.94.94A1.5 1.5 0 0 1 10.5 2a20.774 20.774 0 0 1-.384 4H14.5A1.5 1.5 0 0 1 16 7.5v.066l-1.845 6.9-.094.095A1.5 1.5 0 0 1 13 15H9c-.32 0-.685-.078-1.038-.174-.357-.097-.743-.226-1.112-.349l-.008-.003c-.378-.126-.74-.246-1.067-.335C5.44 14.047 5.18 14 5 14v.941l-5 .625V6h5v.788c.913-.4 1.524-1.357 1.926-2.418A10.169 10.169 0 0 0 7.5 1.973 1.5 1.5 0 0 1 7.94.939ZM8 2l.498.045v.006l-.002.013a4.507 4.507 0 0 1-.026.217 11.166 11.166 0 0 1-.609 2.443C7.396 5.951 6.541 7.404 5 7.851V13c.32 0 .685.078 1.038.174.357.097.743.226 1.112.349l.008.003c.378.126.74.246 1.067.335.335.092.594.139.775.139h4a.5.5 0 0 0 .265-.076l1.732-6.479A.5.5 0 0 0 14.5 7H8.874l.138-.61c.326-1.44.49-2.913.488-4.39a.5.5 0 0 0-1 0v.023l-.002.022L8 2ZM4 7H1v7.434l3-.375V7Zm-1.5 5.75a.25.25 0 1 0 0-.5.25.25 0 0 0 0 .5Zm-.75-.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z"></path></svg>
                                    Useful</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-Creem p-4">
                <div className="container flex justify-center">
                    {companyReviews.length === 0 ?
                        <div className="w-[520px] mt-3 mb-24 ">
                            <div className="">
                                <div className="font-bold text-2xl">Write your first review</div>
                                <div className="text-md leading-5 my-2">Share your experience! Your feedback will empower others to shop with confidence and help companies improve.</div>
                                <div className="">
                                    <Link to="/Categories">
                                        <button className='blueBtn px-4 py-[10px] rounded-full font-bold mt-3'>Find a Company</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="w-[520px] mt-3 mb-24">
                            <div className="rounded">
                                <div className="flex flex-wrap">
                                    {/* Left Side Content */}
                                    {companyReviews.map((review, index) => (
                                        <div key={index} className="bg-white rounded border p-4 w-100 my-3">
                                            <div className="flex border-b pb-3">
                                                <div className="">
                                                    <ProfilePicture name={review.companyId.companyName} />
                                                </div>
                                                <div className="ms-2">
                                                    <div className="text-sm font-bold">{review.companyId.companyName}</div>
                                                    <div className="text-sm text-Gray">{review.companyId.review} reviews</div> {/* todo */}
                                                </div>
                                                <div className="ms-3 flex items-end ">
                                                    <HiOutlineLocationMarker size={17} className='text-Gray  mb-[2px]' />
                                                    <span className='text-sm text-Gray ms-1 p-0 '>{review.companyId.country}</span>  {/* todo */}
                                                </div>
                                            </div>

                                            <div className="flex justify-between mt-3 pb-3">
                                                <div className="flex">
                                                    <div className="w-28"><Star star={review.rating} /></div>
                                                    {review.verified &&
                                                        <div className="flex align-middle items-center text-Gray text-[13px] ps-3">
                                                            <GoCheckCircleFill size={15} className='me-1' />Verified
                                                        </div>
                                                    }
                                                </div>
                                                <div className="text-Gray text-sm"><TimeAgo date={review.createdAt} /></div>
                                            </div>

                                            <div className="border-b">
                                                <div className="font-bold hover:underline">{review.title}</div>
                                                <div className="text-[15px]">
                                                    <p className='my-3'>{review.description}</p>
                                                </div>
                                                <div className="mb-3">
                                                   
                                                </div>
                                            </div>

                                            <div className="flex justify-between mt-3 ">
                                                <div className="flex">
                                                    <div className="w-20 flex items-center text-Gray text-sm hover:text-gray-800">
                                                        <LikeBtn review={review} fetchCompanyReviews={fetchCompanyReviews} />
                                                    </div>
                                                    <div className="flex align-middle items-center text-Gray text-sm px-2 hover:text-gray-900">
                                                        <Share />
                                                    </div>
                                                </div>
                                                <div className="text-Gray text-sm"><SavedBtn review={review} fetchCompanyReviews={fetchCompanyReviews} /></div>
                                            </div>
                                        </div>
                                    ))}
                                  
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
