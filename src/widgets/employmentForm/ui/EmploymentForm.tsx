import { useAppSelector } from 'src/shared/hooks/hooksReduxUpdate';

import FormForRegistOnWork from 'src/features/formForRegistOnWork';
import ThanksForTheResponse from 'src/features/thanksForTheResponse';

import employmentForm from './EmploymentForm.module.scss';

function EmploymentForm() {
  interface ReducerData {
    toggleDisplayFormOrThanks?: boolean;
  }
  interface StateReducer {
    reducerEmploymentForm: ReducerData;
  }

  const toggleDisplayFormOrThanks = useAppSelector(
    (state: StateReducer) =>
      state.reducerEmploymentForm.toggleDisplayFormOrThanks,
  );

  return (
    <div className={employmentForm.body}>
      {toggleDisplayFormOrThanks === false ? (
        <FormForRegistOnWork />
      ) : (
        <ThanksForTheResponse />
      )}
    </div>
  );
}

export default EmploymentForm;
