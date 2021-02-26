import { GetServerSideProps } from 'next'
import Head from "next/head"

import { ExperienceBar } from "../resources/view/components/ExperienceBar";
import { Profile } from "../resources/view/components/Profile";
import { CompletedChallenge } from "../resources/view/components/CompletedChallenge";
import { Countdown } from "../resources/view/components/Countdown";
import { ChallengeBox } from "../resources/view/components/ChallengeBox";

import Styles from '../resources/css/Home.module.css'
import { CountdownProvider } from "../resources/context/CountdownContext";
import { ChallengesProvider } from '../resources/context/ChallengesContext';


interface HomeProps {
    level: number;
    CurrentExperience: number;
    ChallengesCompleted: number;
}

export default function Home(props: HomeProps) {
    return (
        <ChallengesProvider level={props.level} CurrentExperience={props.CurrentExperience} ChallengesCompleted={props.ChallengesCompleted}>
            <div className={Styles.container}>
                <Head>
                    <title>Início | move.it</title>
                </Head>

                <ExperienceBar />
                
                <CountdownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallenge />
                                <Countdown />
                        </div>
                        <div>
                            <ChallengeBox />
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { level, CurrentExperience, ChallengesCompleted } = ctx.req.cookies;

    return {
        props: {
            level: Number(level),
            CurrentExperience: Number(CurrentExperience),
            ChallengesCompleted: Number(ChallengesCompleted)
        }
    }
}