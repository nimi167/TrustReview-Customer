import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer({ bgColor }) {
    const [selected, setSelected] = useState("US");
    return (
        <>
            <footer className={`bg-${bgColor} py-16`}>
                <div className="container">
                    <Link className="navbar-brand me-lg-5" to="/">
                        <img src="/images/logo-white.svg" alt="" style={{ height: "30px" }} />
                    </Link>
                </div>
                <div className="container mt-3">
                    <div className="grid grid-cols-2 gap-8 px-0 py-6 lg:py-8 lg:grid-cols-5">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-Creem3">About</h2>
                            <ul className="text-Creem dark:text-gray-400 text-sm">
                                <li className="mb-4">
                                    <Link to="/about" className="hover:underline">About us</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Jobs</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/contact" className="hover:underline">Contact</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Blog</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/trust/how-trustreview-works" className="hover:underline">How TrustReview works</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Press</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Investor Relations</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-Creem3 ">Community</h2>
                            <ul className="text-Creem dark:text-gray-400 text-sm ">
                                <li className="mb-4">
                                    <Link to="/trust" className="hover:underline">Trust in reviews</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Help Center</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Log in</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Sign up</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Chrome App</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-Creem3 ">Businesses</h2>
                            <ul className="text-Creem dark:text-gray-400 text-sm ">
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">TrustReview Business</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Products</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Plans & Pricing</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Business Login</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Blog for Business</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-Creem3 ">Follow us on</h2>
                            <ul className="text-Creem dark:text-gray-400 text-sm ">
                                <li className="mb-4">
                                    <Link to="https://www.facebook.com/TrustReview/" target="_blank" className="hover:text-SBlue">
                                        <FaFacebook size={18} />
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="https://x.com/TrustReview" target="_blank" className="hover:text-SBlue">
                                        <FaTwitter size={18} />
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="https://www.instagram.com/TrustReview/" target="_blank" className="hover:text-SBlue">
                                        <FaInstagram size={18} />
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="https://www.linkedin.com/company/TrustReview/" target="_blank" className="hover:text-SBlue">
                                        <FaLinkedin size={18} />
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="https://www.youtube.com/c/TrustReviewreviews" target="_blank" className="hover:text-SBlue">
                                        <FaYoutube size={18} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="">
                            <h2 className="mb-6 text-sm font-semibold text-Creem3 ">Choose country</h2>
                            <div className="p-0 m-0 bg-white rounded-lg">
                                <ReactFlagsSelect
                                    selected={selected}
                                    className="p-0 w-100"
                                    onSelect={(code) => {
                                        setSelected(code)
                                    }}
                                />
                            </div>
                        </div>
                    </div>




                    <div className="px-0 pb-6">
                        <Link to="/">
                            <img src="/images/Download-AppStore.svg" alt="" />
                        </Link>
                    </div>
                    <div className="px-0 py-6 text-Creem text-sm flex flex-wrap gap-4">
                        <div className="">
                            <Link to="/" className="hover:underline">Legal</Link>
                        </div>
                        <div className="">
                            <Link to="/" className="hover:underline">Privacy Policy</Link>
                        </div>
                        <div className="">
                            <Link to="/" className="hover:underline">Terms & Conditions</Link>
                        </div>
                        <div className="">
                            <Link to="/" className="hover:underline">Guidelines for Reviewers</Link>
                        </div>
                        <div className="">
                            <Link to="/" className="hover:underline">System status</Link>
                        </div>
                        <div className="">
                            <Link to="/" className="hover:underline">Cookie prefrences</Link>
                        </div>
                        <div className="">
                            <Link to="/" className="hover:underline">Modern Slavery Statement</Link>
                        </div>
                    </div>
                    <div className="px--0 py-6">
                        <span className="text-sm text-Creem3 dark:text-gray-300 sm:text-center">
                            © 2024 <Link href="https://flowbite.com/">TrustReview, Inc</Link>. All Rights Reserved.
                        </span>
                    </div>
                </div>
            </footer>

        </>
    )
}
