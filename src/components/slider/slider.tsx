import './slider.css'

import Slick, { Settings } from 'react-slick'

interface Props extends Settings {
  isMovieCard?: boolean
  isSeasonCard?: boolean
}

export const Slider = (props: Props) => {

  let settings: Settings = {
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
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        }
      ]
    }
  }

  return (
    <Slick {...settings} autoplaySpeed={5000}>
      {props.children}
    </Slick>
  )
}
