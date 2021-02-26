import { useContext } from 'react'
import { ChallengesContext } from '../../context/ChallengesContext'

import Styles from '../../css/LevelUpModal.module.css'

export function LevelUpModal() {

    const { level, CloseLevelUpModal } = useContext(ChallengesContext)

    return (
        <div className={Styles.Overlay}>
            <div className={Styles.Container}>
                <header>{ level }</header>
                <strong>Parabens</strong>
                <p>Você alcançou um novo level</p>
                <button type="button" onClick={CloseLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar modal"/>
                </button>
            </div>
        </div>
    )
}