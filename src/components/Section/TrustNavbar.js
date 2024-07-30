import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TrustNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-ThemePurple py-2 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-4">
                <Link className="navbar-brand" to="/">
                    <img src="/images/logo-white.svg" alt="Logo" className="h-8" />
                </Link>
                <div className="hidden xl:flex space-x-4">
                    <Link className="font-normal text-sm text-white flex items-center" to="/trust/how-trustReview-works">How TrustReview works</Link>
                    <Link className="font-normal text-sm text-white flex items-center" to="/trust/combating-fake-reviews">Combating fake reviews</Link>
                    <Link className="font-normal text-sm text-white flex items-center" to="/trust/our-business-model">Our business model</Link>
                    <Link className="font-normal text-sm text-white flex items-center" to="/trust/contact">
                        <button className="border-[2px] rounded px-4 py-2 text-white">Contact</button>
                    </Link>
                </div>
                <div className="xl:hidden">
                    <button onClick={toggleMenu} className="text-Green font-light">
                        {isOpen ? "close" : "Menu"}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="xl:hidden bg-ThemePurple text-white">
                    <div className="container mx-auto flex flex-col items-center space-y-4 py-4 h-[100vh]">
                        <div className="flex flex-col mt-32 w-[400px]">
                            <div className="py-3 border-b border-gray-600">
                                <Link className="text-2xl text-start" to="/how-trustreview-works" onClick={toggleMenu}>How TrustReview works</Link>
                            </div>
                            <div className="py-3 border-b border-gray-600">
                                <Link className="text-2xl text-start" to="/combating-fake-reviews" onClick={toggleMenu}>Combating fake reviews</Link>
                            </div>
                            <div className="py-3 border-b border-gray-600">
                                <Link className="text-2xl text-start" to="/our-business-model" onClick={toggleMenu}>Our business model</Link>
                            </div>
                            <div className="py-3 mt-4">
                                <button className="border-[2px] w-full py-[10px]" onClick={toggleMenu}>Contact</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}