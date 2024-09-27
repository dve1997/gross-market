import { useAppSelector } from '../../hooks/hooks-redux-update';

import FormForRegistWork from '../formForRegistWork/FormForRegistWork';
import ThanksForTheResponse from '../thanksForTheResponse/ThanksForTheResponse';

import formOrGratitude from './FormOrGratitude.module.scss';

function FormOrGratitude() {
  const toggleDisplayFormOrThanks = useAppSelector(
    (state: any) =>
      state.reducerDataForSelectWithVacancies.toggleDisplayFormOrThanks,
  );

  return (
    <div className={formOrGratitude.body}>
      {toggleDisplayFormOrThanks === false ? (
        <FormForRegistWork />
      ) : (
        <ThanksForTheResponse />
      )}
    </div>
  );
}

export default FormOrGratitude;
