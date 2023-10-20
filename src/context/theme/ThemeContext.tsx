import React, {createContext, useState} from "react"
import {Theme, ThemeType, THEMES} from "./Theme.config"

interface ThemeContextProps {
    theme: ThemeType
    themeColors: Theme
    setTheme: React.Dispatch<React.SetStateAction<ThemeType>>
}

interface ChildrenProps {
    children: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextProps>({theme: 'light', themeColors: THEMES['light']} as ThemeContextProps)

export const ThemeProvider: React.FC<ChildrenProps> = ({children}) => {

    let defaultThemeValue:ThemeType = 'light'

    if(localStorage.getItem('SnakeTheme')) {
        defaultThemeValue = JSON.parse(localStorage.getItem('SnakeTheme')!)
    }

    const [theme, setTheme] = useState<ThemeType>(defaultThemeValue)

    return (
        <ThemeContext.Provider value={{
            theme: theme,
            themeColors: THEMES[theme],
            setTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => React.useContext(ThemeContext)