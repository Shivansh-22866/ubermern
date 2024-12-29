import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {CaptainDataContext} from '../context/CaptainContext'
import axios from 'axios'

const CaptainProtectedWrapper = ({children}) => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const {captain, setCaptain} = useContext(CaptainDataContext)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(!token) {
      navigate('/captainlogin')
    }
  }, [token])

  axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {headers: {Authorization: `Bearer ${token}`}})
  .then((response) => {
      setCaptain(response.data.captain)
      setIsLoading(false)
  })
  .catch((error) => {
    console.log(error)
    localStorage.removeItem('token')
    navigate('/captainlogin')
  })

  if(isLoading) {
    return (
        <div>Loading...</div>
    )
  }

  return (
    <>
        {children}
    </>
  )
}

export default CaptainProtectedWrapper