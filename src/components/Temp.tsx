'use client'

import React from 'react'
import toast from 'react-hot-toast'
import Button from './UI/Button'

const Temp = () => {
  return <Button variant="secondary" onClick={() => toast.success("Hello")}>Click</Button>
}

export default Temp