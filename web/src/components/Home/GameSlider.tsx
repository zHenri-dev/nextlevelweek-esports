import { useState } from 'react'

import { GameBanner } from './GameBanner'
import { CaretLeft, CaretRight } from 'phosphor-react'

import { Game } from '../../pages'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

interface GameSliderProps {
  games: Game[]
}

export function GameSlider({ games }: GameSliderProps) {
  const [isSliderLoaded, setIsSliderLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: 'free',
    slides: {
      perView: 6.3,
      spacing: 20,
    },
    breakpoints: {
      '(max-width: 80rem)': {
        slides: {
          perView: 5.5,
          spacing: 18,
        }
      },
      '(max-width: 73.75rem)': {
        slides: {
          perView: 4.7,
          spacing: 18,
        }
      },
      '(max-width: 67.5rem)': {
        slides: {
          perView: 4.8,
          spacing: 16,
        }
      },
      '(max-width: 61.25rem)': {
        slides: {
          perView: 4.2,
          spacing: 16,
        }
      },
      '(max-width: 55rem': {
        slides: {
          perView: 3.7,
          spacing: 14,
        }
      },
      '(max-width: 48.75rem)': {
        slides: {
          perView: 3.4,
          spacing: 14,
        }
      },
      '(max-width: 42.5rem': {
        slides: {
          perView: 2.8,
          spacing: 12,
        }
      },
      '(max-width: 36.25rem)': {
        slides: {
          perView: 2.2,
          spacing: 12,
        }
      },
      '(max-width: 30rem)': {
        slides: {
          perView: 1.5,
          spacing: 10,
        }
      },
      '(max-width: 23.75rem': {
        slides: {
          perView: 1.2,
          spacing: 10,
        }
      }
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setIsSliderLoaded(true)
    },
  })

  return (
    <div className="w-full relative mt-16 lg:mt-8 xl:w-[calc(100%-10rem)] lg:w-[calc(100%-4rem)]">
      {games?.length > 0 && (
        <>
          <div ref={sliderRef} className="keen-slider">
            {games?.map((game) => {
              return (
                <GameBanner
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  bannerUrl={game.bannerUrl}
                  adsCount={game._count.ads}
                />
              )
            })}
          </div>

          {isSliderLoaded && instanceRef.current && (
            <>
              <CaretLeft
                size={48}
                onClick={instanceRef.current.prev}
                className={`absolute top-[50%] -translate-y-[50%] -left-[4.5rem] text-zinc-400 cursor-pointer lg:hidden ${
                  currentSlide === 0 && 'opacity-40 cursor-default'
                }`}
              />

              <CaretRight
                size={48}
                onClick={instanceRef.current.next}
                className={`absolute top-[50%] -translate-y-[50%] -right-[4.5rem] text-zinc-400 cursor-pointer lg:hidden ${
                  currentSlide ===
                    instanceRef.current.track.details.slides.length - 1 &&
                  'opacity-40 cursor-default'
                }`}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
