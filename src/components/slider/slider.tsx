import './slider.css'

import Slick, { Settings } from 'react-slick'
import { useState } from 'react'

interface Props extends Omit<Settings, 'children'> {
  isMovieCard?: boolean
  isSeasonCard?: boolean
  children: (onSwipe: boolean) => React.ReactNode
}

export const Slider = (props: Props) => {
  let settings: Omit<Settings, 'children'> = {
    ...props,
  }
  if (props.isMovieCard) {
    settings = {
      ...settings,
      slidesToShow: 5,
      slidesToScroll: 1,
      infinite: true,
      swipe: false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    }
  }

  const [onSwipe, setOnSwipe] = useState(false)

  return (
    <Slick
      {...settings}
      autoplaySpeed={5000}
      onSwipe={() => setOnSwipe(true)}
      afterChange={() => setOnSwipe(false)}
    >
      {props.children ? props.children(onSwipe) : ''}
    </Slick>
  )
}
