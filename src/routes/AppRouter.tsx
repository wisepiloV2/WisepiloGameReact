import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { LoadingMenheraGif } from '../components/ui/LoadingMenheraGif';

const HomePage = lazy(() => import('../pages/HomePage'));
const GeoGridPage = lazy(() => import('../pages/GeoGridPage'));
const TicTacToePage = lazy(() => import('../pages/TicTacToePage'));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingMenheraGif message={'Espere un momento...'}/>}>
        <Routes>
          
          <Route path="/" element={<MainLayout />}>
            
            <Route index element={<HomePage />} /> 
            
            <Route path="geo-grid" element={< GeoGridPage />} />
            <Route path="tic-tac-toe" element={< TicTacToePage />} />
            
            <Route path="home" element={<Navigate to="/" replace />} />

          </Route>

          <Route path="*" element={<LoadingMenheraGif message={'Estoy trabajando en ello'}/>} /> 

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;