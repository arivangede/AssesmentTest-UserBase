import { useState, useEffect } from "react";

const useTheme = () => {
    const [isDark, setIsDark] = useState(() => {
        const storedTheme = JSON.parse(localStorage.getItem("isDark"));
        return storedTheme !== null ? storedTheme : false;
    });

    useEffect(() => {
        if (isDark) {
            document.querySelector("html").setAttribute("data-theme", "black");
        } else {
            document
                .querySelector("html")
                .setAttribute("data-theme", "wireframe");
        }
        localStorage.setItem("isDark", JSON.stringify(isDark));
    }, [isDark]);

    return [isDark, setIsDark];
};

export default useTheme;
