import HeaderForForm from 'src/features/headerForForm';
import EmploymentForm from 'src/widgets/employmentForm';
import Footer from 'src/features/footer';

import applicationFormForEmploymentPage from './ApplicationFormForEmploymentPage.module.scss';

function ApplicationFormForEmploymentPage() {
  return (
    <main className={applicationFormForEmploymentPage.body}>
      <HeaderForForm />
      <EmploymentForm />
      <Footer />
    </main>
  );
}

export default ApplicationFormForEmploymentPage;
