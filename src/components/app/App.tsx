import { Routes, Route } from 'react-router-dom';

import HomePage from '../../pages/homePage/HomePage';
import ApplicationFormForEmploymentPage from '../../pages/applicationFormForEmploymentPage/ApplicationFormForEmploymentPage';
import ErrorPage from '../../pages/errorPage/ErrorPage';

import './style/index.scss';

function App() {
  return (
    <div className="wrapper">
      <div className="conteiner">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/applicationFormForEmployment"
            element={<ApplicationFormForEmploymentPage />}
          />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
