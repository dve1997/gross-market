import { NavLink } from 'react-router-dom';
import { useAppDispatch } from 'src/shared/hooks/hooksReduxUpdate';

import { updateDisplayFormOrThanks } from 'src/widgets/employmentForm/employmentFormSlice';

import headerForForm from './HeaderForForm.module.scss';
import logo from 'src/shared/icons/logo.svg';

function HeaderForForm() {
  const dispatch = useAppDispatch();

  return (
    <header className={headerForForm.body}>
      <div className={headerForForm.box}>
        <div className={headerForForm.logo}>
          <img src={logo} alt="logo" />
        </div>
        <NavLink
          to="/"
          className={headerForForm.cross}
          // Function to switch the displayed content on the page with the job candidate form
          onClick={() => dispatch(updateDisplayFormOrThanks(false))}
        >
          &times;
        </NavLink>
      </div>
    </header>
  );
}

export default HeaderForForm;
