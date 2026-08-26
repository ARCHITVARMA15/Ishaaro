import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Connect from './pages/Connect'
import Landing from './pages/Landing'
import LandingPage from './pages/LandingPage'
import Lessons from './pages/Lessons'
import Parent from './pages/Parent'
import Practice from './pages/Practice'
import PracticeScreen from './pages/PracticeScreen'
import Teacher from './pages/Teacher'

function SiteLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/parent" element={<Parent />} />
          <Route path="/connect" element={<Connect />} />
        </Route>
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/practicescreen" element={<PracticeScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
