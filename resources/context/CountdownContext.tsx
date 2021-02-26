import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Countdown } from "../view/components/Countdown";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    actived: boolean;
    finished: boolean;
    StartCountdown: () => void;
    ResetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData)

interface CountdownProviderProps {
    children: ReactNode
}


let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {

    const { StartNewChallenge } = useContext(ChallengesContext)


    const [ time, setTime ] = useState(0.1 * 60)
    const [ actived, setActived ] = useState(false)
    const [ finished, setFinished ] = useState(false)

    const minutes = Math.floor(time / 60); // Obtem o número arredondadod (para baixo) da divisão dos segundos/minuto
    const seconds = time % 60; // Obtem o resto de divisão do tempo

    function StartCountdown() {
        setActived(true)
        setFinished(false)
    }

    function ResetCountdown() {
        clearTimeout(countdownTimeout)
        setActived(false)
        setFinished(false)
        setTime(0.1 * 60)
    }

    useEffect(() => {

        if (actived && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (actived && time === 0) {
            setFinished(true)
            setActived(false)
            StartNewChallenge()
        }

    }, [ actived, time ])


    return (
        <CountdownContext.Provider
            value={{
                minutes,
                seconds,
                actived,
                finished,
                StartCountdown,
                ResetCountdown
            }}s>
            {children}
        </CountdownContext.Provider>
    )
}