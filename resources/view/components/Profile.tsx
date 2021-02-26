import { useContext } from 'react'
import { ChallengesContext } from '../../context/ChallengesContext'

import Styles from './../../css/Profile.module.css'

export function Profile() {
    const { level } = useContext(ChallengesContext)

    return (
        <div className={Styles.profileContainer}>
            <img src="https://github.com/meluiiiz.png" alt="Luiz Felipe"/>
            <div>
                <strong>Luiz Felipe</strong>
                <p>
                    <img src="/icons/level.svg" alt="Ícone de level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}