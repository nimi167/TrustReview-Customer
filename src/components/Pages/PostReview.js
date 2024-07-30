import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RatingSelector from '../Assets/RatingSelector';
import { BsPencil } from "react-icons/bs";
import config from '../../config';

export default function PostReview() {
    const { company } = useParams();
    const navigate = useNavigate();
    const [companyData, setCompanyData] = useState({});
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});
    const [remainingDescChars, setRemainingDescChars] = useState(10); // Initial remaining description characters
    const [remainingTitleChars, setRemainingTitleChars] = useState(4); // Initial remaining title characters
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`${config.baseURL}/Company/Review/${company}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                setCompanyData(data.CompanyData[0]); // Assuming this is the intended structure
            } catch (error) {
                console.error('Failed to fetch company data:', error);
            }
        };

        if (company) {
            fetchCompanyData();
        }
    }, [company]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: value.trim() ? '' : prevErrors[name]
        }));

        // Update state for input values
        switch (name) {
            case 'rating':
                setRating(value);
                break;
            case 'title':
                setTitle(value);
                const remainingTitle = 4 - value.length;
                setRemainingTitleChars(remainingTitle > 0 ? remainingTitle : 0);
                break;
            case 'description':
                setDescription(value);
                // alert(value.length)
                const remainingDesc = 10 - value.length;
                setRemainingDescChars(remainingDesc > 0 ? remainingDesc : 0);
                break;
            case 'date':
                setDate(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const companyId = companyData._id;

        // Validation
        const errors = {};
        if (!rating) errors.rating = "Rating is required.";
        if (description.length<10) errors.description = "Your review must be at least 10 characters.";
        if (title.length<4) errors.title = "Your title must be at least 4 characters.";
        if (!date) errors.date = "Please confirm when you had this experience. If you don’t know the exact date, you can estimate.";

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        
        if(userId===null){
            navigate(`/Login`)
        }
        try {
            const response = await fetch(`${config.baseURL}/Post/Review/${companyId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    companyId,
                    userId,
                    rating,
                    title,
                    description,
                    date
                })
            });

            if (response.ok) {
                setDescription("")
                setTitle("")
                setDate("")
                navigate(`/review/${company}`)
                console.log('Review submitted successfully:');
            } else {
                console.log('Something went wrong');
            }
        } catch (error) {
            console.error('Failed to submit review:', error);
        }
    };

    return (
        <div className='bg-Creem min-h-[91vh]'>
            <div className="bg-white border flex justify-center py-3">
                <div className="w-[520px]">
                    <div className="flex items-center">
                        <img src="/images/profile.png" alt="" className='h-14' />
                        <div className="flex flex-col">
                            <span className='ml-3 text-[16px] font-bold leading-3'>{companyData.companyName}</span>
                            <a href="/" className='text-Gray text-sm  ml-3'>{company}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center py-3">
                <div className="bg-white border rounded w-[520px] pt-3 pb-4 px-4">
                    <div className="">
                        <form onSubmit={handleSubmit}>
                            <div className=' text-[16px] font-bold leading-3 my-2'>Rate your recent experience</div>
                            <RatingSelector squareWidth={34} squareHeight={34} onRatingChange={setRating} />
                            {errors.rating && <div className="text-xs text-red-500">{errors.rating}</div>}
                           
                            {rating !== 0 && (
                            <div className="">
                                <div className=' text-[16px] font-bold my-[10px]'>Tell us more about your experience</div>
                                <div className=' text-Blue underline text-sm hover:no-underline'>Read our Guidelines for Reviewers</div>
                                <div className='mt-3 mb-2'>
                                    <textarea
                                        className={`border-1px-solid-black rounded px-3 py-2 w-100`}
                                        placeholder="What did you like or dislike? What is  this company doing well, or how can they improve? Remember to be honest, and constructive! "
                                        value={description}
                                        onChange={handleInputChange}
                                        name="description"
                                        rows="6"
                                    />
                                    {errors.description ? <div className="text-xs text-red-500">{errors.description}</div>
                                    : remainingDescChars > 0 && <span className="text-[13px] text-Gray">Type {remainingDescChars} more characters.</span>}
                                </div>
                                <div className='text-Blue underline text-sm hover:no-underline'>How to write a useful review</div>
                                <div className=''>
                                    <div className=' text-[16px] font-bold mt-3'>Give your review a title</div>
                                    <div className="flex border-1px-solid-black rounded overflow-hidden">
                                        <div className="w-[90%]">
                                            <input
                                                type="text"
                                                className='py-2 px-3 w-100 border-none outline-none text-sm'
                                                placeholder="What's important for people to know?"
                                                value={title}
                                                onChange={handleInputChange}
                                                name="title"
                                            />
                                        </div>
                                        <div className="border-l-1px-solid-black  w-[10%] flex justify-center items-center bg-[#e3e4e4]">
                                            <BsPencil size={20} className='text-Gray hover:text-black' />
                                        </div>
                                    </div>
                                    {errors.title ? <div className="text-xs text-red-500">{errors.title}</div>
                                    : remainingTitleChars > 0 && <span className="text-[13px] text-Gray">Type {remainingTitleChars} more characters.</span>}
                                </div>

                                <div className=''>
                                    <div className=' text-[16px] font-bold mt-3 '>Date of experience</div>
                                    <div className="flex border-1px-solid-black rounded overflow-hidden">
                                        <div className="w-100">
                                            <input
                                                type="date"
                                                className='py-2 px-3 w-100 border-none outline-none text-xs'
                                                value={date}
                                                onChange={handleInputChange}
                                                name="date"
                                            />
                                        </div>
                                    </div>
                                    {errors.date && <div className="text-xs text-red-500">{errors.date}</div>}
                                </div>
                                <p className="text-[13px] leading-4 mt-4">By submitting this review, you confirm it’s <a href='123' className='text-Blue underline text-sm hover:no-underline'>based on a genuine experience</a> and you haven’t received an incentive to write it.</p>
                                <div className="">
                                    <button type="submit" className='blueBtn w-100 py-2 rounded-full mt-3'>Submit review</button>
                                </div>
                            </div>
                           )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}