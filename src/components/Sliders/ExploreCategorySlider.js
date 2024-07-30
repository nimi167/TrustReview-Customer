import React, { useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

export default function ExploreCategorySlider() {
    const slider = useRef(null);
    const [isFirstSlide, setIsFirstSlide] = useState(true);
    const [isLastSlide, setIsLastSlide] = useState(false);

    const data = [
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/pet_store.svg",
            text: "Animals & Pets"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/banks.svg",
            text: "Bank"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/travel_insurance.svg",
            text: "Travel Insurance Company"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/car_dealer.svg",
            text: "Car Dealer"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/furniture_store.svg",
            text: "Furniture Store"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/jewelry_store.svg",
            text: "Jewelry Store"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/clothing_store.svg",
            text: "Clothing Store"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/electronics_technology.svg",
            text: "Electronics & Technology"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/fitness_nutrition_center.svg",
            text: "Fitness and Nutrition Service"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/energy_supplier.svg",
            text: "Energy Supplier"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/real_estate_agents.svg",
            text: "Real Estate Agents"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/insurance_agency.svg",
            text: "Insurance Agency"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/bedroom_furniture.svg",
            text: "Bedroom Furniture Store"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/activewear.svg",
            text: "Activewear Store"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/womens_clothing_store.svg",
            text: "Women's Clothing Store"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/mens_clothing_store.svg",
            text: "Men's Clothing Store"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/bicycle_shop.svg",
            text: "Bicycle Store"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/shoe_store.svg",
            text: "Shoe Store"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/mortgage_broker.svg",
            text: "Mortgage Broker"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/appliance_store.svg",
            text: "Appliance Store"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/cosmetics_store.svg",
            text: "Cosmetics Store"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/electronic_store.svg",
            text: "Electronics Store"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/garden_center.svg",
            text: "Garden Center"
        },
        {
            image_url: "https://consumersite-assets.trustpilot.net/consumersite-home/public/categories-icons/_rebrand/travel_agency.svg",
            text: "Travel Agency"
        }
    ];

    const settings = {
        className: "my-custom-slider",
        centerMode: false,
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 4,
        speed: 500,
        rows: 1,
        arrows: false,
        slidesPerRow: 3,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1290,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 1120,
                settings: {
                    slidesToShow: 2.1,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true
                }
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 1.1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ],
        beforeChange: (oldIndex, newIndex) => {
            setIsFirstSlide(newIndex === 0);
            setIsLastSlide(newIndex === data.length / 6);
        }
    };

    const goToPrev = () => {
        slider.current.slickPrev();
    };

    const goToNext = () => {
        slider.current.slickNext();
    };

    return (
        <div className="relative">
            {!isFirstSlide && (
                <button className='slider-btn absolute left-[-40px] top-1/2 transform -translate-y-1/2 ms-3.5 border p-2 rounded-full rotate-180 bg-SBlue' onClick={goToPrev}>
                    <span className="typography_heading-xxs__zFHFb typography_appearance-inherit__v_p92 typography_disableResponsiveSizing__bwDBg button_buttonText__uSidG">
                        <svg viewBox="0 0 16 16" className="icon_icon__8DZ1e icon_appearance-default__QHbW_" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.51 7.776 3.953 2.158l.65-.759 7.444 6.377-7.443 6.382-.651-.759 6.557-5.623Z"></path>
                        </svg>
                    </span>
                </button>
            )}

            {!isLastSlide && (
                <button className='slider-btn absolute right-[-40px] top-1/2 transform -translate-y-1/2 border p-2 rounded-full bg-SBlue' onClick={goToNext}>
                    <svg viewBox="0 0 16 16" className="icon_icon__8DZ1e icon_appearance-default__QHbW_" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.51 7.776 3.953 2.158l.65-.759 7.444 6.377-7.443 6.382-.651-.759 6.557-5.623Z"></path>
                    </svg>
                </button>
            )}

            <div className="mt-2 relative">
                <Slider ref={slider} {...settings}>
                    {data.map((d, index) => (
                        <div key={index} className='category-carousel-card h-[55px] sm:h-[55px] md:h-[55px] lg:h-[60px] xl:h-[65px] 2xl:h-[70px] w-100 m-[10px] rounded  d-flex  items-center border ps-3'>
                            <Link to={`/categories/${d.text}`}>
                                <div className="flex">
                                    <img src={d.image_url} className="styles_image__sKB7q" alt="" />
                                    <h4 className='text-[13px] ms-3 flex items-center'>{d.text}</h4>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}