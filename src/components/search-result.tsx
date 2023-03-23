import { useEffect, useRef, useState } from 'react'
import { search } from '../api/tmdb-api'
import { Film } from '../interfaces'
import { tmdbImageSrc } from '../utils'
import { Image } from './image'
import { useGlobalContext } from './app-conrainer'
import { useNavigate } from 'react-router-dom'

interface Props {
  keyword: string
  goToSearchPage: Function
}

export const SearchResult = (props: Props) => {
  const [items, setItems] = useState<Film[]>([])

  const [totalItem, setTotalItem] = useState(0)

  const searchTimeout = useRef<any>('')

  const globalContext = useGlobalContext()

  const navigate=useNavigate()

  const fetch = async () => {
    if (!props.keyword) return

    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(async () => {
      const res = await search(props.keyword)
      setItems(res.films)
      setTotalItem(res.totalResults)
    }, 120)
  }

  useEffect(() => {
    fetch()
  }, [props.keyword])

  return (
    <div
      className="
            absolute
            top-[48px]
            left-0
            right-0
            rounded-md
            overflow-auto
            bg-header
            max-h-[480px]
            
        "
    >
      <div className="scrollbar-thin scrollbar-thumb-primary scrollbar-track-header">
        {items.map((film, i) => (
          <div
            key={i}
            onClick={()=>navigate(`/${film.mediaType}/${film.id}`)}
            className="
                        flex
                        items-start
                        p-1.5 rounded-lg
                        hover:bg-primary
                        cursor-pointer
                        m-1.5
                        "
          >
            {/* image */}
            <Image
              src={tmdbImageSrc(film.posterPath)}
              className="h-[72px] min-w-[102px] w-[102px] rounded-md"
            ></Image>
            {/* title &&page */}
            <div className="px-3 truncate">
              <p className="text-base truncate">{film.title}</p>
              <ul className=" flex flex-wrap gap-x-1.5 text-sm opacity-[0.7]">
                {film.genreIds.map((id, i) => (
                  <li key={i}>
                    {
                      globalContext.genres[film.mediaType].find(
                        (g) => g.id === id
                      )?.name
                    }
                    {i != film.genreIds.length - 1 ? ',' : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      {totalItem > 5 ? (
        <button
          onClick={() => props.goToSearchPage()}
          className="px-3 py-1.5 bg-primary w-full mx-1 hover:text-body sticky -bottom-3 shadow-lg "
        >
          More results
        </button>
      ) : (
        ''
      )}
    </div>
  )
}
