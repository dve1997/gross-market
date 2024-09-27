import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks-redux-update';

import Header from '../../components/header/Header';
import Banner from '../../components/banner/Banner';
import SliderPositions from '../../components/sliderPositions/SliderPositions';
import TableImagesInst from '../../components/tableImagesInst/TableImagesInst';
import GeographySales from '../../components/geographySales/GeographySales';
import Footer from '../../components/footer/Footer';
import { updateDisplayFormOrThanks } from '../../api/formApplicationFormForEmploymentPage';

import homeOage from './HomePage.module.scss';

function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Updating the state of the displayed UI command on the page with the form
    dispatch(updateDisplayFormOrThanks(false as any));
  }, []);

  return (
    <div className={homeOage.box}>
      <Header />
      <Banner />
      <SliderPositions />
      <TableImagesInst />
      <GeographySales />
      <Footer />
    </div>
  );
}

export default HomePage;
