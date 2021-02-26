import { useContext } from 'react'
import { ChallengesContext } from '../../context/ChallengesContext'
import { CountdownContext } from '../../context/CountdownContext'
import Styles from '../../css/ChallengeBox.module.css'

export function ChallengeBox() {

    const { ActiveChallenge, ResetChallenge, CompleteChallenge } = useContext(ChallengesContext)
    const { ResetCountdown } = useContext(CountdownContext)

    function HandleChallengeSucceeded() {
        CompleteChallenge()
        ResetCountdown()
    }

    function HandleChallengeFailed() {
        ResetChallenge()
        ResetCountdown()
    }

    return (
        <div className={Styles.ChallengeBoxContainer}>
            { ActiveChallenge ? (
                <div className={Styles.ChallengeActive}>
                    <header>
                        Ganhe {ActiveChallenge.amount}xp
                    </header>
                    <main>
                        <img src={`/icons/${ActiveChallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{ActiveChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                            className={Styles.ChallengeFailButton}
                            type="button"
                            onClick={HandleChallengeFailed}
                            >Falhei</button>
                        <button
                            className={Styles.ChallengeSucceededButton}
                            type="button"
                            onClick={HandleChallengeSucceeded}>Completei</button>
                    </footer>
                </div>
            ) : (
                <div className={Styles.ChallengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="/icons/level-up.svg" alt="LevelUp"/>
                        Avance de level completado desafios
                    </p>
                </div>
            )}
        </div>
    )
}