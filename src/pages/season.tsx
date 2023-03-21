
import { useState } from "react"

import { Image } from "../components/image"
import { Section } from "../components/section"
import { Film } from "../interfaces"

export const Season = () => {

    const [film, setFilm] = useState<Film>({
        id: 0,
        title: `Lorem ipsum dolor sit, amet consectet`,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, a quia consectetur facere culpa cum quibusdam eos, asperiores, laboriosam dolorum perferendis eveniet minus recusandae dignissimos! Quas, at nemo. Maxime, veniam.`,
        coverPath: '',
        genreIds: [1, 2, 3, 4],
        posterPath: '',
        seasons: [{
            id: 1,
            seasonNumber: 1,
        }, {
            id: 2,
            seasonNumber: 2,
            }, {
            id: 3,
            seasonNumber: 3,
            }],
        mediaType: 'tv',        
    }
    )

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
          className="w-[150px] min-w-[150px] h-[200px] mobile:mx-auto"
        ></Image>
        <div className="px-3 flex flex-col items-start gap-3">
          <p className="text-xl line-clamp-1">{film.title}</p>
          
          <p className="opacity-[0.9]">Season 1</p>
        </div>
      </Section>
    </>
  )
}
