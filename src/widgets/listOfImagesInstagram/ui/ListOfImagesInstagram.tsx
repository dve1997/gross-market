import { useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/shared/hooks/hooksReduxUpdate';

import { fetchRespForListOfImagesInstagram } from '../ListOfImagesInstagramSlice';

import Spinner from 'src/shared/ui/spinner';

import listOfImagesInstagram from './ListOfImagesInstagram.module.scss';

// Classes for creating a table of images from Instagram
const classesForFirstFiveSlides = [
  listOfImagesInstagram.imgOne,
  listOfImagesInstagram.imgTwo,
  listOfImagesInstagram.imgThree,
  listOfImagesInstagram.imgFour,
  listOfImagesInstagram.imgFive,
];

function ListOfImagesInstagram() {
  const [quantityImg, setQuantityImg] = useState(5);
  const dispatch = useAppDispatch();

  interface ReducerData {
    dataForListOfImagesInstagram?: object | object[];
    statusLoadingDataForListOfImagesInstagram?: string;
  }
  interface StateReducer {
    reducerListOfImagesInstagram: ReducerData;
  }

  const dataForListOfImagesInstagram = useAppSelector(
    (state: StateReducer) =>
      state.reducerListOfImagesInstagram.dataForListOfImagesInstagram,
  );
  const statusLoadingDataForListOfImagesInstagram = useAppSelector(
    (state: StateReducer) =>
      state.reducerListOfImagesInstagram
        .statusLoadingDataForListOfImagesInstagram,
  );

  useEffect(() => {
    dispatch(fetchRespForListOfImagesInstagram(`?_limit=${quantityImg}`));
  }, [dispatch, quantityImg]);

  interface DataForListOfImagesInstagram {
    id?: string;
    img?: string;
  }

  type OnReloadingImagesForInstagram = () => void;

  // Image reloading feature for Instagram image list
  const onReloadingImagesForInstagram: OnReloadingImagesForInstagram = () => {
    setQuantityImg(quantityImg + 8);
  };

  return (
    <div className={listOfImagesInstagram.body}>
      <h3 className={listOfImagesInstagram.title}>мы в инстаграме</h3>
      <div className={listOfImagesInstagram.boxLoading}>
        {statusLoadingDataForListOfImagesInstagram === 'loaded' ? (
          (dataForListOfImagesInstagram as object[]).map(
            (images: DataForListOfImagesInstagram, i: number) => {
              if (i >= 0 && i < 5) {
                return (
                  <div className={classesForFirstFiveSlides[i]} key={images.id}>
                    <img src={images.img} alt="img" />
                  </div>
                );
              }
              return null;
            },
          )
        ) : (
          <Spinner />
        )}
      </div>
      <div
        className={
          quantityImg < 6
            ? listOfImagesInstagram.boxReloading
            : listOfImagesInstagram.boxReloadingDisplay
        }
      >
        {statusLoadingDataForListOfImagesInstagram === 'loaded' ? (
          (dataForListOfImagesInstagram as object[]).map(
            (images: DataForListOfImagesInstagram, i: number) => {
              if (i > 4) {
                return (
                  <div className={listOfImagesInstagram.img} key={images.id}>
                    <img src={images.img} alt="img" />
                  </div>
                );
              }
              return null;
            },
          )
        ) : (
          <Spinner />
        )}
      </div>
      <div
        className={listOfImagesInstagram.btn}
        onClick={onReloadingImagesForInstagram}
        role="button"
      >
        показать еще
      </div>
    </div>
  );
}

export default ListOfImagesInstagram;
