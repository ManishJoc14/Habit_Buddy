import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../components/signup'

const OtherRoute = ({setIsAuthenticated}) => {
  return (
    <div>
       <Routes>
        <Route path="*" element={<Signup setIsAuthenticated={setIsAuthenticated}/>} />
      </Routes>
    </div>
  )
}

export default OtherRoute
