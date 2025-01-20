import React, { useState } from 'react'
import { UserDataContext } from '../context/UserContext'

const Home = () => {
  const {user, setUser} = React.useContext(UserDataContext)
  console.log(user)

  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();


  }
  return (
    <div className='h-screen relative'>
        <img src='/uberlogo.png' className='w-16 absolute left-5 top-5' />

        <div className='h-screen w-screen'></div>
        <div className='flex flex-col justify-end h-screen absolute bottom-0 w-full p-5 '>
          <div className='h-[30%] p-5 bg-white relative'>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <input className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4' type='text' value={pickup} 
            onClick={() => {setIsPanelOpen(true)}}
            onChange={(e) => {setPickup(e.target.value)}} placeholder='Add a pick up location' />
            <div className='absolute left-10 top-[115px] h-[60px] w-[2px] bg-black transform -translate-y-[50%]'></div>
            <input className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4' type='text' value={dropoff}
            onClick={() => {setIsPanelOpen(true)}}
            onChange={(e) => {setDropoff(e.target.value)}} placeholder='Add a drop off location' />
          </form>
          </div>
          <div className='h-[70%] h-[0] p-0 p-5 bg-red-500'></div>
        </div>
    </div>
  )
}

export default Home