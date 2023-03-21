import { useNavigate, useParams } from 'react-router-dom'
import { Image } from '../components/image'
import { Section } from '../components/section'
import { MediaType } from '../types'
import { Cast, Film as FilmInterface, Trailer } from '../interfaces'
import { useEffect, useState } from 'react'
import { Card } from '../components/card'
import { Slider } from '../components/slider/slider'

interface Props {
  mediaType: MediaType
}

export const Film = (props: Props) => {
  const navigate = useNavigate()
  const { params } = useParams()

  const [casts, setCasts] = useState<Cast[]>([])
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [recommendations, setRecommendations] = useState<FilmInterface[]>([])

  const fetch = () => {
    const arrs: any[] = []

    for (let i = 0; i < 20; i++) {
      arrs.push({})
    }

    setCasts(arrs)
    setTrailers(arrs)
    setRecommendations(arrs)
  }

  useEffect(() => {
    fetch()
  }, [])

  const [film, setFilm] = useState<FilmInterface>({
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
    mediaType: props.mediaType,
  })

  return (
    <>
      {/* background */}
      <div className="h-[300px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <Image src=""></Image>
      </div>
      {/* poster and text */}
      <Section className="-mt-[150px] flex items-center relative z-10 mobile:block">
        <Image
          src=""
          className="w-[100px] min-w-[200px] h-[300px] mobile:mx-auto"
        ></Image>
        <div className="px-3 flex flex-col items-start gap-3">
          <p className="text-xl line-clamp-1">{film.title}</p>
          <ul className="flex items-center gap-3">
            {film.genreIds.map((genreId, i) => (
              <li className="px-3 py-1.5  bg-primary rounded-lg  text-sm">
                item{i}
              </li>
            ))}
          </ul>
          <p className="line-clamp-3 opacity-[0.9]">{film.description}</p>
        </div>
      </Section>

      {/* cast */}
      <Section title="Casts">
        <div className="scrollbar scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-full overflow-x-scroll overflow-y-hidden">
          <div className="flex items-center gap-3">
            {casts.map((cast, i) => (
              <div className="flex-shrink-0 min-w-[200px] max-w-[200px] my-3">
                <Card imageSrc="" key={i} title="lorem ipsumlorem"></Card>
              </div>
            ))}
          </div>
        </div>
      </Section>
      {/* trailers */}

      <Section title="Trailers">
        <div className="scrollbar scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-full overflow-x-scroll overflow-y-hidden">
          <div className="flex items-center gap-3">
            {casts.map((cast, i) => (
              <div className="flex-shrink-0  w-[300px] my-3">
                <Card imageSrc="" key={i} title="lorem ipsumlorem"></Card>
              </div>
            ))}
          </div>
        </div>
      </Section>
      {/* seasons */}

      <Section title="Seasons">
        <Slider slidesToScroll={2} slidesToShow={2} swipe={false}>
          {film.seasons.map((seasons, i) => (
            <Card
              title={`Season ${seasons.seasonNumber}`}
              onClick={() => navigate(`/tv/${film.id}/season/${seasons.id}`)}
              imageSrc=""
              key={i}
            ></Card>
          ))}
        </Slider>
      </Section>
      {/* recommendations */}

      <Section title="recommendations">
        <Slider
          autoplay={true}
          slidesToScroll={5}
          isMovieCard={true}
          slidesToShow={5}
        >
          {recommendations.map((film, i) => (
            <Card title={film.title} imageSrc="" key={i}></Card>
          ))}
        </Slider>
      </Section>
    </>
  )
}
