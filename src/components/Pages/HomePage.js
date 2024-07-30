import React, { useState } from 'react'
import ExploreCategorySlider from '../Sliders/ExploreCategorySlider'
import StayUpToDate from '../Sliders/StayUpToDate'
import AutoScroll from '../Sliders/AutoScroll'
import CardSlider from '../Sliders/CardSlider'
import { Link } from 'react-router-dom'
import OneStarRating from '../Assets/OneStarRating'
import Modal from '../Assets/Modal'
import config from '../../config'
export default function HomePage() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`${config.baseURL}/Search/CompaniesAndCategory?text=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
      setIsModalOpen(true); // Open the modal when search results are available
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchText(query);
    if (query.trim().length >= 3) {
      handleSearch(query);
    } else {
      setSearchResults([]);
      setShowResults(false);
      setIsModalOpen(false); // Close the modal if there are no search results
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Hero section */}
      <div className="homeScreen-desktop bg-Green relative" style={{ overflow: "hidden" }}>
        <section className="container hero">
          {/* Hero content */}
          <div className="hero-content mt-sm-5 mt-1">
            <div className="hero-text">
              <h1 className='hero-text-sm'>Read reviews. Write reviews. Find companies you can trust.</h1>
            </div>
            {/* Search box */}
            <div className="search-form-container relative">
              <form onSubmit={(e) => { e.preventDefault(); }} className={` border-1px-solid-black  rounded-[29px]`}>
                <input type="text" className='text-[15px] font-[500]' placeholder="Company or category" value={searchText} onChange={handleChange} />
                <button type="submit" className="search-button">
                  <span className="search-text font-bold">Search</span>
                  <svg viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM6.75 2a4.75 4.75 0 1 0 2.987 8.444l3.91 3.91.707-.708-3.91-3.91A4.75 4.75 0 0 0 6.75 2Z"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
          {/* Hero image */}
          <div className="hero-image absolute">
            <img src="images/hero-image-l.webp" alt="Hero img" />
          </div>
        </section>
      </div>



      {/* Search results modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {showResults && (
          <>
            <div className="px-2">
              <form onSubmit={(e) => { e.preventDefault(); }} className={`rounded-[29px]  flex justify-between p-1`}>
                <input type="text" className='text-[15px] font-[500] ms-3 focus:outline-none' placeholder="Company or category" value={searchText} onChange={handleChange} />
                <button type="submit" className="search-button rounded-full">
                  <span className="search-text font-bold px-3">Search</span>
                  <svg viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM6.75 2a4.75 4.75 0 1 0 2.987 8.444l3.91 3.91.707-.708-3.91-3.91A4.75 4.75 0 0 0 6.75 2Z"></path>
                  </svg>
                </button>
              </form>
            </div>
            <div className="bg-white rounded-b-[29px] shadow-md border-t mt-2 border-gray-200 p-1">
              <div className="font-bold ">
                {searchResults.Company.length > 0 ? (
                  <div className="px-3">Companies</div>
                ) : (
                  <div className="px-3 opacity-30">No Results Matched for Companies</div>
                )}
                {searchResults.Company?.map((result, index) => (
                  <Link key={index} to={`/review/${result.workEmail}`}>
                    <li className="px-3 py-2 hover:bg-SBlue text-sm flex justify-between items-center font-bold ">
                      <div className="">
                        <div className="text-[15px]">{result.companyName}</div>
                        <div className="text-Gray font-normal">{result.workEmail} <span className='ml-1'><span className='font-bold mr-1'>·</span> 36k reviews</span></div>
                      </div>
                      <OneStarRating rating={result.rating} />
                    </li>
                  </Link>
                ))}
              </div>
              <div className="font-bold border-t border-gray-200">
                {searchResults.Company.length > 0 ? (
                  <div className="px-3 py-2">Categories</div>
                ) : (
                  <div className="px-3 py-2 opacity-30">No Results Matched for Categories</div>
                )}
                {searchResults.Category?.map((result, index) => (
                  <Link key={index} to={`/Categories/${result}`}>
                    <li className="px-3 py-2 hover:bg-SBlue text-sm flex justify-between items-center font-bold">
                      <div className="">
                        <div className="text-[15px]">{result}</div>
                        <div className="text-Gray font-normal">The best companies in the category '{result}'</div>
                      </div>
                    </li>
                  </Link>
                ))}
              </div>
              {searchResults.Company.length > 0 && searchResults.Category.length > 0 ? (
                <div className="px-3 mb-1">
                  <Link to={`/search/${searchText}`} >
                    <button className="search-button w-100 rounded-full">
                      <span className="font-bold">Show all results</span>
                    </button>
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        )}

      </Modal>


      {/* Explore categories */}
      <div className='bg-Creem'>
        <div className="container py-5" >
          <div className="flex justify-between">
            <div><h1 className='h3 font-extrabold text-width'>Explore categories</h1></div>
            <div className=""><Link to="/Categories"><button className='p-2 px-3 text-xs font-bold text-Blue rounded-full bg-SBlue text-'>View all</button></Link></div>
          </div>
          <ExploreCategorySlider />
        </div>
      </div>

      <div className='bg-Creem1'>
        <div className="container py-3 flex justify-center align-center">
          <div className="flex align-items-center gap-2">
            <p className='font-extrabold m-0'>Are you a business?</p>
            <button className='py-[10px] ms-1 px-[25px] text-xs font-bold rounded-full blueBtn'>Get started</button>
          </div>
        </div>
      </div>

      {/* Stay up to date section */}
      <div className="container py-4" >
        <div className="flex justify-between py-2">
          <div><h1 className='h3 font-extrabold text-width'>Stay up to date</h1></div>
          <div className=""><button className='p-2 px-3 text-xs font-bold text-Blue rounded-full bg-SBlue'>See all</button></div>
        </div>
        <StayUpToDate />
      </div>

      <div className='bg-Creem1 py-3 pb-5 overflow-x-hidden'>
        <h2 className='text-bold text-2xl font-black text-center mt-4 mb-5'>Recent reviews</h2>
        <AutoScroll />
      </div>


      <div className='d-none d-sm-block bg-Creem py-5  '>
        <div className="container mb-4">
          <div className="bg-white w-100 border border-bottom-0 h-[50vh] rounded-t-2xl py-4 text-center relative overflow-hidden">
            <h2 className='text-2xl md:text-4xl font-black my-1'>Shop smarter with the TrustReview-Customer app</h2>
            <p className='text-sm my-3'>Keep TrustReview-Customer in your pocket. Find companies, read reviews, or write them—all while on the go.</p>
            <div className="flex justify-center pt-4">
              <div className="mx-2"><img style={{ filter: "drop-shadow(5px 5px 10px #4c4b4b6b)", width: "240px" }} src="/images/mobile-1.webp" alt="" /></div>
              <div className="mx-2"><img style={{ filter: "drop-shadow(5px 5px 10px #4c4b4b6b)", width: "240px" }} src="/images/mobile-2.webp" alt="" /></div>
              <div className="mx-2"><img style={{ filter: "drop-shadow(5px 5px 10px #4c4b4b6b)", width: "240px" }} src="/images/mobile-3.webp" alt="" /></div>
            </div>
          </div>
          <div className="bg-Creem1 w-100 border border-top-0 rounded-b-2xl py-3 text-center z-10">
            <div className="row  m-0 px-5 py-2">
              <div className="col-2  flex justify-center">
                <img className='w-[45px] h-[45px] object-cover rounded-full border-3 drop-shadow-lg border-white' src="images/avatar-1.webp" alt="" />
                <img className='w-[45px] h-[45px] object-cover ms-[-25px] rounded-full border-3 drop-shadow-lg border-white' src="/images/avatar-2.webp" alt="" />
                <img className='w-[45px] h-[45px] object-cover ms-[-20px] rounded-full border-3 drop-shadow-lg border-white' src="/images/avatar-3.webp" alt="" />
                <img className='w-[45px] h-[45px] object-cover ms-[-20px] rounded-full border-3 drop-shadow-lg border-white' src="/images/avatar-4.webp" alt="" />
              </div>
              <div className="col-8  text-start">
                <h2 className='text-2xl font-black my-2 mb-[15px]'>Get the iOS app</h2>
                <p className='text-md my-2'>Join the community! Scan the QR code with your phone camera to download.</p>
              </div>
              <div className="col-2 ">
                <img src="/images/app-store-download-qr-code-production.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='bg-Creem1 py-3 pb-5'>
        <div className="lg:text-center mt-[90px] px-4">
          <h3 className='text-xl md:text-2xl font-bold opacity-70'>Your stories</h3>
          <h3 className='text-2xl md:text-4xl font-black mt-1 md:mt-2'>Each review has a personal story</h3>
        </div>
        <div className="container py-4" >
          <CardSlider />
        </div>
      </div>

      <div className='bg-Creem py-20 flex justify-center align-middle text-center'>
        <div className="container mb-4">
          <h2 className='text-[42px] font-black my-4'>Be heard</h2>
          <div className="flex justify-center">
            <p className='w-[65%] text-center '>TrustReview-Customer is free and open to every company and consumer everywhere. Sharing your experiences helps others make better choices and companies up their game.</p>
          </div>
          <div className="">
            <Link to="/about">
              <button className='border-1 border-Blue  text-Blue rounded-full my-4 px-[27px] py-[15px] font-bold borderBlueBtn'>What we do</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
