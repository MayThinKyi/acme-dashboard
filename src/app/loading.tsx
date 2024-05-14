'use client';
import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const LoadingPage = () => {
    return (
        <div className='flex items-center py-20 justify-center'>
            <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#2F6FEB"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default LoadingPage
