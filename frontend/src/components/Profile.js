import React, { useContext } from 'react'
import { Context } from '..'
import { SignedOutComponent } from './Home';

const Profile = () => {
  const { isAuth } = useContext(Context);
  return (
    <>
      {
        isAuth ?
          <h1>Profile</h1>
          : <SignedOutComponent />
      }
    </>
  )
}

export default Profile
