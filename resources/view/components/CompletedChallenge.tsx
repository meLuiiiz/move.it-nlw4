import { useContext } from 'react'
import { ChallengesContext } from '../../context/ChallengesContext'
import Styles from '../../css/CompletedChallenge.module.css'

export function CompletedChallenge() {
    const { ChallengesCompleted } = useContext(ChallengesContext)

    return  (
        <div className={Styles.completedChallengeContainer}>
            <span>Desafios completos</span>
            <span>{ChallengesCompleted}</span>
        </div>
    )
}