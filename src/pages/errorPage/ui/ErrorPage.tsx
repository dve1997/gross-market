import errorPage from './ErrorPage.module.scss';
import error from '../../../shared/images/error.png';

function ErrorPage() {
  return (
    <main className={errorPage.error}>
      <h1 className={errorPage.title}>
        An error occurred, the specified page does not exist.
      </h1>
      <img src={error} alt="error" />
    </main>
  );
}

export default ErrorPage;
