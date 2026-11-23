import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import ScrollToTop, { PageLoader } from './components/layout/ScrollToTop.jsx'
import { ToastProvider } from './components/ui/Toast.jsx'
import { AdsProvider } from './components/ads/AdsProvider.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Create = lazy(() => import('./pages/Create.jsx'))
const Templates = lazy(() => import('./pages/Templates.jsx'))
const Wish = lazy(() => import('./pages/Wish.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const Terms = lazy(() => import('./pages/Terms.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const RouteError = lazy(() => import('./pages/RouteError.jsx'))

export default function App() {
  return (
    <AdsProvider>
      <ToastProvider>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/wish" element={<Wish />} errorElement={<RouteError />} />
            <Route element={<Layout />} errorElement={<RouteError />}>
              <Route index element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ToastProvider>
    </AdsProvider>
  )
}
