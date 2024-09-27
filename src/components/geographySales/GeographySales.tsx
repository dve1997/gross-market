import { useRef } from 'react';

import geographySales from './GeographySales.module.scss';
import map from '../../images/map.jpg';
import dot from '../../images/dot.svg';
import scale from '../../images/scale.svg';

function GeographySales() {
  const refBtnLegalEntities = useRef<HTMLButtonElement>(null);
  const refBtnIndividuals = useRef<HTMLButtonElement>(null);
  const refBtnAll = useRef<HTMLButtonElement>(null);

  type ClassAssignmentBtn = (event: React.MouseEvent<HTMLElement>) => void;

  // Function of changing the activity class of buttons and displaying dots
  const classAssignmentBtn: ClassAssignmentBtn = e => {
    if (e.target === refBtnLegalEntities.current) {
      refBtnLegalEntities.current?.classList.add(geographySales.btnActive);
      refBtnIndividuals.current?.classList.remove(geographySales.btnActive);
      refBtnAll.current?.classList.remove(geographySales.btnActive);
      document
        .querySelectorAll('[data-type="individuals"]')
        .forEach(item => item.setAttribute('hidden', ''));
      document
        .querySelectorAll('[data-type="legal entities"]')
        .forEach(item => item.removeAttribute('hidden'));
    } else if (e.target === refBtnIndividuals.current) {
      refBtnLegalEntities.current?.classList.remove(geographySales.btnActive);
      refBtnIndividuals.current?.classList.add(geographySales.btnActive);
      refBtnAll.current?.classList.remove(geographySales.btnActive);
      document
        .querySelectorAll('[data-type="legal entities"]')
        .forEach(item => item.setAttribute('hidden', ''));
      document
        .querySelectorAll('[data-type="individuals"]')
        .forEach(item => item.removeAttribute('hidden'));
    } else {
      refBtnLegalEntities.current?.classList.remove(geographySales.btnActive);
      refBtnIndividuals.current?.classList.remove(geographySales.btnActive);
      refBtnAll.current?.classList.add(geographySales.btnActive);
      document
        .querySelectorAll('[data-type="legal entities"]')
        .forEach(item => item.removeAttribute('hidden'));
      document
        .querySelectorAll('[data-type="individuals"]')
        .forEach(item => item.removeAttribute('hidden'));
    }
  };

  return (
    <div className={geographySales.body}>
      <div className={geographySales.descr}>
        <h1 className={geographySales.title}>география</h1>
      </div>
      <div className={geographySales.img}>
        <img src={map} alt="map" className={geographySales.map} />
        <img
          src={dot}
          alt="dot"
          className={geographySales.dotOne}
          data-type="legal entities"
        />
        <img
          src={dot}
          alt="dot"
          className={geographySales.dotTwo}
          data-type="legal entities"
        />
        <img
          src={dot}
          alt="dot"
          className={geographySales.dotThree}
          data-type="legal entities"
        />
        <img
          src={dot}
          alt="dot"
          className={geographySales.dotFour}
          data-type="legal entities"
        />
        <img
          src={dot}
          alt="dot"
          className={geographySales.dotFive}
          data-type="legal entities"
        />
        <img
          src={dot}
          alt="dot"
          className={geographySales.dotSix}
          data-type="individuals"
        />
        <img
          src={dot}
          alt="dot"
          className={geographySales.dotSeven}
          data-type="individuals"
        />
        <img
          src={dot}
          alt="dot"
          className={geographySales.dotEight}
          data-type="individuals"
        />
        <img
          src={dot}
          alt="dot"
          className={geographySales.dotNine}
          data-type="individuals"
        />
        <img
          src={dot}
          alt="dot"
          className={geographySales.dotTen}
          data-type="individuals"
        />
      </div>
      <div className={geographySales.box}>
        <button
          className={geographySales.btn}
          onClick={classAssignmentBtn}
          ref={refBtnLegalEntities}
        >
          юрлица
        </button>
        <button
          className={geographySales.btn}
          onClick={classAssignmentBtn}
          ref={refBtnIndividuals}
        >
          физлица
        </button>
        <button
          className={`${geographySales.btn} ${geographySales.btnActive}`}
          onClick={classAssignmentBtn}
          ref={refBtnAll}
        >
          показать всё
        </button>
      </div>
      <div className={geographySales.scale}>
        <img src={scale} alt="scale" />
      </div>
    </div>
  );
}

export default GeographySales;
