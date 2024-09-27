import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks-redux-update';
import { fetchRespDataBaner } from '../../api/banerHomePageSlice';

import Spinner from '../spinner/Spinner';

import banner from './Banner.module.scss';

function Banner() {
  // State slide
  const [slide, setSlide] = useState(0);

  type UpdateSlide = () => void;

  // Slide zoom function
  const enlargeSlide: UpdateSlide = () => {
    if (slide >= 0 && slide < 1) {
      setSlide(slide + 1);
    } else {
      setSlide(0);
    }
  };

  // Slide zoom out function
  const downSlide: UpdateSlide = () => {
    if (slide > 0 && slide <= 1) {
      setSlide(slide - 1);
    } else {
      setSlide(1);
    }
  };

  const dispatch = useAppDispatch();

  const dataForBaner = useAppSelector(
    (state: any) => state.reducerDataBaner.dataForBaner,
  );
  const statusLoadingDataForBanner = useAppSelector(
    (state: any) => state.reducerDataBaner.statusLoadingDataForBanner,
  );

  useEffect(() => {
    // Request for images for banner
    dispatch(fetchRespDataBaner());
  }, []);

  return statusLoadingDataForBanner === 'loaded' ? (
    <div className={banner.body}>
      <div className={banner.nav}>
        <div className={banner.left} onClick={downSlide} role="button">
          &#9668;
        </div>
        <div className={banner.right} onClick={enlargeSlide} role="button">
          &#9658;
        </div>
      </div>
      <div className={banner.wrap}>
        <div
          className={banner.slides}
          style={{ transform: `translateX(${-100 * slide}%)` }}
        >
          <div className={banner.slide}>
            <div className={banner.descr}>
              <h1 className={banner.title}>{dataForBaner[0].title}</h1>
            </div>
            <div className={banner.view}>
              <img src={dataForBaner[0].img} alt="rovar" />
              <div className={banner.specialityViewOne}>
                <div className={banner.inf}>{dataForBaner[0].speciality}</div>
              </div>
              <div className={banner.nameViewOne}>
                <div className={banner.inf}>{dataForBaner[0].name}</div>
              </div>
            </div>
          </div>
          <div className={banner.slide}>
            <div className={banner.descr}>
              <h1 className={banner.title}>{dataForBaner[1].title}</h1>
            </div>
            <div className={banner.view}>
              <img src={dataForBaner[1].img} alt="commodityExpert" />
              <div className={banner.nameViewTwo}>
                <div className={banner.inf}>{dataForBaner[1].name}</div>
              </div>
              <div className={banner.specialityViewTwo}>
                <div className={banner.inf}>{dataForBaner[1].speciality}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
}

export default Banner;
