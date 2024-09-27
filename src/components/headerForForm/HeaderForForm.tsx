import { NavLink } from 'react-router-dom';

import headerForForm from './HeaderForForm.module.scss';
import logo from '../../icon/logo.svg';

function HeaderForForm() {
  return (
    <div className={headerForForm.body}>
      <div className={headerForForm.wrap}>
        <div className={headerForForm.logo}>
          <img src={logo} alt="logo" />
        </div>
        <NavLink to="/" className={headerForForm.cross}>
          &times;
        </NavLink>
      </div>
    </div>
  );
}

export default HeaderForForm;
