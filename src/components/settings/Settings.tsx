import {useEffect} from 'react'
import {Slider} from 'rsuite'
import {useTheme} from '../../context/theme/ThemeContext.tsx';
import {useDifficulty} from '../../context/difficulty/DifficultyContext.tsx'
import './settings.scss'

type Props = {
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Settings: React.FC<Props> = ({setPage}) => {
    const {theme, setTheme} = useTheme();
    const {difficulty, setDifficulty} = useDifficulty();

    useEffect(() => {
        localStorage.setItem('SnakeTheme', JSON.stringify(theme))
        localStorage.setItem('SnakeDifficulty', JSON.stringify(difficulty))
    }, [theme, difficulty]);

    const labels = ['Easy ', 'Normal', 'Medium', 'Hard', 'Expert'];
    return (
        <div className='settings'>
            <div className='settings__difficulty'>
                <h1 className='settings__text'>Choose difficulty</h1>
                <div style={{width: 500, marginLeft: 40}}>
                    <Slider
                        min={0}
                        max={labels.length - 1}
                        value={difficulty}
                        className="custom-slider"
                        handleStyle={{
                            borderRadius: 10,
                            color: '#fff',
                            fontSize: 12,
                            width: 60,
                            height: 22
                        }}
                        graduated
                        tooltip={false}
                        handleTitle={labels[difficulty]}
                        onChange={setDifficulty}
                    />
                </div>
            </div>
            <div>
                <h1 className='settings__text'>Theme option</h1>
                <div
                    className={theme === 'light' ? 'settings__theme show' : 'settings__theme'}
                    onClick={() => setTheme('light')}
                >
                    Light Theme
                    <div className='settings__theme-bg light-bg'>
                        <div className='settings__theme-snake light-snake'></div>
                    </div>
                </div>
                <div
                    className={theme === 'dark' ? 'settings__theme show' : 'settings__theme'}
                     onClick={() => setTheme('dark')}
                >
                    Dark theme
                    <div className='settings__theme-bg dark-bg'>
                        <div className='settings__theme-snake dark-snake'></div>
                    </div>
                </div>
                <div
                    className={theme === 'colorful' ? 'settings__theme show' : 'settings__theme'}
                     onClick={() => setTheme('colorful')}
                >
                    Colorful theme
                    <div className='settings__theme-bg colorful-bg'>
                        <div className='settings__theme-snake colorful-snake'></div>
                    </div>
                </div>
            </div>
            <button className="btn" onClick={() => setPage(-600)}>Back to Main Menu</button>
        </div>
    )
}

export default Settings
