import { useEffect, useState } from 'react'

import { Image } from '../components/image'
import { Section } from '../components/section'
import { Film } from '../interfaces'

export const Season = () => {
  const [film, setFilm] = useState<Film>({
    id: 0,
    title: `Lorem ipsum dolor sit, amet consectet`,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, a quia consectetur facere culpa cum quibusdam eos, asperiores, laboriosam dolorum perferendis eveniet minus recusandae dignissimos! Quas, at nemo. Maxime, veniam.`,
    coverPath: '',
    genreIds: [1, 2, 3, 4],
    posterPath: '',
    seasons: [
      {
        id: 1,
        seasonNumber: 1,
      },
      {
        id: 2,
        seasonNumber: 2,
      },
      {
        id: 3,
        seasonNumber: 3,
      },
    ],
    mediaType: 'tv',
  })

  const [season, setSeason] = useState<any[]>()

  const fetch = async () => {
    const arrs: any[] = []

    for (let i = 0; i < 12; i++) {
      arrs.push({})
    }
    setSeason(arrs)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      {/* background */}

      <div className="h-[150px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <Image src=""></Image>
      </div>
      {/* poster and text */}
      <Section className="-mt-[75px] flex items-center relative z-10 mobile:block">
        <Image
          src=""
          className="w-[150px] min-w-[150px] min-h-[200px] h-[200px] mobile:mx-auto"
        ></Image>
        <div className="px-3 flex flex-col items-start gap-3 py-3">
          <p className="text-xl line-clamp-1">
            Lorem ipsum dolor sit amet consectetur{' '}
          </p>
          <div className="flex items-center">
            <p className="text-sm opacity-[0.9]">{'test'}</p>
            <p className="text-sm opacity-[0.9] ml-1">
              &#8226; {season?.length} episodes
            </p>
          </div>
        </div>
      </Section>
      {/* episodes */}
      <Section title="Episodes">
        {season?.map((episode, i) => (
          <div
            className="my-6 flex items-stretch gap-4 rounded-md overflow-hidden cursor-pointer hover:bg-primary px-3 py-1.5 mobile:block"
            key={i}
          >
            <Image
              src=""
              className="min-w-[300px] max-w-[350] w-[300px] h-[300px]"
            ></Image>
            <div className="overflow-hidden flex flex-col gap-3 mobile:py-3">
              <p className="text-lg truncate">
                lorem ipsum dolor sit amet consectetur adipisicing elit. lorem
                ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum
                dolor sit amet consectetur adipisicing elit. lorem ipsum dolor
                sit amet consectetur adipisicing elit.
              </p>
              <p className="opacity-[0.9] line-clamp-5">
                {' '}
                lorem ipsum dolor sit amet consectetur adipisicing elit. lorem
                ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum
                dolor sit amet consectetur adipisicing elit. lorem ipsum dolor
                sit amet consectetur adipisicing elit.
              </p>
              <div className="mt-auto pt-3 text-right">22 november 2023</div>
            </div>
          </div>
        ))}
      </Section>
    </>
  )
}
