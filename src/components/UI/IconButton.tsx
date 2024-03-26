import React from 'react'
import Button from './Button'
import type { LucideIcon } from 'lucide-react'

type Props = Parameters<typeof Button>[0] & {
  Icon: LucideIcon
  reverse?: boolean
}

const IconButton: React.FC<Props> = ({ children, Icon, reverse, className, ...props }: Props) => {
  return (
    <Button className={`flex ${!reverse ? "flex-row" : "flex-row-reverse"} items-center gap-1 ${className}`} {...props}>
      <span>
        <Icon className='' />
      </span>
      <span>{children}</span>
    </Button>
  )
}

export default IconButton
