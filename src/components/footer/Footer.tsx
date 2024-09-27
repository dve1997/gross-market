import footer from './Footer.module.scss';
import logo from '../../icon/logo.svg';
import facebook from '../../icon/facebook.svg';
import vk from '../../icon/vk.svg';

function Footer() {
  return (
    <div className={footer.body}>
      <div className={footer.wrap}>
        <div className={footer.inf}>
          <div className={footer.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={footer.share}>поделиться</div>
          <div className={footer.contacts}>
            <div>
              <img src={facebook} alt="facebook" />
            </div>
            <div>
              <img src={vk} alt="vk" />
            </div>
          </div>
        </div>
        <div className={footer.links}>
          <div className={footer.label}>© Гросс маркет 2020</div>
          <div className={footer.police}>
            <a href="#">Политика обработки персональных данных</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
