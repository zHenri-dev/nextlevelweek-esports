import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { api } from '../lib/axios';

import { Header } from '../components/Home/Header';
import { GameSlider } from '../components/Home/GameSlider';
import { CreateAdBanner } from '../components/Home/CreateAdBanner';

export interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

interface HomeProps {
  games: Game[]
}

export default function Home({ games }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Find Your Duo</title>
      </Head>

      <div className="max-w-[1408px] mx-auto flex flex-col items-center mb-24">
        <Header />
        <GameSlider games={games} />
        <CreateAdBanner games={games} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get('/games')
  const games = response.data.games

  return {
    props: {
      games
    }
  }
}
