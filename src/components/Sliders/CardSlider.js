import React, { useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Star from '../Assets/Star';

// text and image card slider for home screen  
export default function CardSlider() {
    const slider = useRef(null)

    const data = [
        {
            title: "Fixed my broke fone. But I still can't get a date on Tinder.",
            star: 5,
            img: "broken-phone-review.webp",
            Name1: "Max",
            Name2: "Re-Tech"
        },
        {
            title: "The first birthday gift my wife didn't want to return.",
            star: 5,
            img: "dog-gift-review.webp",
            Name1: "Robert",
            Name2: "Songfinch"
        },
        {
            title: "Gonna love making my flat a small jungle :)",
            star: 5,
            img: "plant-shopping-review.webp",
            Name1: "Marjori",
            Name2: "Patch"
        },
    ];
    const settings = {
        className: "",
        centerMode: false,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 1,
        speed: 0,
        rows: 1,
        arrows: false,
        slidesPerRow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1290,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 1120,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    dots: true,
                    speed: 200
                }
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    speed: 200
                }
            }
        ]
    };
    return (
        <div className="relative">

            <button className='slider-btn  absolute left-[-50px] top-1/2 transform -translate-y-1/2 ms-3.5 border p-2 rounded-full rotate-180 bg-SBlue' onClick={() => slider.current.slickPrev()}>
                <span className="typography_heading-xxs__zFHFb typography_appearance-inherit__v_p92 typography_disableResponsiveSizing__bwDBg button_buttonText__uSidG">
                    <svg viewBox="0 0 16 16" className="icon_icon__8DZ1e icon_appearance-default__QHbW_" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.51 7.776 3.953 2.158l.65-.759 7.444 6.377-7.443 6.382-.651-.759 6.557-5.623Z"></path>
                    </svg>
                </span>
            </button>

            <button className='slider-btn absolute right-[-40px] top-1/2 transform -translate-y-1/2 border p-2 rounded-full bg-SBlue' onClick={() => slider.current.slickNext()}>
                <svg viewBox="0 0 16 16" className="icon_icon__8DZ1e icon_appearance-default__QHbW_" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.51 7.776 3.953 2.158l.65-.759 7.444 6.377-7.443 6.382-.651-.759 6.557-5.623Z"></path>
                </svg>
            </button>



            <div className="mt-2 relative">
                <Slider ref={slider} {...settings}>
                    {data.map((d, index) => (
                        <div key={index} className="card bg-white p-0 border-0" >
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-1/2 md:order-2 order-1">
                                    <div className="card-body py-[20px] px-[25px] md:py-16 md:px-20 h-full">
                                        <Star star={d.star} className='w-[200px]' />
                                        <h3 className='text-xl md:text-4xl font-black text-black mt-3 md:mt-[40px]'>{d.title}</h3>
                                        <div className="mt-3">
                                            <p className='font-bold'>
                                                {d.Name1} <span className='opacity-70'>experienced</span> {d.Name2}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 md:order-1 order-2">
                                    <img src={`/images/${d.img}`} className="h-full w-full object-cover" alt="..." />
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>

    );
}
