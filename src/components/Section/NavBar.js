import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfilePicture from '../Assets/ProfilePicture'
import { RxArrowRight } from "react-icons/rx";
import Modal from '../Assets/Modal';
import OneStarRating from '../Assets/OneStarRating';
import config from '../../config';

export default function NavBar() {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const userId = localStorage.getItem('userId');
    const handleLogOut = () => {
        localStorage.clear()
        navigate('/');
    }
    useEffect(() => {
        const handleLinkClick = () => {
            const offcanvas = document.querySelector('[data-bs-dismiss="offcanvas"]');
            if (offcanvas) {
                offcanvas.click();
            }
        };

        const container = document.getElementById('linksContainer');
        container.addEventListener('click', handleLinkClick);

        return () => {
            container.removeEventListener('click', handleLinkClick);
        };
    }, []);
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
            <nav className="navbar bg-ThemeBlack navbar-expand-lg navbar-dark py-2 sticky top-0 z-50 ">
                <div className="container ">
                    <Link className="navbar-brand me-lg-5" to="/">
                        <img src="/images/logo-white.svg" alt="" style={{ height: "30px" }} />
                    </Link>

                    <span className="navbar-toggler border-0 "
                        data-bs-toggle="offcanvas"
                        data-bs-target="#navbarOffcanvas"
                        aria-controls="navbarOffcanvas"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </span>
                    <div className="offcanvas offcanvas-end bg-black" id="navbarOffcanvas"
                        tabIndex="-1" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title text-light" id="offcanvasNavbarLabel">&nbsp;</h5>
                            <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="d-lg-block d-none ">

                            <div className="offcanvas-body p-0 m-0">
                                <div className="navbar-nav justify-content-end nav-underline items-center flex-grow-1 pe-3 px-3 ">
                                    {/* Search box */}
                                    <div className="order-lg-1 grow order-5 bg-white relative rounded-md overflow-hidden border">
                                        <form onSubmit={(e) => { e.preventDefault(); }} className='flex items-center ps-2' >
                                            <svg viewBox="0 0 16 16" class="icon_icon__8DZ1e icon_appearance-default__QHbW_" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM6.75 2a4.75 4.75 0 1 0 2.987 8.444l3.91 3.91.707-.708-3.91-3.91A4.75 4.75 0 0 0 6.75 2Z"></path></svg>
                                            <input type="text" className='text-[15px] w-full py-[10px] px-2 outline-none' placeholder="Search for a company or category…" value={searchText} onChange={handleChange} />
                                        </form>
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
                                                                    <button className="search-button w-100 rounded-full" onClick={handleCloseModal}>
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
                                    </div>

                                    <Link className="nav-link fs-nav order-lg-2 order-4 flex items-center" to="/Categories">Categories</Link>
                                    {userName ? (
                                        <div className="nav-link fs-nav order-lg-4 order-3 flex items-center relative" onMouseOver={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                                            <ProfilePicture name={userName} size="sm" />
                                            <span className='ms-2'>{userName}</span>
                                            {dropdownOpen && (
                                                <div className="dropdown-menu w-100 pt-1 show absolute bg-black  text-white top-[52px] left-0 rounded-b-lg" onClick={toggleDropdown}>
                                                    <Link className="dropdown-item text-sm   py-2 text-white hover:bg-SBlue hover:text-Blue" to={`/users/${userId}`}>My Reviews</Link>
                                                    <Link className="dropdown-item text-sm py-2 text-white hover:bg-SBlue hover:text-Blue" to="/Settings">My Settings</Link>
                                                    <Link className="dropdown-item text-sm py-2 text-white hover:bg-SBlue hover:text-Blue" to="/help">Help</Link>
                                                    <div className="dropdown-item text-sm py-2 text-white hover:bg-SBlue hover:text-Blue" onClick={handleLogOut}>Log Out</div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link className="nav-link fs-nav order-lg-4 order-3 py-3" to="/Login">Log in</Link>
                                    )}
                                    <hr className='d-lg-none d-block order-lg-5 order-2' />
                                    <button className='nav-btn px-4 border-0 py-lg-0 h-[40px] rounded-5 nav-btn order-lg-5 order-1'><a href="http://localhost:3002/">For businesses</a></button>
                                </div>
                            </div>
                        </div>
                        <div className="d-lg-none d-block px-4">
                            <button className='border-[1px] border-[#a6c0f0] text-[#a6c0f0] rounded-5 w-100 py-2'><Link to="http://localhost:3002/">For businesses</Link></button>
                            <div className="border-t border-Gray my-3"></div>
                            {userName ? (
                                <>
                                    <div className="nav-link fs-nav order-lg-3 order-3 flex items-center relative mb-4" >
                                        <ProfilePicture name={userName} size="md" />
                                        <span className='ms-3 text-lg'>{userName}</span>
                                    </div>
                                    <div id="linksContainer">
                                        <Link className="dropdown-item text-lg font-black my-3 text-white  hover:text-Blue" to={`/users/${userId}`}>My Reviews</Link>
                                        <Link className="dropdown-item text-lg font-black my-3 text-white  hover:text-Blue" to="/Settings">My Settings</Link>
                                        <Link className="nav-link text-lg font-black my-3 text-white order-lg-1 order-4 flex items-center" to="/Categories">Categories</Link>
                                        <Link className="dropdown-item text-lg font-black my-3 text-white  hover:text-Blue" to="/help">Help</Link>
                                        <div className="dropdown-item text-lg font-black my-3 text-[#a6c0f0]  hover:text-Blue" onClick={handleLogOut}>Log Out</div>
                                    </div></>
                            ) : (
                                <>
                                    <div id="linksContainer">
                                        <Link className="nav-link text-[#a6c0f0] text-lg font-black underline py-3 flex items-center" to="/Login">Log in <RxArrowRight className='ms-2' size={23} /></Link>
                                        <Link className="nav-link text-lg font-black my-3 text-white order-lg-1 order-4 flex items-center" to="/Categories">Categories</Link>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </nav>
        </>
    );
}