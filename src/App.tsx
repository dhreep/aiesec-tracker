import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import UploadSection from './components/upload/UploadSection';
import MetricsSection from './components/metrics/MetricsSection';
import LeadDetail from './components/dashboard/LeadDetail';
import { LeadsProvider } from './context/LeadsContext';
import { ToastProvider } from './context/ToastContext';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <LeadsProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<UploadSection />} />
              <Route path="/metrics" element={<MetricsSection />} />
              <Route path="/lead/:id" element={<LeadDetail />} />
            </Routes>
          </Layout>
        </Router>
      </LeadsProvider>
    </ToastProvider>
  );
};

export default App;
