import React, { useContext, useState } from 'react';
import { ThemeContext } from "../../context/ThemeProvider";
import { IoMdMoon, } from "react-icons/io";
import { FiSun } from "react-icons/fi";

const ThemeToggleButton = () => {
    const [icon, setIcon] = useState(false)
    const { setTheme, mode } = useContext(ThemeContext);

    const iconChange = () => {
        setIcon(!icon);
        setTheme(!mode);
    }

    return mode === 'dark' ?
        <FiSun style={{ color: '#FFFFFF' }} onClick={() => iconChange()} />
        :
        <IoMdMoon style={{ color: '#000000' }} onClick={() => iconChange()} />
}

export default ThemeToggleButton;