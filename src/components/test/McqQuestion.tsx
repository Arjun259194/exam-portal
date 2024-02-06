import { Question } from '@/utils/classes'
import React, { FC } from 'react'

type Props = Question

export const McqQuestion:FC<Props> = ({question,marks,options: option}) => {
  return (
    <div> 
      <p>question: <span>{question}</span></p>
        <p>marks: <span>{marks}</span></p>
        <div>
          {option.map(option => {
            return <p>{option}</p>
          })}
        </div>
    </div>
      
  )
}
