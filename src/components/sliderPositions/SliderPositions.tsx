import { useEffect, useState } from 'react';

import { fetchRespDataSlider } from '../../api/sliderHomePageSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks-redux-update';

import SlideForPositions from '../slideForPositions/SlideForPositions';
import Spinner from '../spinner/Spinner';

import sliderPositions from './SliderPositions.module.scss';

function SliderPositions() {
  // State slide
  const [slide, setSlide] = useState(0);

  type UpdateSlide = () => void;

  // Slide zoom function
  const enlargeSlide: UpdateSlide = () => {
    if (slide >= 0 && slide < 6) {
      setSlide(slide + 1);
    } else {
      setSlide(0);
    }
  };

  // Slide zoom out function
  const downSlide: UpdateSlide = () => {
    if (slide > 0 && slide <= 6) {
      setSlide(slide - 1);
    } else {
      setSlide(6);
    }
  };

  const dispatch = useAppDispatch();

  const dataForSlider = useAppSelector(
    (state: any) => state.reducerDataSlider.dataForSlider,
  );
  const statusLoadingDataForSlider = useAppSelector(
    (state: any) => state.reducerDataSlider.statusLoadingDataForSlider,
  );

  useEffect(() => {
    // Request to get images for slider
    dispatch(fetchRespDataSlider());
  }, []);

  return (
    <div className={sliderPositions.body}>
      <div className={sliderPositions.descr}>
        <h1 className={sliderPositions.title}>вакансии в гросс маркете</h1>
        <div className={sliderPositions.nav}>
          <div
            className={sliderPositions.left}
            onClick={downSlide}
            role="button"
          >
            &#9668;
          </div>
          <div
            className={sliderPositions.right}
            onClick={enlargeSlide}
            role="button"
          >
            &#9658;
          </div>
        </div>
      </div>
      <div className={sliderPositions.view}>
        <div
          className={sliderPositions.slides}
          style={{ transform: `translateX(${-369 * slide}px)` }}
        >
          {statusLoadingDataForSlider === 'loaded' ? (
            dataForSlider.map((data: any) => (
              <SlideForPositions dataForSlider={data} key={data.id} />
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}

export default SliderPositions;
