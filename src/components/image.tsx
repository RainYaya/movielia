import { CustomComponentProps } from '../interfaces'
import { mergeClassName } from '../utils'

interface Props extends CustomComponentProps {
  src: string
}

export const Image = (props: Props) => {
  return (
    <div
      className={mergeClassName(
        'bg-primary rounded-lg overflow-hidden',
        props.className
      )}
    >
      <img
        src={props.src}
        className="min-h-[200px] w-full h-full object-cover"
      ></img>
    </div>
  )
}
