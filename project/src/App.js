import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import Header from './components/Layout/Header.js';
import Footer from './components/Layout/Footer.js';
import Hero from './components/Home/Hero.js';
import AnnouncementCarousel from './components/Home/AnnouncementCarousel.js';
import ClubsSection from './components/Clubs/ClubsSection.js';
import LoginModal from './components/Auth/LoginModal.js';
import AdminDashboard from './components/Dashboard/AdminDashboard.js';

// ✅ Import your custom component
import Register from './Register.jsx';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  // ✅ Handle navigation based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === '#login') {
        setIsLoginModalOpen(true);
        setCurrentView('home'); // Show login modal over home
      } else if (hash === '#dashboard' && user && user.role !== 'student') {
        setCurrentView('dashboard');
      } else if (hash === '#register') {
        setCurrentView('register');
      } else {
        setCurrentView('home');
        setIsLoginModalOpen(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Handle initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // ✅ Show dashboard for admin
  if (currentView === 'dashboard' && user && user.role !== 'student') {
    return <AdminDashboard />;
  }

  // ✅ Show register page
  if (currentView === 'register') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onMenuToggle={toggleMobileMenu} 
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <main className="p-6">
          <Register />
        </main>
        <Footer />
      </div>
    );
  }

  // ✅ Default home page
  return (
    <div className="min-h-screen bg-white">
      <Header 
        onMenuToggle={toggleMobileMenu} 
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <main>
        <Hero />
        <AnnouncementCarousel />
        <ClubsSection />
      </main>

      <Footer />

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          window.location.hash = '';
        }}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
