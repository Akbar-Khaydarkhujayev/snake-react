import React, {createContext, useState} from "react"

interface Props {
    difficulty: number;
    setDifficulty: React.Dispatch<React.SetStateAction<number>>;
}

export const DifficultyContext = createContext<Props>({difficulty: 2} as Props)

interface ChildrenProps {
    children: React.ReactNode;
}

export const DifficultyProvider: React.FC<ChildrenProps> = ({children}) => {

    let defaultDifficultyValue = 2

    if(localStorage.getItem('SnakeDifficulty')) {
        defaultDifficultyValue = JSON.parse(localStorage.getItem('SnakeDifficulty')!)
    }

    const [difficulty, setDifficulty ] = useState(defaultDifficultyValue);

    return (
        <DifficultyContext.Provider value={{
            difficulty: difficulty,
            setDifficulty,
        }}>
            {children}
        </DifficultyContext.Provider>
    )
}

export const useDifficulty = () => React.useContext(DifficultyContext);