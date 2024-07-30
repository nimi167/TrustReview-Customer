import React, { useState } from 'react';
import Star from '../Assets/Star';
import { CiGlobe } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import FlagMostRelevant from '../Assets/FlagMostRelevant';
import CardCompanyRating from './CardCompanyRating';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

// company card of best companies of category
const CompaneyCard = ({ data, image, category }) => {
    const [expanded, setExpanded] = useState(false);
    // console.log(data.Reviews)
    const handleExpandClick = (event) => {
        event.preventDefault()
        setExpanded(!expanded);
    };

    return (
        <>
            <Link to={`/review/${data.workEmail}`}>
                <div className="relative pt-3 pb-2 overflow-hidden border bg-white rounded-lg my-2 cardShadow">
                    {data.rating > 4 && <FlagMostRelevant />}
                    <div className="row border-b">
                        <div className="col-3  col-xl-2 ">
                            <img src={image} className='w-100' alt="..." />
                        </div>
                        <div className="col-9  col-xl-10 pb-lg-4">
                            <div className="font-bold text-[1rem]">{data.companyName}</div>
                            {
                                data.rating !== 0 && (
                                    <div className="row my-1">
                                        <div className="w-32">
                                            <Star star={data.rating} />
                                        </div>
                                        <div className="w-32 border-e-2 h-5 text-[13px] leading-5 text-Gray">
                                            TrustScore {data.rating}
                                        </div>
                                        <div className="w-32 text-[13px] leading-5 text-Gray">
                                            {data.review} reviews
                                        </div>
                                    </div>
                                )
                            }
                            <div className="text-[13px] leading-5 text-Gray">
                            {data.city&&<span>{data.city},</span>} {data.country}
                            </div>

                        </div>
                        <div className="flex items-center text-[11px] overflow-hidden m-2">
                            <div className="flex md:hidden items-center text-[12px] overflow-hidden">
                                <span className="flex-shrink-0 flex">
                                    {category.map((cat, index) => (
                                        <React.Fragment key={index}>
                                            {cat}
                                            {index < category.length - 1 && ' · '}
                                        </React.Fragment>
                                    ))}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between pt-[14px] px-3 ">
                        <div className=" flex border-e-2 ">
                            <CiGlobe size={19} className='mx-[4px]' />
                            <MdOutlineMail size={18} className='mx-[4px]' />
                            <FiPhone size={17} className='mx-[4px]' />
                        </div>
                        <div className="flex items-center text-[11px] overflow-hidden">
                            <div className="hidden md:flex items-center text-[12px] overflow-hidden">
                                <span className="flex-shrink-0 flex">
                                    {category.map((cat, index) => (
                                        <React.Fragment key={index}>
                                            {cat}
                                            {index < category.length - 1 && ' · '}
                                        </React.Fragment>
                                    ))}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center text-Blue p-0 text-xs" onClick={handleExpandClick}>
                            {data.Reviews[0] && (
                                <>
                                    <span className="flex-shrink-0 flex-grow-0 flex">
                                        Latest reviews
                                    </span>
                                    <IconButton
                                        aria-label="expand"
                                        size="small"
                                        style={{ transition: 'transform 0.2s', padding: "0", margin: "1" }}
                                        className={expanded ? 'transform rotate-180 ' : ''}
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </>
                            )}
                        </div>
                    </div>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Card className='shadow-none'>
                            <div className="mt-3 pb-2 flex overflow-x-auto">
                                {data.Reviews.map((review, index) => (
                                    <CardCompanyRating data={review}/>
                                ))}
                            </div>
                        </Card>
                    </Collapse>
                </div>
            </Link>

        </>

    );
};

export default CompaneyCard;