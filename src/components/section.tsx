import { CustomComponentProps } from '../interfaces'
import { Container } from './container'

interface Props extends CustomComponentProps {
  title?: string
}

export const Section = (props: Props) => {
  return (
    <Container className={props.className}>
      {props.title ? (
        <h1 className="text-xl px-3 py-2" dangerouslySetInnerHTML={
          {__html: props.title}
        }></h1>
      ) : (
        ''
      )}
      {props.children}
    </Container>
  )
}
