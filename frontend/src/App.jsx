import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AddCandidate from './pages/AddCandidate';
import CandidateList from './pages/CandidateList';
import JobMatching from './pages/JobMatching';
import AIRecommendations from './pages/AIRecommendations';
import { CandidateProvider } from './context/CandidateContext';

function App() {
  return (
    <CandidateProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-candidate" element={<AddCandidate />} />
            <Route path="/candidates" element={<CandidateList />} />
            <Route path="/matching" element={<JobMatching />} />
            <Route path="/ai-recommendations" element={<AIRecommendations />} />
          </Routes>
        </Layout>
      </Router>
    </CandidateProvider>
  );
}

export default App;
