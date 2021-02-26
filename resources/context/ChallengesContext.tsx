import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../view/components/LevelUpModal'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData {
    level: number;
    CurrentExperience: number;
    ExpirenceToNextLevel: number;
    ChallengesCompleted: number;
    ActiveChallenge: Challenge;
    LevelUp: () => void;
    StartNewChallenge: () => void;
    ResetChallenge: () => void;
    CompleteChallenge: () => void;
    CloseLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    CurrentExperience: number;
    ChallengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengeContextData)
export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [CurrentExperience, setCurrentExperience] = useState(rest.CurrentExperience ?? 0)
    const [ChallengesCompleted, setChallengesCompleted] = useState(rest.ChallengesCompleted ?? 0)
    const [ ModalActived, setModalActived ] = useState(false)

    const [ActiveChallenge, setActiveChallenge] = useState(null)

    const ExpirenceToNextLevel = Math.pow((level + 1 ) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {

        Cookies.set('level', String(level))
        Cookies.set('CurrentExperience', String(CurrentExperience))
        Cookies.set('ChallengesCompleted', String(ChallengesCompleted))

    }, [level, CurrentExperience, ChallengesCompleted])

    function LevelUp() {
        new Audio('/levelup.mp3').play()
        setLevel(level + 1)
        setModalActived(true)
    }

    function CloseLevelUpModal() {
        setModalActived(false)
    }

    function StartNewChallenge() {
        const RandomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[RandomChallengeIndex]

        new Audio('/notification.mp3').play()
        setActiveChallenge(challenge)

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                 body: `Valendo ${challenge.amount}xp!`,
                 icon: `/favicon.png`
            })
        }

        
    }

    function ResetChallenge() {
        setActiveChallenge(null)
    }

    function CompleteChallenge() {
        if (!ActiveChallenge) return;

        const { amount } = ActiveChallenge
        let FinalExperience = CurrentExperience + amount

        const SaveFinalExperience = FinalExperience

        const OldCurrentExpirence = CurrentExperience;
    
        if (FinalExperience >= ExpirenceToNextLevel) {
            FinalExperience = ExpirenceToNextLevel
            setTimeout(() => {
                FinalExperience = SaveFinalExperience - ExpirenceToNextLevel
                LevelUp()
                setCurrentExperience(FinalExperience)
            }, 600)
        }

        setCurrentExperience(FinalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(ChallengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                CurrentExperience,
                ExpirenceToNextLevel,
                ChallengesCompleted,
                ActiveChallenge,
                LevelUp,
                StartNewChallenge,
                ResetChallenge,
                CompleteChallenge,
                CloseLevelUpModal
            }}>
            {children}
            { ModalActived && <LevelUpModal /> }
        </ChallengesContext.Provider>
    )
}