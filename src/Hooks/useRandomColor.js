
import { useState, useEffect } from 'react';

const colorMappings = [
    { bg: "bg-liteYellow", hover: "hover:bg-hover_liteYellow" },
    { bg: "bg-liteGreen", hover: "hover:bg-hover_liteGreen" },
    { bg: "bg-litePink", hover: "hover:bg-hover_litePink" },
    { bg: "bg-liteOrange", hover: "hover:bg-hover_liteOrange" }
];

const useRandomColor = () => {
    const [color, setColor] = useState({});
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * colorMappings.length);
        setColor(colorMappings[randomIndex]);
    }, []);

    return color;
};

export default useRandomColor;



// usage
// import useRandomColor from '../../Hooks/useRandomColor';
// use the funcition     const color = useRandomColor();
//  <div className={`font-bold   ${color.bg} ${color.hover} `}