/*
 * @Author: RainYaya
 * @Date: 2023-03-19 15:58:44
 * @LastEditors: RainYaya
 * @LastEditTime: 2023-03-19 16:01:31
 * @Description:
 */

import { useEffect, useState } from 'react'
import { Film } from '../interfaces'
import { MediaType } from '../types'
import { Image } from '../components/image'
import { Section } from '../components/section'
import { Card } from '../components/card'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface Props {
  type: MediaType | 'search'
}

export const Catalog = (props: Props) => {
  let title = ''
  
  const navigate = useNavigate()

  const [films, setFilm] = useState<Film[]>([])
  const [params, _] = useSearchParams()

  switch (props.type) {
    case 'movie':
      title = 'Movies'
      break
    
    case 'tv':
      title = 'TV'
      break
    
    case 'search':
      title = `Search results for <i>${params.get('q')}</i>`
      break
    
    default:
      break
  }

  const fetch = () => {
    let arrs: any = []

    for (let i = 0; i < 20; i++) {
      arrs.push({
        title: `Lorem ipsum dolor sit, amet consectet`,
      })
    }

    setFilm(arrs)
  }

  // useEffect(() => {
  //   setFilms([])
  //   fetch()
  // }, [location])

  useEffect(() => {
    // window.addEventListener('scroll', onWindowScroll)

    // return () => {
    //   window.removeEventListener('scroll', onWindowScroll)
    // }
    fetch()
  }, [])
  return (
    <>
      {/* background */}
      <div className="h-[120px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <div className="h-full w-full bg-primary"></div>
      </div>
      {/* PAGE TITLE */}
      <Section
        className="-mt-[90px] flex items-center relative z-10"
        title={title}
      ></Section>
      {/* Films */}
      <Section>
        <div className="grid lg:grid-cols-5 sm:grid-cols-4 mobile:grid-cols-3 relative z-[11]">
          {films.map((film, i) => (
            <div key={i}>
              <Card
                onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
                imageSrc=""
                title={film.title}
                key={i}
              ></Card>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
