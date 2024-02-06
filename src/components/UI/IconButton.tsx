import React from 'react'
import Button from './Button'
import type { LucideIcon } from 'lucide-react'

type Props = Parameters<typeof Button>[0] & {
    Icon: LucideIcon
}

const IconButton: React.FC<Props> = ({ children, Icon, className, ...props }) => {
    return (
        <Button className={`flex items-center gap-1 ${className}`} {...props}>
            <span>
                <Icon className='' />
            </span>
            <span>{children}</span>
        </Button>
    )
}

export default IconButton