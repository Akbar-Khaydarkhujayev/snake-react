import './main.scss'

type Props = {
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Main: React.FC<Props> = ({setPage}) => {

    return (
        <div className='main'>
            <h1>Main menu</h1>
            <button className='btn' onClick={() => setPage(-1200)}>Start Game</button>
            <button className='btn' onClick={() => setPage(0)}>Settings</button>
        </div>
    )
}

export default Main
