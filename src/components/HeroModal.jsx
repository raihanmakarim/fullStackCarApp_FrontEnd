import React from 'react'

const HeroModal = ({ children,top }) => (
  <div className='absolute  left-1/2 transform -translate-x-1/2 w-3/4 px-16 py-8 h-max shadow-md bg-white'
    style={{ top: top ? top : "50%" }}
  >{children}</div>
)

export default HeroModal