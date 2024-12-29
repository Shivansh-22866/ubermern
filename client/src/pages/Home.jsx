import React from 'react'
import { UserDataContext } from '../context/UserContext'

const Home = () => {
  const {user, setUser} = React.useContext(UserDataContext)
  console.log(user)
  return (
    <div>
        Hello, {user.fullname.firstName} {" "} {user.fullname.lastName}
    </div>
  )
}

export default Home