import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { AdsList } from '../../components/Game/AdsList'
import { Header } from '../../components/Game/Header'

import { api } from '../../lib/axios'

interface GameProps {
  game: {
    id: string
    title: string
    bannerUrl: string
    ads: {
      id: string
      name: string
      weekDays: number[]
      useVoiceChannel: boolean
      yearsPlaying: number
      hourStart: string
      hourEnd: string
    }[]
  }
}

export default function Game({ game }: GameProps) {
  return (
    <>
      <Head>
        <title>{`${game.title} | Find Your Duo`}</title>
      </Head>

      <div className="max-w-[1478px] mx-auto flex flex-col justify-center items-center mt-10">
        <Header />
        <AdsList game={game} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const gameId = params.id
    const response = await api.get(`/games/${gameId}/ads`)
    const game = response.data.game

    return {
      props: {
        game
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}