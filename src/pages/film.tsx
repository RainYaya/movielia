import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Image } from '../components/image'
import { Section } from '../components/section'
import { MediaType } from '../types'
import { Cast, Film as FilmInterface, Trailer } from '../interfaces'
import { useEffect, useState } from 'react'
import { Card } from '../components/card'
import { Slider } from '../components/slider/slider'
import {
  getCasts,
  getDetail,
  getRecommendations,
  getTrailers,
} from '../api/tmdb-api'
import { tmdbImageSrc, youtubeThumbnail } from '../utils'
import { useGlobalContext } from '../components/app-conrainer'
import { Loading } from '../components/loading'

interface Props {
  mediaType: MediaType
}

export const Film = (props: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams<any>()

  const [film, setFilm] = useState<FilmInterface | null | undefined>(null)
  const [casts, setCasts] = useState<Cast[]>([])
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [recommendations, setRecommendations] = useState<FilmInterface[]>([])

  const globalContext = useGlobalContext()

  const fetch = async () => {
    const film = await getDetail(props.mediaType, parseInt(id as string))

    if (film) {
      setFilm(film)
      setCasts(await getCasts(film.mediaType, film.id))
      setTrailers(await getTrailers(film.mediaType, film.id))
      setRecommendations(await getRecommendations(film.mediaType, film.id))
    }
  }

  useEffect(() => {
    setFilm(undefined)
    fetch()
  }, [location])

  if (film === null) {
    // redirect to 404 page
    return <></>
  } else if (film === undefined) {
    return (
      <div className="text-center p-6 h-full flex-1">
        <Loading></Loading>
      </div>
    )
  }
  
  return (
    <>
      {/* background */}
      <div className="h-[300px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <Image src={tmdbImageSrc(film.coverPath)}></Image>
      </div>
      {/* poster and text */}
      <Section className="-mt-[150px] flex items-center relative z-10 mobile:block">
        <Image
          src={tmdbImageSrc(film.posterPath)}
          className="w-[200px] min-w-[200px] h-[300px] mobile:mx-auto"
        ></Image>
        <div className="px-3 flex flex-col items-start gap-3">
          <p className="text-xl line-clamp-1">{film.title}</p>
          <ul className="flex items-center gap-3">
            {film.genreIds.map((id, i) => (
              <li
                key={id}
                className="px-3 py-1.5 bg-primary rounded-lg text-sm"
              >
                {
                  globalContext.genres[film.mediaType]?.find((g) => g.id === id)
                    ?.name
                }
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
                <Card imageSrc={tmdbImageSrc(cast.profilePath)} key={i}>
                  <p className="font-semibold">{cast.name}</p>
                  <p className="opacity-[0.9] text-sm">{cast.characterName}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Section>
      {/* trailers */}

      <Section title="Trailers" hidden={trailers.length === 0}>
        <div className="scrollbar scrollbar-thumb-primary overflow-y-hidden scrollbar-track-header">
          <div className="flex items-center gap-3 h-[300px]">
            {trailers.map((trailer, i) => (
              <Card
                // onClick={() => playTrailer(trailer.key)}
                imageSrc={youtubeThumbnail(trailer.key)}
                className="flex-shrink-0"
                key={i}
              ></Card>
            ))}
          </div>
        </div>
      </Section>
      {/* seasons */}

      <Section title="Seasons" hidden={film.seasons.length === 0}>
        <Slider
          slidesToShow={film.seasons.length > 2 ? 2 : 1}
          slidesToScroll={film.seasons.length > 2 ? 2 : 1}
          swipe={false}
        >
          {(_) =>
            film.seasons.map((season, i) => (
              <Card
                className="h-[300px]"
                onClick={() =>
                  navigate(`/tv/${film.id}/season/${season.seasonNumber}`)
                }
                title={season.name}
                imageSrc={tmdbImageSrc(season.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      {/* recommendations */}

      <Section title="Recommendations" hidden={recommendations.length === 0}>
        <Slider isMovieCard={true}>
          {(_) =>
            recommendations.map((film, i) => (
              <Card
                onClick={() => navigate(`/${props.mediaType}/${film.id}`)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
    </>
  )
}
