import React from 'react'

function LoadingDot() {
  return (
    <div className='block' style={{animationDelay:'0s'}}>
    <div className='h-10 w-10 rounded-full bg-white inline-block m-2 animate-[scaling_2.5s_ease-in-out_infinite]' style={{animationDelay: '0.2s'}}/>
    <div className='h-10 w-10 rounded-full bg-white inline-block m-2 animate-[scaling_2.5s_ease-in-out_infinite]' style={{animationDelay: '0.4s'}}/>
    <div className='h-10 w-10 rounded-full bg-white inline-block m-2 animate-[scaling_2.5s_ease-in-out_infinite]' style={{animationDelay: '0.6s'}}/>
    <div className='h-10 w-10 rounded-full bg-white inline-block m-2 animate-[scaling_2.5s_ease-in-out_infinite]' style={{animationDelay: '0.8s'}}/>
    <div className='h-10 w-10 rounded-full bg-white inline-block m-2 animate-[scaling_2.5s_ease-in-out_infinite]' style={{animationDelay: '1s'}}/>
    </div>
  )
}

export default LoadingDot