import React from 'react'
import { cn } from '../lib/utils'

const Spinner = ({className} : {className? : string}) => {
  return (
    <div className={cn("h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin", className)} />
  )
}

export default Spinner