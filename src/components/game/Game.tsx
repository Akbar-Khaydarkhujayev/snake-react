import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBug, faArrowRight, faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'
import './game.scss'
import {useDifficulty} from "../../context/difficulty/DifficultyContext.tsx";

type SnakeStateType = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT' | 'PAUSE'

type Props = {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
};

const Game: React.FC<Props> = ({setPage, page}) => {

    useEffect(() => {
        if(page === -1200) {
            mainRef.current.focus({ preventScroll: true })
        }
    }, [page]);

    const {difficulty} = useDifficulty();

    const [bugPosition, setBugPosition] = useState({x: 5, y: 20})
    const [snake, setSnake] = useState([{x: 5, y: 8}, {x: 5, y: 9}, {x: 5, y: 10}])
    const [snakeState, setSnakeState] = useState<SnakeStateType>('PAUSE')
    const [score, setScore] = useState(0)
    const [history, setHistory] = useState<number[]>([])

    const mainRef = useRef(null)
    const intervalRef = useRef(0)

    const newBug = () => {
        const newPos = {x: Math.floor(Math.random() * 30) + 1, y: Math.floor(Math.random() * 30) + 1}
        for (let i = 0; i < snake.length; i++) {
            if (newPos === snake[i]) {
                newBug()
            } else {
                setBugPosition(newPos)
            }
        }
    }

    const moveSnake = (x: number, y: number) => {
        if (bugPosition.x === snake[snake.length - 1].x && bugPosition.y === snake[snake.length - 1].y) {
            setScore(score + 1)
            setSnake(prevState => {
                const position = [...prevState]
                position.push({x: position[position.length - 1].x + x, y: position[position.length - 1].y + y})
                return position
            })
            newBug()
        } else {
            setSnake(prevState => {
                const position = [...prevState]
                const tail = position.shift() !
                tail.x = position[position.length - 1].x + x
                tail.y = position[position.length - 1].y + y
                position.push(tail)
                return position
            })
        }
    }

    useEffect(() => {
        clearInterval(intervalRef.current)
        for (let i = 0; i < snake.length - 1; i++) {
            if ((snake[snake.length - 1].x === snake[i].x && snake[snake.length - 1].y === snake[i].y) || snake[snake.length - 1].x === 0 || snake[snake.length - 1].x === 31 || snake[snake.length - 1].y === 0 || snake[snake.length - 1].y === 31) {
                gameOver()
            }
        }

        switch (snakeState) {
            case 'UP':
                intervalRef.current = setInterval(() => moveSnake(-1, 0), (5 - difficulty) * 40)
                break;
            case 'DOWN':
                intervalRef.current = setInterval(() => moveSnake(1, 0), (5 - difficulty) * 40)
                break;
            case 'RIGHT':
                intervalRef.current = setInterval(() => moveSnake(0, 1), (5 - difficulty) * 40)
                break;
            case 'LEFT':
                intervalRef.current = setInterval(() => moveSnake(0, -1), (5 - difficulty) * 40)
                break;
        }
    }, [snakeState, snake]);

    const gameOver = () => {
        setSnakeState('PAUSE');
        clearInterval(intervalRef.current)
        setBugPosition({x: 10, y: 20})
        setSnake([{x: 5, y: 8}, {x: 5, y: 9}, {x: 5, y: 10}])
        setHistory([score, ...history])
        setScore(0)
    }

    const handleKeydown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                setPage(-600)
                break;
            case ' ':
                setSnakeState('PAUSE')
                break;
            case 'ArrowUp':
                if (snakeState !== 'DOWN') {
                    setSnakeState('UP')
                }
                break;
            case 'ArrowDown':
                if (snakeState !== 'UP') {
                    setSnakeState('DOWN')
                }
                break;
            case 'ArrowRight':
                if (snakeState !== 'LEFT') {
                    setSnakeState('RIGHT')
                }
                break;
            case 'ArrowLeft':
                if (snakeState === 'PAUSE') break;
                if (snakeState !== 'RIGHT') {
                    setSnakeState('LEFT')
                }
                break;
        }
    }

    return (
        <div className='game' ref={mainRef} onKeyDown={handleKeydown} tabIndex={0}>
            <div className={snakeState === 'PAUSE' ? 'game__overlay show' : 'game__overlay'}>
                <div className='flex' style={{justifyContent: 'center', margin: '20px 0'}}>
                    <div className='arrow-header'>Start with keyboard:</div>
                    <FontAwesomeIcon icon={faArrowRight} className='arrow-icon arrow-right'/>
                    <FontAwesomeIcon icon={faArrowDown} className='arrow-icon'/>
                    <FontAwesomeIcon icon={faArrowUp} className='arrow-icon'/>
                </div>
                <div className='flex' style={{justifyContent: 'center', margin: '20px 0'}}>
                    <div className='arrow-header'>Press</div>
                    <div className='escape'>ESC</div>
                    <div className='arrow-header'>for main menu</div>
                </div>
                <div className='table'>
                    <table>
                        <thead>
                        <tr>
                            <th>Index</th>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {history.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>You</td>
                                <td>{item}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='game__grid'>
                <span className='game__score'>Score: {score}</span>
                {snake.map((cell, i) => <div className='snake' key={i}
                                             style={{gridArea: `${cell.x}/${cell.y}`}}></div>)}
                <FontAwesomeIcon icon={faBug} className='bug' style={{gridArea: `${bugPosition.x}/${bugPosition.y}`}}/>
            </div>
        </div>
    )
}

export default Game