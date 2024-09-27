import thanksForTheResponse from './ThanksForTheResponse.module.scss';

function ThanksForTheResponse() {
  return (
    <>
      <h1 className={thanksForTheResponse.title}>Ждем тебя!</h1>
      <div className={thanksForTheResponse.wrap}>
        <div className={thanksForTheResponse.inf}>
          <div className={thanksForTheResponse.descr}>
            В 2020 году самыми востребованными умениями и качествами на рынке
            труда станут:
          </div>
          <div className={thanksForTheResponse.focus}>
            Умение ставить цели, планировать свое время, инициативность,
            настойчивость, высокая мотивация, умение эффективно общаться,
            любознательность.
          </div>
          <div className={thanksForTheResponse.descr}>
            А профессиональным навыкам можно научить любого человека.
          </div>
        </div>
        <div className={thanksForTheResponse.connection}>
          <h3 className={thanksForTheResponse.subtitle}>Остались вопросы?</h3>
          <div className={thanksForTheResponse.call}>+7 (926) 433-14-16</div>
        </div>
      </div>
    </>
  );
}

export default ThanksForTheResponse;
