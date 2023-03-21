import { useEffect, useState } from 'react'
import { Film } from '../interfaces'
import { Image } from './image'

interface Props {
  keyword: string
  goToSearchPage: Function
}

export const SearchResult = (props: Props) => {
  const [items, setItems] = useState<Film[]>([])

    const [totalItem,setTotalItem]=useState(6)
    
  const fetch = () => {
    const arrs: Film[] = []

    for (let i = 0; i < 6; i++) {
      arrs.push({
        id: i,
        mediaType: 'tv',
        title:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, a quia consectetur facere culpa cum quibusdam eos, asperiores, laboriosam dolorum perferendis eveniet minus recusandae dignissimos! Quas, at nemo. Maxime, veniam.',
        description: 'description',
        coverPath: '',
        genreIds: [1, 2, 3, 4, 5, 6],
        posterPath: '',
        seasons: [],
      })
    }

    setItems(arrs)
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
      {items.map((film, i) => (
        <div
          key={i}
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
          <Image src="" className="h-[72px] min-w-[102px] rounded-md"></Image>
          {/* title &&page */}
          <div className="px-3 truncate">
            <p className="text-base truncate">{film.title}</p>
            <ul className=" flex flex-wrap gap-x-1.5 text-sm opacity-[0.7]">
              {film.genreIds.map((id, i) => (
                <li key={i}> items{i}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

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
