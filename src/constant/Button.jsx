import React from 'react'

export const Button = ({content, color, background, event}) => {
  return (
    <div className={`text-[${color}] bg-[${background}] border-none px-2 py-1`} onClick={((e) => event)}>
        {content}
    </div>
  )
}