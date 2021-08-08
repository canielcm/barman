import React, { useState, useEffect } from "react";
import {
  Carousel,
  Footer,
  Navbar,
  Sidebar,
  DrinkCard,
  DrinkContainer,
} from "../components";
import { useAuth } from "../context/AuthContext";
import { useDrinkMethods } from "../context/DrinkMethodsContext";
const Home = () => {
  const { currentUser } = useAuth();
  const { drinkList, getDrinkData, getDrinksBy, drinkListOS } =
    useDrinkMethods();
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
      <Navbar />
      <div className="container-fluid">
        <div className="row p-md-5 pd-sm-1">
          <div className="col-sm-12 col-lg-4 SideDiv">
            <Sidebar position="outside" />
          </div>
          <div className="gallery col-sm-12 col-md-12 col-lg-8">
            <div>
              <h3>
                <strong>Beverage</strong>
              </h3>
              <DrinkContainer></DrinkContainer>
            </div>
          </div>
        </div>
      </div>
      <Carousel />
      <Footer />
    </div>
  );
};

export default Home;
