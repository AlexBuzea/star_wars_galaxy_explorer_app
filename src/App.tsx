import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import { queryClient } from './lib/queryClient';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ResourceListPage from './pages/ResourceListPage';
import ResourceDetailPage from './pages/ResourceDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import './index.css';

function App() {
  useEffect(() => {
    // Welcome message when React app loads
    console.log('%c🌟 Star Wars Galaxy Explorer 🌟', 'color: #FFE81F; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
    console.log('%cMay the Force be with you!', 'color: #FFE81F; font-size: 14px; font-style: italic;');
    console.log('%cExplore characters, planets, species, starships, vehicles, and films from a galaxy far, far away...', 'color: #94A3B8; font-size: 12px;');
    console.log('%cBuilt with React, TypeScript, Redux Toolkit, React Query, and Tailwind CSS', 'color: #64748B; font-size: 10px;');
  }, []);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="people" element={<ResourceListPage resourceType="people" />} />
              <Route path="people/:id" element={<ResourceDetailPage resourceType="people" />} />
              <Route path="planets" element={<ResourceListPage resourceType="planets" />} />
              <Route path="planets/:id" element={<ResourceDetailPage resourceType="planets" />} />
              <Route path="species" element={<ResourceListPage resourceType="species" />} />
              <Route path="species/:id" element={<ResourceDetailPage resourceType="species" />} />
              <Route path="starships" element={<ResourceListPage resourceType="starships" />} />
              <Route path="starships/:id" element={<ResourceDetailPage resourceType="starships" />} />
              <Route path="vehicles" element={<ResourceListPage resourceType="vehicles" />} />
              <Route path="vehicles/:id" element={<ResourceDetailPage resourceType="vehicles" />} />
              <Route path="films" element={<ResourceListPage resourceType="films" />} />
              <Route path="films/:id" element={<ResourceDetailPage resourceType="films" />} />
              <Route path="404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;