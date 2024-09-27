import slideForPositions from './SlideForPositions.module.scss';

interface PropsSlideForPositions {
  dataForSlider: object;
}
interface DataForSlider {
  id: string;
  name: string;
  img: string;
}

function SlideForPositions(props: PropsSlideForPositions) {
  const { dataForSlider } = props;

  return (
    <div className={slideForPositions.slide}>
      <div className={slideForPositions.img}>
        <img
          src={(dataForSlider as DataForSlider).img}
          alt={(dataForSlider as DataForSlider).name}
        />
      </div>
    </div>
  );
}

export default SlideForPositions;
