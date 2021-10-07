import React, { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [mode, setTheme] = useState("light");

    useEffect(() => {
        if (sessionStorage.getItem('theme')) {
            setTheme(sessionStorage.getItem('theme'));
        }
    }, [])

    return (
        <ThemeContext.Provider
            value={{
                mode,
                setTheme: () => {
                    console.log(mode)
                    setTheme(mode === "dark" ? "light" : "dark")
                    sessionStorage.setItem('theme', mode === "dark" ? "light" : "dark");
                }
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;