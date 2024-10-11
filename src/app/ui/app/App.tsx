import { Routes, Route } from 'react-router-dom';

import HomePage from 'src/pages/homePage';
import ApplicationFormForEmploymentPage from 'src/pages/applicationFormForEmploymentPage';
import ErrorPage from 'src/pages/errorPage';
import ErrorBoundary from 'src/shared/ui/errorBoundery';

import './style/index.scss';

function App() {
  return (
    <div className="wrapper">
      <div className="indent">
        <div className="conteiner">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/employmentForm"
                element={<ApplicationFormForEmploymentPage />}
              />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default App;
