import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/shared/hooks/hooksReduxUpdate';

import { fetchRespForSliderWithVacancies } from '../SliderWithVacanciesSlice';
import useSwitchingSlide from 'src/shared/hooks/hookSwithingSlides';

import SlideForSliderWithVacancies from 'src/entities/slideForSliderWithVacancies';
import Spinner from 'src/shared/ui/spinner';

import sliderWithVacancies from './SliderWithVacancies.module.scss';

function SliderWithVacancies() {
  const dispatch = useAppDispatch();
  const { slide, onSlideDown, onSlideUp } = useSwitchingSlide(0, 6);

  interface ReducerData {
    dataForSliderWithVacancies?: object | object[];
    statusLoadingDataForSliderWithVacancies?: string;
  }
  interface StateReducer {
    reducerSliderWithVacancies: ReducerData;
  }

  const dataForSliderWithVacancies = useAppSelector(
    (state: StateReducer) =>
      state.reducerSliderWithVacancies.dataForSliderWithVacancies,
  );
  const statusLoadingDataForSliderWithVacancies = useAppSelector(
    (state: StateReducer) =>
      state.reducerSliderWithVacancies.statusLoadingDataForSliderWithVacancies,
  );

  useEffect(() => {
    dispatch(fetchRespForSliderWithVacancies());
  }, [dispatch]);

  interface DataForSliderWithVacancies {
    id?: string;
    name?: string;
    img?: string;
  }

  return (
    <div className={sliderWithVacancies.body}>
      <div className={sliderWithVacancies.box}>
        <h3 className={sliderWithVacancies.title}>вакансии в гросс маркете</h3>
        <div className={sliderWithVacancies.arrows}>
          <div
            className={sliderWithVacancies.arrow}
            onClick={onSlideDown}
            role="button"
          >
            &#9668;
          </div>
          <div
            className={sliderWithVacancies.arrow}
            onClick={onSlideUp}
            role="button"
          >
            &#9658;
          </div>
        </div>
      </div>
      <div
        className={sliderWithVacancies.slides}
        style={{
          transform: `translateX(${slide * -23.12}rem)`,
          transition: 'transform 1s ease 0s',
        }}
      >
        {statusLoadingDataForSliderWithVacancies === 'loaded' ? (
          (dataForSliderWithVacancies as object[]).map(
            (vacancies: DataForSliderWithVacancies) => (
              <SlideForSliderWithVacancies
                vacancies={vacancies}
                key={vacancies.id}
              />
            ),
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default SliderWithVacancies;
