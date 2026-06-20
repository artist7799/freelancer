import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts & UI Components
import GlassNavbar from './components/layouts/GlassNavbar';
import Footer from './components/layouts/Footer';
import SearchEverywhereModal from './components/layouts/SearchEverywhereModal';
import ToastContainer from './components/ui/ToastContainer';

// Pages
import Home from './pages/Home';
import Colleges from './pages/Colleges';
import CollegeDetails from './pages/CollegeDetails';
import Compare from './pages/Compare';
import Exams from './pages/Exams';
import ExamDetails from './pages/ExamDetails';
import Scholarships from './pages/Scholarships';
import CareerPaths from './pages/CareerPaths';
import Resources from './pages/Resources';
import Reviews from './pages/Reviews';
import News from './pages/News';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Blog from './pages/Blog';
import CommonApplication from './pages/CommonApplication';
import OnlineCourses from './pages/OnlineCourses';
import CollegePredictor from './pages/CollegePredictor';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { EducationLoan } from './pages/EducationLoan';
import { ReAdmission } from './pages/ReAdmission';

import ProtectedRoute from './components/ProtectedRoute';

// Initialize React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen relative overflow-hidden bg-app-bg text-app-text">
          {/* Global UI Overlays */}
          <GlassNavbar />
          <SearchEverywhereModal />
          <ToastContainer />

          {/* Main Pages Content Grid */}
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/colleges" element={<Colleges />} />
              <Route path="/colleges/:id" element={<CollegeDetails />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/exams/:id" element={<ExamDetails />} />
              <Route path="/scholarships" element={<Scholarships />} />
              <Route path="/careers" element={<CareerPaths />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/news" element={<News />} />
              <Route path="/events" element={<Events />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/online-courses" element={<OnlineCourses />} />
              <Route
                path="/common-application"
                element={<CommonApplication />}
              />
              <Route path="/college-predictor" element={<CollegePredictor />} />
              <Route path="/education-loan" element={<EducationLoan />} />
              <Route path="/re-admission" element={<ReAdmission />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
