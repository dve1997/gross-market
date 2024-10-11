import { NavLink } from 'react-router-dom';

import header from './Header.module.scss';
import logo from 'src/shared/icons/logo.svg';
import phone from 'src/shared/icons/phone.svg';

function Header() {
  type OnShowbtnEmploymentForm = () => void;

  // Show button function button to go to the page with the candidate form for employment
  const onShowbtnEmploymentForm: OnShowbtnEmploymentForm = () => {
    document
      .querySelector(`.${header.btnEmploymentForm}`)
      ?.classList.add(`${header.btnEmploymentFormDisplay}`);
  };

  return (
    <header className={header.body}>
      <div className={header.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={header.contacts}>
        <div className={header.call}>+7 (926) 433-14-16</div>
        <NavLink
          to="/employmentForm"
          className={() => header.btnEmploymentForm}
        >
          заполнить анкету
        </NavLink>
        <div
          className={header.phone}
          onClick={onShowbtnEmploymentForm}
          role="button"
        >
          <img src={phone} alt="logo" />
        </div>
      </div>
    </header>
  );
}

export default Header;
