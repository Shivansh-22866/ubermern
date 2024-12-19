import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='bg-[url(/uber-hero.jpg)] bg-cover bg-center h-screen pt-5 flex justify-between flex-col w-full bg-red-400'>
            <img className='w-16 ml-8' src='/uberlogo.png' />
            <div className='bg-white flex flex-col pb-7 items-start text-center py-5 px-4'>
                <h2 className='text-3xl font-bold'>Get started with Uber</h2>
                <Link to={"/login"} className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home