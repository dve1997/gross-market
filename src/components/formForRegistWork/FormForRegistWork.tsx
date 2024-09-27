import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MaskedInput from 'react-text-mask';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks-redux-update';

import {
  updateDisplayFormOrThanks,
  fetchRespDataForSelectWithVacancies,
  fetchRespSubmittingCandidatesForEmployment,
} from '../../api/formApplicationFormForEmploymentPage';

import Spinner from '../spinner/Spinner';

import formForRegistWork from './FormForRegistWork.module.scss';
import loading from '../../icon/loading.svg';

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

function FormForRegistWork() {
  const dispatch = useAppDispatch();

  const statusLoadingDataForFormVacancies = useAppSelector(
    (state: any) =>
      state.reducerDataForSelectWithVacancies.statusLoadingDataForFormVacancies,
  );
  const dataForSelectWithVacancies = useAppSelector(
    (state: any) =>
      state.reducerDataForSelectWithVacancies.dataForSelectWithVacancies,
  );

  useEffect(() => {
    // Request for vacancies for form field
    dispatch(fetchRespDataForSelectWithVacancies());
  }, []);

  return statusLoadingDataForFormVacancies === 'loaded' ? (
    <>
      <h1 className={formForRegistWork.title}>Работа твоей мечты</h1>
      <div className={formForRegistWork.wrap}>
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
                (val: any) => {
                  const valLengthWithoutDashes = val.replace(/-|_/g, '').length;
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
            values.id = uuidv4();
            // Request to add job candidates to the server
            dispatch(fetchRespSubmittingCandidatesForEmployment(values));
            setSubmitting(false);
            resetForm();
            // Updating the state of the displayed UI command on the page with the form
            dispatch(updateDisplayFormOrThanks(true as any));
          }}
        >
          {({ isSubmitting, handleChange, handleBlur }) => (
            <Form className={formForRegistWork.form}>
              <div className={formForRegistWork.fields}>
                <h3 className={formForRegistWork.subtitle}>Вакансия*</h3>
                <Field
                  as="select"
                  id="vacancy"
                  name="vacancy"
                  className={formForRegistWork.field}
                >
                  <option value="" key="0">
                    выберите вакансию
                  </option>
                  {dataForSelectWithVacancies.map((item: any) => (
                    <option value={item.vacancy} key={item.id}>
                      {item.vacancy}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="vacancy"
                  component="div"
                  className={formForRegistWork.errorMessage}
                />
              </div>
              <div className={formForRegistWork.fields}>
                <h3 className={formForRegistWork.subtitle}>ФИО*</h3>
                <Field
                  as="input"
                  id="fio"
                  name="fio"
                  placeholder="Введите ФИО"
                  className={formForRegistWork.field}
                />
                <ErrorMessage
                  name="fio"
                  component="div"
                  className={formForRegistWork.errorMessage}
                />
              </div>
              <div className={formForRegistWork.group}>
                <div className={formForRegistWork.fields}>
                  <h3 className={formForRegistWork.subtitle}>Дата рождения*</h3>
                  <Field
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className={formForRegistWork.field}
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className={formForRegistWork.errorMessage}
                  />
                </div>
                <div className={formForRegistWork.fields}>
                  <h3 className={formForRegistWork.subtitle}>Пол</h3>
                  <div className={formForRegistWork.checks}>
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
                      className={formForRegistWork.errorMessage}
                    />
                  </div>
                </div>
                <div className={formForRegistWork.fields}>
                  <h3 className={formForRegistWork.subtitle}>
                    Контактный телефон*
                  </h3>
                  <Field
                    render={({ field }: { field: any }) => (
                      <MaskedInput
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...field}
                        mask={phoneNumberMask}
                        placeholder="+7 ("
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={formForRegistWork.field}
                      />
                    )}
                    name="contactPhoneNumber"
                  />
                  <ErrorMessage
                    name="contactPhoneNumber"
                    component="div"
                    className={formForRegistWork.errorMessage}
                  />
                </div>
                <div className={formForRegistWork.fields}>
                  <h3 className={formForRegistWork.subtitle}>
                    Электронная почта
                  </h3>
                  <Field
                    id="email"
                    name="email"
                    placeholder="example@mail.com"
                    className={formForRegistWork.field}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={formForRegistWork.errorMessage}
                  />
                </div>
              </div>
              <div className={formForRegistWork.fields}>
                <h3 className={formForRegistWork.subtitle}>Резюме</h3>
                <div className={formForRegistWork.borderFile}>
                  <Field type="file" id="resume" name="resume" />
                </div>
                <ErrorMessage
                  name="resume"
                  component="div"
                  className={formForRegistWork.errorMessage}
                />
              </div>
              <div className={formForRegistWork.fields}>
                <h3 className={formForRegistWork.subtitle}>Капча</h3>
                <div className={formForRegistWork.wrapField}>
                  <div className={formForRegistWork.wrapCheckRobot}>
                    <div>
                      <Field
                        as="input"
                        type="checkbox"
                        id="captchaRobot"
                        name="captchaRobot"
                        className={formForRegistWork.checkRobot}
                      />
                      <span>я не робот</span>
                    </div>
                    <div className={formForRegistWork.img}>
                      <img src={loading} alt="loading" />
                    </div>
                  </div>
                  <div className={formForRegistWork.subtitleField}>
                    * поля для обязательного заполнения
                  </div>
                </div>
                <ErrorMessage
                  name="captchaRobot"
                  component="div"
                  className={formForRegistWork.errorMessage}
                />
              </div>
              <div className={formForRegistWork.fields}>
                <div className={formForRegistWork.wrapCheckAgreement}>
                  <Field
                    as="input"
                    type="checkbox"
                    id="captchaConsent"
                    name="captchaConsent"
                    className={formForRegistWork.checkAgreement}
                  />
                  <div className={formForRegistWork.descr}>
                    я подтверждаю согласие на обработку персональных данных и
                    принимаю условия рассмотрения обращений *
                  </div>
                </div>
                <ErrorMessage
                  name="captchaConsent"
                  component="div"
                  className={formForRegistWork.errorMessage}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={formForRegistWork.btn}
              >
                отправить
              </button>
            </Form>
          )}
        </Formik>
        <div className={formForRegistWork.inf}>
          <h3 className={formForRegistWork.ourGoal}>Наша суперцель</h3>
          <div className={formForRegistWork.descrGoal}>
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
          <div className={formForRegistWork.phoneForCall}>
            +7 (926) 433-14-16
          </div>
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
}

export default FormForRegistWork;
