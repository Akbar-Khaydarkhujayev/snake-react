import Main from "./components/menu/Main.tsx"
import {useTheme} from './context/theme/ThemeContext'
import Settings from "./components/settings/Settings.tsx"
import {useState} from "react"
import Game from "./components/game/Game.tsx"

const App = () => {
    const {themeColors} = useTheme()

    const [page, setPage] = useState(-600)

    return (
        <>
            <div className='app'
                 style={{
                     ...themeColors
                 } as React.CSSProperties}>
                <div className='app-inner' style={{top: page}}>
                    <Settings setPage={setPage}/>
                    <Main setPage={setPage}/>
                    <Game setPage={setPage} page={page}/>
                </div>
            </div>
        </>
    )
}

export default App
