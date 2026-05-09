import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PageTransition } from './lib/animations';

// Layouts
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import SEO from './components/SEO';

// Public Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';

// Lazy Loaded Sections for better initial load performance
const Services = lazy(() => import('./components/sections/Services'));
const Portfolio = lazy(() => import('./components/sections/Portfolio'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Admin Pages (Lazy Loaded for Performance)
const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const BlogPage = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ResumePage = lazy(() => import('./pages/Resume'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Public Home Component
const Home = () => (
  <Layout>
    <SEO />
    <Hero />
    <About />
    <Suspense fallback={<div className="py-32 flex justify-center"><div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
    </Suspense>
  </Layout>
);

const FullPageLoader = () => (
  <div className="fixed inset-0 z-[100] flex-center bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] transition-opacity duration-500">
    <div className="relative flex flex-col items-center justify-center">
      <div className="absolute w-32 h-32 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute w-24 h-24 bg-purple-500/20 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
      <div className="relative z-10 w-16 h-16 mb-6">
        <svg className="w-full h-full animate-spin text-indigo-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold font-heading tracking-tight gradient-text mb-2">iqooow</h2>
        <div className="w-24 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '50%', transformOrigin: 'left' }}></div>
        </div>
      </div>
    </div>
    <style>{`
      @keyframes loading {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
    `}</style>
  </div>
);

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (pathname === '/') {
        // Only scroll to top on home page if no hash
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <Router>
      <ScrollToHash />
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'dark:bg-[#1a1a1a] dark:text-white',
          style: { borderRadius: '1rem', padding: '16px' }
        }} 
      />
      <Suspense fallback={<FullPageLoader />}>
        <PageTransition>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/resume" element={<ResumePage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </Suspense>
    </Router>
  );
}

export default App;
