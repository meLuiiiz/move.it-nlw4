import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../../context/ChallengesContext'
import { CountdownContext } from '../../context/CountdownContext'
import Styles from '../../css/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout

export function Countdown() {

    const  {
        minutes,
        seconds,
        actived,
        finished,
        StartCountdown,
        ResetCountdown
    } = useContext(CountdownContext)


    // padStart = Caso uma string seja apenas 1 caracter, ele preencherá com 0 no começo
    // split = faz a divisão de caracteres
    
    const [ minuteLeft, minuteRight ] = String(minutes).padStart(2, '0').split('')
    const [ secondLeft, secondRight ] = String(seconds).padStart(2, '0').split('')

    return (
        <div>
            <div className={Styles.countdownContainer}>
                <div>
                    <span>{ minuteLeft }</span>
                    <span>{ minuteRight } </span>
                </div>
                <span>:</span>
                <div>
                    <span>{ secondLeft }</span>
                    <span>{ secondRight }</span>
                </div>
            </div>

            { finished ? (
                <button className={Styles.CountdownButton} disabled>
                    Ciclo encerrado
                </button>
            ) : ( 
                <>
                { actived ?
                    (<button className={`${Styles.CountdownButton} ${Styles.CountdownButtonActive}`} type="button" onClick={ResetCountdown}>
                    Abandonar ciclo
                    </button>)
                    :
                    (<button className={Styles.CountdownButton} type="button" onClick={StartCountdown}>
                        Iniciar um ciclo
                    </button>)
                }
                </>
            )}
        </div>
    )
}