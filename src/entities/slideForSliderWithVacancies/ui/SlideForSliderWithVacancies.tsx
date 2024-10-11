import slideForSliderWithVacancies from './SlideForSliderWithVacancies.module.scss';

interface DataForSliderWithVacancies {
  id?: string;
  name?: string;
  img?: string;
}
interface VacanciesProps {
  vacancies: DataForSliderWithVacancies;
}

function SlideForSliderWithVacancies(props: VacanciesProps) {
  const { vacancies } = props;
  const { img } = vacancies;

  return (
    <div className={slideForSliderWithVacancies.slide}>
      <img src={img} alt="img" />
    </div>
  );
}

export default SlideForSliderWithVacancies;
