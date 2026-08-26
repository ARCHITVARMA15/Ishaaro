import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Connect from './pages/Connect'
import Landing from './pages/Landing'
import Lessons from './pages/Lessons'
import Parent from './pages/Parent'
import Practice from './pages/Practice'
import Teacher from './pages/Teacher'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/parent" element={<Parent />} />
            <Route path="/connect" element={<Connect />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
