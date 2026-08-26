import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import HandPoseLoader from './components/HandPoseLoader'
import PageTransition from './components/PageTransition'
import { LanguageProvider } from './i18n/LanguageContext'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const PracticeScreen = lazy(() => import('./pages/PracticeScreen'))
const Lessons = lazy(() => import('./pages/Lessons'))
const Teacher = lazy(() => import('./pages/Teacher'))
const Parent = lazy(() => import('./pages/Parent'))
const Connect = lazy(() => import('./pages/Connect'))

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
        <Route
          path="/"
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          }
        />
        <Route
          path="/practice"
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
      <LanguageProvider>
        <Suspense fallback={<LoadingScreen />}>
          <AnimatedRoutes />
        </Suspense>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
