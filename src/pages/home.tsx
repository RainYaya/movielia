import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getInTheaters, getPopulars, getTopRated, getTrendings } from '../api/tmdb-api'
import { Card } from '../components/card'

import { Section } from '../components/section'
import { Slider } from '../components/slider/slider'
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
  const [topRatedTv, setTopratedTv] = useState<Film[]>([])
  const [topRatedMovie, setTopratedMovie] = useState<Film[]>([])

  const fetchTopRatedMovie = async () => {
    setTopratedMovie(await getTopRated('movie'))
  }
  const fetchTopRatedTv = async () => {
    setTopratedTv(await getTopRated('tv'))
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
      {/* trendings */}
      <Section className="py-0">
        <Slider
          className="slick-hero"
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {(onSwipe) =>
            trendings.map((film, i) => (
              <TrendingHero
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
      <Section title="In Theaters">
        <Slider
          autoplay={true}
          slidesToScroll={5}
          isMovieCard={true}
          slidesToShow={5}
        >
          {(_) =>
            inTheaters.map((film, i) => (
              <Card
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>

      {/* populars */}
      <Section title="Top Rated TV">
        <Slider
          autoplay={true}
          slidesToScroll={5}
          isMovieCard={true}
          slidesToShow={5}
        >
          {(_) =>
            populars.map((film, i) => (
              <Card
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>

      {/* top rated tv */}

      <Section title="Top Rated TV">
        <Slider
          autoplay={true}
          slidesToScroll={5}
          isMovieCard={true}
          slidesToShow={5}
        >
          {(_) =>
            topRatedTv.map((film, i) => (
              <Card
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      {/*  to rated movies */}
      <Section title="Top Rated movies">
        <Slider
          autoplay={true}
          slidesToScroll={5}
          isMovieCard={true}
          slidesToShow={5}
        >
          {(_) =>
            topRatedMovie.map((film, i) => (
              <Card
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
