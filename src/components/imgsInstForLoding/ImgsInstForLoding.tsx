/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import imgsInstForLoding from './ImgsInstForLoding.module.scss';

interface PropsImgsInstForLoding {
  displayLoading: boolean;
  dataForTableImagesIntsForLoading: object[];
}

function ImgsInstForLoding(props: PropsImgsInstForLoding) {
  const { displayLoading, dataForTableImagesIntsForLoading } = props;

  return (
    <div className={imgsInstForLoding.wrap} hidden={displayLoading}>
      {dataForTableImagesIntsForLoading !== null
        ? dataForTableImagesIntsForLoading.map(item => (
            <div className={imgsInstForLoding.img} key={(item as any).id}>
              <img src={(item as any).img} alt="gray" />
            </div>
          ))
        : null}
    </div>
  );
}

export default ImgsInstForLoding;
