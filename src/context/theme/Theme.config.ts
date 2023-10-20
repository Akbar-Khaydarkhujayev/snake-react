export interface Theme {
    '--primary': string
    '--accent': string
    '--background': string
    '--snake': string
}

export type ThemeType = 'light' | 'dark' | 'colorful'

export const THEMES: Record<ThemeType, Theme> = {
    light: {
        '--primary': '#272343',
        '--accent': '#ffd803',
        '--background': '#fffffe',
        '--snake': '#2d334a',
    },
    dark: {
        '--primary': '#fffffe',
        '--accent': '#ff8906',
        '--background': '#2e2f3e',
        '--snake': '#a7a9be',
    },
    colorful: {
        '--primary': '#fffffe',
        '--accent': '#6246ea',
        '--background': '#41980a',
        '--snake': '#DC143C',
    }
}