import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import AppRoutes from './routes/AppRoutes'

const App:React.FC = () => {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Nav/>

        <main className='flex-grow pt-14'>
          <AppRoutes/>
        </main>

        <Footer/>
      </div>
    </Router>
  )
}

export default App