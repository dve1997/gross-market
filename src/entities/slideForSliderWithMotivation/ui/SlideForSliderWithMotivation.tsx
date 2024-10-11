import slideForSliderWithMotivation from './SlideForSliderWithMotivation.module.scss';

interface DataForSliderWithMotivation {
  id?: string;
  title?: string;
  speciality?: string;
  name?: string;
  img?: string;
}
interface MotivationProps {
  motivation: DataForSliderWithMotivation;
  onSlideDown: () => void;
  onSlideUp: () => void;
}

function SlideForSliderWithMotivation(props: MotivationProps) {
  const { motivation, onSlideDown, onSlideUp } = props;
  const { title, speciality, name, img } = motivation;

  return (
    <div className={slideForSliderWithMotivation.slide}>
      <div className={slideForSliderWithMotivation.box}>
        <h1 className={slideForSliderWithMotivation.title}>{title}</h1>
        <div className={slideForSliderWithMotivation.arrows}>
          <div
            className={slideForSliderWithMotivation.arrow}
            onClick={onSlideDown}
            role="button"
          >
            &#9668;
          </div>
          <div
            className={slideForSliderWithMotivation.arrow}
            onClick={onSlideUp}
            role="button"
          >
            &#9658;
          </div>
        </div>
      </div>
      <div className={slideForSliderWithMotivation.img}>
        <img src={img} alt="img" />
        <div className={slideForSliderWithMotivation.vacancy}>{speciality}</div>
        <div className={slideForSliderWithMotivation.name}>{name}</div>
      </div>
    </div>
  );
}

export default SlideForSliderWithMotivation;
