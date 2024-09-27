import HeaderForForm from '../../components/headerForForm/HeaderForForm';
import FormOrGratitude from '../../components/formOrGratitude/FormOrGratitude';
import Footer from '../../components/footer/Footer';

import applicationFormForEmploymentPage from './ApplicationFormForEmploymentPage.module.scss';

function ApplicationFormForEmploymentPage() {
  return (
    <div className={applicationFormForEmploymentPage.box}>
      <HeaderForForm />
      <FormOrGratitude />
      <Footer />
    </div>
  );
}

export default ApplicationFormForEmploymentPage;
