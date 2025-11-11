import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function useDarkMode() {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check localStorage first
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("theme") as Theme | null;
            if (stored === "light" || stored === "dark" || stored === "system") {
                return stored;
            }
        }
        return "system";
    });

    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const root = document.documentElement;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = () => {
            let isDark: boolean;

            if (theme === "system") {
                isDark = mediaQuery.matches;
            } else {
                isDark = theme === "dark";
            }

            setResolvedTheme(isDark ? "dark" : "light");

            if (isDark) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        };

        applyTheme();

        // Listen for system theme changes
        const handleChange = () => {
            if (theme === "system") {
                applyTheme();
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [theme]);

    const setThemeAndStore = (newTheme: Theme) => {
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    return {
        theme,
        resolvedTheme,
        setTheme: setThemeAndStore
    };
}