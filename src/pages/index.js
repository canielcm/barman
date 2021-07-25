import React, { useState, useEffect } from "react";
import {
  Carousel,
  Footer,
  Navbar,
  Sidebar,
  DrinkCard,
  DrinkContainer,
} from "../components";
import { db } from "../firebase-config";
import { useAuth } from "../context/AuthContext";
import { useDrinkMethods } from "../context/DrinkMethodsContext";
const Home = () => {
  const { currentUser } = useAuth();
  const { drinkList, getDrinkData, getDrinksBy } = useDrinkMethods();
  const [vecDrinks, setVecDrinks] = useState([]);
  const [uEffectControl, setUEffectControl] = useState(0);
  const increaseUFC = () => {
    let counter = uEffectControl + 1;
    setUEffectControl(counter);
  };

  useEffect(async () => {
    if (uEffectControl < 2) {
      await increaseUFC();
    }
    await drinkList;
    const temp = await getDrinksBy("category", "wisky");
    setVecDrinks(temp);
    const dd = await getDrinkData("I0ogubY0U3ROz0wpjh62");
    console.log(await dd);
  }, [uEffectControl, currentUser]);
  return (
    <div>
      {/* ************************************************************ */}
      <Navbar />
      <Carousel />
      <div className="container-fluid">
        <div className="row p-5">
          <div className="col-sm-12 col-md-4">
            <Sidebar />
          </div>
          <div className="gallery col-sm-12 col-md-8">
            <div>
              <h3>
                <strong>Beverage</strong>
              </h3>
              <DrinkContainer></DrinkContainer>
            </div>
            <div>
              <h3>
                <strong>Wisky</strong>
              </h3>
              <DrinkContainer category="wisky"></DrinkContainer>
            </div>
            <div>
              <h3>
                <strong>Wine</strong>
              </h3>
              <DrinkContainer category="wine"></DrinkContainer>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
