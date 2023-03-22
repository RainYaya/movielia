import { CustomComponentProps } from '../interfaces'
import { mergeClassName } from '../utils'

interface Props extends CustomComponentProps {
  src: string
}


export const Image = ({ className = 'h-full', src = '', }: Props) => {
  
  return (
    <div
      className={mergeClassName('bg-primary w-full  overflow-hidden', className)}
    >
      
      <img src={src} className="w-full h-full object-cover"></img>
    </div>
  )
}
