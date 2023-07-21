import React from 'react'
import Header from './components/Header'

import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { Container } from 'react-bootstrap'

function App() {
  return (
    <>
    <div>
      <Header/>
      <ToastContainer />
      <Container className='my-2'>
      <Outlet/>
      </Container>
  
      
    </div>
    </>
  )
}

export default App
