import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function MainLayout() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#171717'
    }}>
      
      <Navbar />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
      
      <Footer />
      
    </div>
  );
};

export default MainLayout;