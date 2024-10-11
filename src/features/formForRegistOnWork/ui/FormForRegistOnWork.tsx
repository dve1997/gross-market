import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MaskedInput from 'react-text-mask';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/shared/hooks/hooksReduxUpdate';

import {
  updateDisplayFormOrThanks,
  fetchRespDataForSelectWithVacancies,
  fetchRespSubmittingCandidatesForEmployment,
} from 'src/widgets/employmentForm/employmentFormSlice';

import Spinner from 'src/shared/ui/spinner';

import formForRegistOnWork from './formForRegistOnWork.module.scss';
import loading from 'src/shared/icons/loading.svg';

const phoneNumberMask = [
  '+',
  '7',
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

function FormForRegistOnWork() {
  const dispatch = useAppDispatch();

  interface ReducerData {
    dataForSelectWithVacancies?: object | object[];
    statusLoadingDataForFormVacancies?: string;
  }
  interface StateReducer {
    reducerEmploymentForm: ReducerData;
  }

  const dataForSelectWithVacancies = useAppSelector(
    (state: StateReducer) =>
      state.reducerEmploymentForm.dataForSelectWithVacancies,
  );
  const statusLoadingDataForFormVacancies = useAppSelector(
    (state: StateReducer) =>
      state.reducerEmploymentForm.statusLoadingDataForFormVacancies,
  );

  useEffect(() => {
    // Request for vacancies for form field
    dispatch(fetchRespDataForSelectWithVacancies());
  }, [dispatch]);

  interface DataForSliderWithVacancies {
    id?: string;
    vacancy?: string;
  }

  return statusLoadingDataForFormVacancies === 'loaded' ? (
    <>
      <h1 className={formForRegistOnWork.title}>Работа твоей мечты</h1>
      <div className={formForRegistOnWork.box}>
        <Formik
          initialValues={{
            vacancy: '',
            fio: '',
            dateOfBirth: '',
            floor: '',
            contactPhoneNumber: '',
            email: '',
            resume: '',
            captchaRobot: '',
            captchaConsent: '',
            id: '',
          }}
          validationSchema={Yup.object().shape({
            vacancy: Yup.string().required('поле обязательно для заполнения'),
            fio: Yup.string()
              .min(10, 'минимальное количетсво символов 10')
              .required('поле обязательно для заполнения'),
            dateOfBirth: Yup.string().required(
              'поле обязательно для заполнения',
            ),
            contactPhoneNumber: Yup.string()
              .test(
                'lengthNumber',
                'поле не заполнено до конца',
                (value: string | undefined) => {
                  const valLengthWithoutDashes = (value as string).replace(
                    /-|_/g,
                    '',
                  ).length;
                  return valLengthWithoutDashes === 15;
                },
              )
              .required('поле обязательно для заполнения'),
            email: Yup.string().email('поле заполнено не корректно'),
            captchaRobot: Yup.boolean().required(
              'поле обязательно для заполнения',
            ),
            captchaConsent: Yup.boolean().required(
              'поле обязательно для заполнения',
            ),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // eslint-disable-next-line no-param-reassign
            values.id = uuidv4();
            // Request to add job candidates to the server
            dispatch(fetchRespSubmittingCandidatesForEmployment(values));
            setSubmitting(false);
            resetForm();
            // Updating the state of the displayed UI command on the page with the form
            dispatch(updateDisplayFormOrThanks(true));
          }}
        >
          {({ isSubmitting, handleChange, handleBlur }) => (
            <Form className={formForRegistOnWork.form}>
              <div className={formForRegistOnWork.fields}>
                <h3 className={formForRegistOnWork.subtitle}>Вакансия*</h3>
                <Field
                  as="select"
                  id="vacancy"
                  name="vacancy"
                  className={formForRegistOnWork.field}
                >
                  <option value="" key="0">
                    выберите вакансию
                  </option>
                  {(dataForSelectWithVacancies as object[]).map(
                    (vacancy: DataForSliderWithVacancies) => (
                      <option value={vacancy.vacancy} key={vacancy.id}>
                        {vacancy.vacancy}
                      </option>
                    ),
                  )}
                </Field>
                <ErrorMessage
                  name="vacancy"
                  component="div"
                  className={formForRegistOnWork.errorMessage}
                />
              </div>
              <div className={formForRegistOnWork.fields}>
                <h3 className={formForRegistOnWork.subtitle}>ФИО*</h3>
                <Field
                  as="input"
                  id="fio"
                  name="fio"
                  placeholder="Введите ФИО"
                  className={formForRegistOnWork.field}
                />
                <ErrorMessage
                  name="fio"
                  component="div"
                  className={formForRegistOnWork.errorMessage}
                />
              </div>
              <div className={formForRegistOnWork.group}>
                <div className={formForRegistOnWork.fields}>
                  <h3 className={formForRegistOnWork.subtitle}>
                    Дата рождения*
                  </h3>
                  <Field
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className={formForRegistOnWork.field}
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className={formForRegistOnWork.errorMessage}
                  />
                </div>
                <div className={formForRegistOnWork.fields}>
                  <h3 className={formForRegistOnWork.subtitle}>Пол</h3>
                  <div className={formForRegistOnWork.checks}>
                    <div>
                      <Field
                        as="input"
                        type="radio"
                        name="floor"
                        value="мужской"
                      />
                      <span>мужской</span>
                    </div>
                    <div>
                      <Field
                        as="input"
                        type="radio"
                        name="floor"
                        value="женский"
                      />
                      <span>женский</span>
                    </div>
                    <ErrorMessage
                      name="floor"
                      component="div"
                      className={formForRegistOnWork.errorMessage}
                    />
                  </div>
                </div>
                <div className={formForRegistOnWork.fields}>
                  <h3 className={formForRegistOnWork.subtitle}>
                    Контактный телефон*
                  </h3>
                  <Field
                    render={({ field }: { field: object }) => (
                      <MaskedInput
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...field}
                        mask={phoneNumberMask}
                        placeholder="+7 ("
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={formForRegistOnWork.field}
                      />
                    )}
                    name="contactPhoneNumber"
                  />
                  <ErrorMessage
                    name="contactPhoneNumber"
                    component="div"
                    className={formForRegistOnWork.errorMessage}
                  />
                </div>
                <div className={formForRegistOnWork.fields}>
                  <h3 className={formForRegistOnWork.subtitle}>
                    Электронная почта
                  </h3>
                  <Field
                    id="email"
                    name="email"
                    placeholder="example@mail.com"
                    className={formForRegistOnWork.field}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={formForRegistOnWork.errorMessage}
                  />
                </div>
              </div>
              <div className={formForRegistOnWork.fields}>
                <h3 className={formForRegistOnWork.subtitle}>Резюме</h3>
                <div className={formForRegistOnWork.borderFile}>
                  <Field type="file" id="resume" name="resume" />
                </div>
                <ErrorMessage
                  name="resume"
                  component="div"
                  className={formForRegistOnWork.errorMessage}
                />
              </div>
              <div className={formForRegistOnWork.fields}>
                <h3 className={formForRegistOnWork.subtitle}>Капча</h3>
                <div className={formForRegistOnWork.wrapField}>
                  <div className={formForRegistOnWork.wrapCheckRobot}>
                    <div>
                      <Field
                        as="input"
                        type="checkbox"
                        id="captchaRobot"
                        name="captchaRobot"
                        className={formForRegistOnWork.checkRobot}
                      />
                      <span>я не робот</span>
                    </div>
                    <div className={formForRegistOnWork.img}>
                      <img src={loading} alt="loading" />
                    </div>
                  </div>
                  <div className={formForRegistOnWork.subtitleField}>
                    * поля для обязательного заполнения
                  </div>
                </div>
                <ErrorMessage
                  name="captchaRobot"
                  component="div"
                  className={formForRegistOnWork.errorMessage}
                />
              </div>
              <div className={formForRegistOnWork.fields}>
                <div className={formForRegistOnWork.wrapCheckAgreement}>
                  <Field
                    as="input"
                    type="checkbox"
                    id="captchaConsent"
                    name="captchaConsent"
                    className={formForRegistOnWork.checkAgreement}
                  />
                  <div className={formForRegistOnWork.descr}>
                    я подтверждаю согласие на обработку персональных данных и
                    принимаю условия рассмотрения обращений *
                  </div>
                </div>
                <ErrorMessage
                  name="captchaConsent"
                  component="div"
                  className={formForRegistOnWork.errorMessage}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={formForRegistOnWork.btn}
              >
                отправить
              </button>
            </Form>
          )}
        </Formik>
        <div className={formForRegistOnWork.inf}>
          <h3 className={formForRegistOnWork.ourGoal}>Наша суперцель</h3>
          <div className={formForRegistOnWork.descrGoal}>
            <p> — стать любимым магазином для каждой российской семьи.</p>
            <p>
              Сотни тысяч наших сотрудников ежедневно работают над её
              достижением.
            </p>
            <p>
              Мы уверены, что в ближайшие годы достигнем этого и будет
              здорово,если вместе с тобой.
            </p>
          </div>
          <div className={formForRegistOnWork.phoneForCall}>
            +7 (926) 433-14-16
          </div>
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
}

export default FormForRegistOnWork;
