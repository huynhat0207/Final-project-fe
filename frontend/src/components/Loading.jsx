import React from 'react'
import LoadingDot from './Animation/LoadingDot'
function Loading(props) {
    const {title} = props;
    return (
        <div className='text-center flex flex-col items-center bg-white my-4 mx-0 w-80vw'>
            <LoadingDot/>
            <h3 className='text-3xl font-bold text-vivid-pink'>{title}</h3>
        </div>
    )
}

export default Loading