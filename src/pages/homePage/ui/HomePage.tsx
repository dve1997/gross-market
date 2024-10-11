import Header from 'src/features/header';
import SliderWithMotivation from 'src/widgets/sliderWithMotivation';
import SliderWithVacancies from 'src/widgets/sliderWithVacancies';
import ListOfImagesInstagram from 'src/widgets/listOfImagesInstagram';
import GeographySales from 'src/features/geographySales';
import Footer from 'src/features/footer';

import homePage from './HomePage.module.scss';

function HomePage() {
  return (
    <main className={homePage.body}>
      <Header />
      <SliderWithMotivation />
      <SliderWithVacancies />
      <ListOfImagesInstagram />
      <GeographySales />
      <Footer />
    </main>
  );
}

export default HomePage;
