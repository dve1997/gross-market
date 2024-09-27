import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks-redux-update';
import {
  fetchRespDataTableImagesInts,
  fetchRespDataTableImagesIntsForLoading,
} from '../../api/tableImagesInstHomePageSlice';

import ImgsInstForLoding from '../imgsInstForLoding/ImgsInstForLoding';
import Spinner from '../spinner/Spinner';

import tableImagesInst from './TableImagesInst.module.scss';

function TableImagesInst() {
  // State display loading data
  const [displayLoading, setDisplayLoading] = useState(true);

  const dispatch = useAppDispatch();

  const statusLoadingDataForTableImagesInts = useAppSelector(
    (state: any) =>
      state.reducerDataTableImagesInst.statusLoadingDataForTableImagesInts,
  );
  const dataForTableImagesInts = useAppSelector(
    (state: any) => state.reducerDataTableImagesInst.dataForTableImagesInts,
  );
  const dataForTableImagesIntsForLoading = useAppSelector(
    (state: any) =>
      state.reducerDataTableImagesInst.dataForTableImagesIntsForLoading,
  );

  type LoadingDataForTableInst = () => void;

  // Data loading function for instagram table
  const loadingDataForTableInst: LoadingDataForTableInst = () => {
    // Request for images to load acardion
    dispatch(fetchRespDataTableImagesIntsForLoading('?_start=5&_limit=8'));
    setDisplayLoading(false);
  };

  useEffect(() => {
    // Request for images for acardion
    dispatch(fetchRespDataTableImagesInts('?_start=0&_limit=5'));
  }, []);

  return statusLoadingDataForTableImagesInts === 'loaded' ? (
    <div className={tableImagesInst.body}>
      <div className={tableImagesInst.descr}>
        <h1 className={tableImagesInst.title}>мы в инстаграмме</h1>
      </div>
      <div className={tableImagesInst.wrap}>
        <div className={tableImagesInst.imgOne}>
          <img src={dataForTableImagesInts[0].img} alt="gray1" />
        </div>
        <div className={tableImagesInst.imgTwo}>
          <img src={dataForTableImagesInts[1].img} alt="gray2" />
        </div>
        <div className={tableImagesInst.imgThree}>
          <img src={dataForTableImagesInts[2].img} alt="gray3" />
        </div>
        <div className={tableImagesInst.imgFour}>
          <img src={dataForTableImagesInts[3].img} alt="gray4" />
        </div>
        <div className={tableImagesInst.imgFive}>
          <img src={dataForTableImagesInts[4].img} alt="gray5" />
        </div>
      </div>
      <ImgsInstForLoding
        displayLoading={displayLoading}
        dataForTableImagesIntsForLoading={dataForTableImagesIntsForLoading}
      />
      <div
        className={tableImagesInst.btn}
        onClick={loadingDataForTableInst}
        role="button"
      >
        показать еще
      </div>
    </div>
  ) : (
    <Spinner />
  );
}

export default TableImagesInst;
