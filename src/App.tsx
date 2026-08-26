import { Suspense, lazy } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Landing from './pages/Landing'
import Practice from './pages/Practice'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const PracticeScreen = lazy(() => import('./pages/PracticeScreen'))
const Lessons = lazy(() => import('./pages/Lessons'))
const Teacher = lazy(() => import('./pages/Teacher'))
const Parent = lazy(() => import('./pages/Parent'))
const Connect = lazy(() => import('./pages/Connect'))

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
      <Suspense fallback={null}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/practice" element={<Practice />} />
          </Route>
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/practicescreen" element={<PracticeScreen />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/parent" element={<Parent />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
