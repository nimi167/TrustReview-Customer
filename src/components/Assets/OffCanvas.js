import React from 'react';
import ReactDOM from 'react-dom';

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(28,28,28,.5)',
    zIndex: 1000
};


function OffCanvas({ onClose, children }) {
    return ReactDOM.createPortal(
        <>
            <div style={overlayStyle} onClick={onClose} />
            <div className='rounded-l-2xl rounded-r-2xl sm:rounded-r-none overflow-y-scroll bg-white sm:w-[600px] h-[100%] border-[3px] border-Creem1 fixed top-[50px] sm:mx-0 sm:top-0 right-0 z-[1000]'>
                <div className="" >
                    {children}
                </div>
            </div>
        </>,
        document.body
    );
}

export default OffCanvas;
