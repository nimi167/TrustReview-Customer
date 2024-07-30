import React from 'react'
import Star from '../Assets/Star'
import TimeAgo from '../Assets/TimeAgo'
// card for company Rating of for usable to CompaneyCard.js component  
export default function CardCompanyRating({ data }) {
    return (
        <div className='flex-shrink-0 w-64 mx-2 p-3 border rounded-md'>
            <div className="text-xs text-gray-500"><TimeAgo date={data.createdAt} /></div>
            <div className="flex my-2">
                <div className="h-7 w-7 rounded-full bg-gray-500 overflow-hidden">
                    <img src="/images/avatar-3.webp" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center ml-2">
                    <Star star={data.rating} className="w-20" />
                </div>
            </div>
            <div className="text-xs">{data.title}</div>
        </div>
    )
}
