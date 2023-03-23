import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getInTheaters,
  getPopulars,
  getTopRated,
  getTrailers,
  getTrendings,
} from '../api/tmdb-api'
import { Card } from '../components/card'

import { Section } from '../components/section'
import { Slider } from '../components/slider/slider'
import { TrailerModal } from '../components/trailer-modal'
import { TrendingHero } from '../components/trending-hero'
import { Film } from '../interfaces'
import { isFilm, mergeFilms, tmdbImageSrc } from '../utils'

/*
 * @Author: RainYaya
 * @Date: 2023-03-19 15:58:04
 * @LastEditors: RainYaya
 * @LastEditTime: 2023-03-19 17:12:42
 * @Description:
 */
export const Home = () => {
  const navigate = useNavigate()
  const [trendings, setTrendings] = useState<Film[]>([])
  const [inTheaters, setInTheaters] = useState<Film[]>([])
  const [populars, setPopulars] = useState<Film[]>([])
  const [topRatedTv, setTopRatedTv] = useState<Film[]>([])
  const [topRatedMovie, setTopRatedMovie] = useState<Film[]>([])

  const [trailerSrc,setTrailerSrc]=useState('')

  const playTrailer = async (film: Film) => {
    
    console.log(film);
    
    const trailers = await getTrailers(film.mediaType, film.id)

    setTrailerSrc(`https://www.youtube.com/embed/${trailers[0].key}?autoplay=0`)
  }
  
  const goToDetailPage = (film: Film) => {
    navigate(`/${film.mediaType}/${film.id}`)
  }

  const fetchTopRatedMovie = async () => {
    setTopRatedMovie(await (await getTopRated('movie')).films)
  }

  const fetchTopRatedTv = async () => {
    setTopRatedTv(await (await getTopRated('tv')).films)
  }

  const fetchPopulars = async () => {
    const movies = await getPopulars('movie')
    const tvs = await getPopulars('tv')

    setPopulars(mergeFilms(movies, tvs, 20))
  }

  const fetchInTheaters = async () => {
    setInTheaters(await getInTheaters())
  }

  const fetchTrendings = async () => {
    const movies = await getTrendings('movie')
    const tvs = await getTrendings('tv')

    setTrendings(mergeFilms(movies, tvs))
  }

  //#region fetch
  // const fetch = () => {
  //   const arrs: Film[] = []

  //   for (let i = 0; i < 6; i++) {
  //     arrs.push({
  //       id: i,
  //       mediaType: 'movie',
  //       title:
  //         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ',
  //       description:
  //         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, a quia consectetur facere culpa cum quibusdam eos, asperiores, laboriosam dolorum perferendis eveniet minus recusandae dignissimos! Quas, at nemo. Maxime, veniam.',
  //       coverPath: '',
  //       genreIds: [1, 2, 3, 4, 5, 6],
  //       posterPath: '',
  //       seasons: [],
  //     })
  //   }

  //   setTrendings(arrs)
  //   setInTheaters(arrs)

  // }
  //#endregion
  useEffect(() => {
    // fetch()
    fetchTrendings()
    fetchInTheaters()
    fetchPopulars()
    fetchTopRatedMovie()
    fetchTopRatedTv()
  }, [])

  return (
    <div>
      <TrailerModal src={trailerSrc} onHide={() => setTrailerSrc('')}></TrailerModal>
      {/* trendings */}
      <Section className="py-0" hidden={trendings.length===0}>
        <Slider
          className="slick-hero"
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {(onSwipe) =>
            trendings.map((film, i) => (
              <TrendingHero
                onPlayTrailer={() => playTrailer(film)}
                onClick={() =>
                  !onSwipe ? navigate(`/${film.mediaType}/${film.id}`) : ''
                }
                film={film}
                key={i}
              ></TrendingHero>
            ))
          }
        </Slider>
      </Section>
      {/*  in theaters */}
      <Section title="In Theaters" hidden={inTheaters.length===0}>
        <Slider
          autoplay={true}
          slidesToScroll={5}
          isMovieCard={true}
          slidesToShow={5}
        >
          {(_) =>
            inTheaters.map((film, i) => (
              <Card
                onClick={() => goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>

      {/* populars */}
      <Section
        title="Top Rated TV"
        hidden={populars.length===0}
      >
        <Slider
          autoplay={true}
          slidesToScroll={5}
          isMovieCard={true}
          slidesToShow={5}
        >
          {(_) =>
            populars.map((film, i) => (
              <Card
                onClick={() => goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>

      {/* top rated tv */}

      <Section title="Top Rated TV" hidden={topRatedTv.length===0} onTitleClick={() => navigate(`/list/top-rated-tv`)}>
        <Slider
          autoplay={true}
          slidesToScroll={5}
          isMovieCard={true}
          slidesToShow={5}
        >
          {(_) =>
            topRatedTv.map((film, i) => (
              <Card
                onClick={() => goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      {/*  to rated movies */}
      <Section title="Top Rated movies" hidden={topRatedMovie.length===0} onTitleClick={() => navigate(`/list/top-rated-movies`)}>
        <Slider
          autoplay={true}
          slidesToScroll={5}
          isMovieCard={true}
          slidesToShow={5}
        >
          {(_) =>
            topRatedMovie.map((film, i) => (
              <Card
                onClick={() => goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
    </div>
  )
}
