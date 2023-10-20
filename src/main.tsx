import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from './context/theme/ThemeContext';
import {DifficultyProvider} from './context/difficulty/DifficultyContext.tsx';
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <DifficultyProvider>
                <App/>
            </DifficultyProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
