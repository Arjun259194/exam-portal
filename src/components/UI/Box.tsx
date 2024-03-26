import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className: string
}
const Box = (props: Props) => {
  return (
    <div className={`comic-box border-2 border-black ${props.className}`}>{props.children}</div>
  )
}

export default Box
