import { useContext } from 'react'
import { ChallengesContext } from '../../context/ChallengesContext'
import Styles from '../../css/ExperienceBar.module.css'

export function ExperienceBar() {

    const { CurrentExperience, ExpirenceToNextLevel } = useContext(ChallengesContext)
    const PercentToNextLevel  = Math.round((CurrentExperience * 100)) / ExpirenceToNextLevel

    return (
        <header className={Styles.experienceBar}>
            <span>0xp</span>
            <div>
                <div style={{ width: `${PercentToNextLevel}%` }} />
                <span className={Styles.currentExperience} style={{ left: `${PercentToNextLevel}%` }}>{CurrentExperience}xp</span>
            </div>
            <span>{ExpirenceToNextLevel}xp</span>
        </header>
    )
}