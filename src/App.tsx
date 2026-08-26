import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import HandPoseLoader from './components/HandPoseLoader'
import Nav from './components/Nav'
import PageTransition from './components/PageTransition'

const Landing = lazy(() => import('./pages/Landing'))
const Practice = lazy(() => import('./pages/Practice'))
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

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <HandPoseLoader size={96} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<SiteLayout />}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Landing />
              </PageTransition>
            }
          />
          <Route
            path="/practice"
            element={
              <PageTransition>
                <Practice />
              </PageTransition>
            }
          />
        </Route>
        <Route
          path="/landingpage"
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          }
        />
        <Route
          path="/practicescreen"
          element={
            <PageTransition>
              <PracticeScreen />
            </PageTransition>
          }
        />
        <Route
          path="/lessons"
          element={
            <PageTransition>
              <Lessons />
            </PageTransition>
          }
        />
        <Route
          path="/teacher"
          element={
            <PageTransition>
              <Teacher />
            </PageTransition>
          }
        />
        <Route
          path="/parent"
          element={
            <PageTransition>
              <Parent />
            </PageTransition>
          }
        />
        <Route
          path="/connect"
          element={
            <PageTransition>
              <Connect />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
