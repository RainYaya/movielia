import { useEffect, useState } from 'react'

import { Section } from '../components/section'
import { Slider } from '../components/slider/slider'
import { TrendingHero } from '../components/trending-hero'
import { Film } from '../interfaces'

/*
 * @Author: RainYaya
 * @Date: 2023-03-19 15:58:04
 * @LastEditors: RainYaya
 * @LastEditTime: 2023-03-19 17:12:42
 * @Description:
 */
export const Home = () => {
  const [trendings, setTrendings] = useState<Film[]>([])

  const fetchTrendings = () => {
    const arrs: Film[] = []

    for (let i = 0; i < 6; i++) {
      arrs.push({
        id: i,
        title:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, a quia consectetur facere culpa cum quibusdam eos, asperiores, laboriosam dolorum perferendis eveniet minus recusandae dignissimos! Quas, at nemo. Maxime, veniam.',
        coverPath: '',
        genreIds: [1, 2, 3, 4, 5, 6],
        posterPath: '',
        seasons: [],
      })
    }

    setTrendings(arrs)
  }

  useEffect(() => {
    fetchTrendings()
  }, [])

  return (
    <div>
      {/* trendings */}
      <Section className="py-0">
              <Slider
                  className="slick-hero"
                  autoplay={true}
                  slidesToScroll={1}
                  slidesToShow={1}
              >
          {trendings.map((film, i) => (
            <TrendingHero film={film} key={i}></TrendingHero>
          ))}
        </Slider>
      </Section>
      {/*  in theaters */}
      {/* populars */}
      {/* top rated tv */}
      {/*  to rated movies */}
    </div>
  )
}
