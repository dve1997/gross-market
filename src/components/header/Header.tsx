import { NavLink } from 'react-router-dom';

import header from './Header.module.scss';
import logo from '../../icon/logo.svg';
import phone from '../../icon/phone.svg';

function Header() {
  type ToggleBtn = () => void;

  // Function of showing the button to fill out the questionnaire
  const toggleBtn: ToggleBtn = () => {
    document.querySelector('a')?.classList.toggle(header.btnActive);
  };

  return (
    <div className={header.body}>
      <div className={header.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={header.communications}>
        <div className={header.call}>+7 (926) 433-14-16</div>
        <NavLink to="/applicationFormForEmployment" className={header.btn}>
          заполнить анкету
        </NavLink>
      </div>
      <div className={header.phone} role="button" onClick={toggleBtn}>
        <img src={phone} alt="phone" />
      </div>
    </div>
  );
}

export default Header;
