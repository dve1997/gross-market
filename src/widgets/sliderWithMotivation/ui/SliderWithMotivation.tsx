import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/shared/hooks/hooksReduxUpdate';

import { fetchRespForSliderWithMotivation } from '../sliderWithMotivationSlice';
import useSwitchingSlide from 'src/shared/hooks/hookSwithingSlides';

import SlideForSliderWithMotivation from 'src/entities/slideForSliderWithMotivation';
import Spinner from 'src/shared/ui/spinner';

import sliderWithMotivation from './SliderWithMotivation.module.scss';

function SliderWithMotivation() {
  const dispatch = useAppDispatch();
  const { slide, onSlideDown, onSlideUp } = useSwitchingSlide(0, 1);

  interface ReducerData {
    dataForSliderWithMotivation?: object | object[];
    statusLoadingDataForSliderWithMotivation?: string;
  }
  interface StateReducer {
    reducerSliderWithMotivation: ReducerData;
  }

  const dataForSliderWithMotivation = useAppSelector(
    (state: StateReducer) =>
      state.reducerSliderWithMotivation.dataForSliderWithMotivation,
  );
  const statusLoadingDataForSliderWithMotivation = useAppSelector(
    (state: StateReducer) =>
      state.reducerSliderWithMotivation
        .statusLoadingDataForSliderWithMotivation,
  );

  useEffect(() => {
    dispatch(fetchRespForSliderWithMotivation());
  }, [dispatch]);

  interface DataForSliderWithMotivation {
    id?: string;
    title?: string;
    speciality?: string;
    name?: string;
    img?: string;
  }

  return (
    <div
      className={sliderWithMotivation.body}
      style={{
        transform: `translateX(${slide * -50}%)`,
        transition: 'transform 1s ease 0s',
      }}
    >
      {statusLoadingDataForSliderWithMotivation === 'loaded' ? (
        (dataForSliderWithMotivation as object[]).map(
          (motivation: DataForSliderWithMotivation) => (
            <SlideForSliderWithMotivation
              onSlideDown={onSlideDown}
              onSlideUp={onSlideUp}
              motivation={motivation}
              key={motivation.id}
            />
          ),
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default SliderWithMotivation;
