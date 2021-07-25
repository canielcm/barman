import React from "react";
import "./styles.css";
import smirnoff from "../../resources/carouselImgs/1smirnoff.png";
import cocacola from "../../resources/carouselImgs/2cocacola.png";
import Hennessy from "../../resources/carouselImgs/3Hennessy.png";
import Bacardi from "../../resources/carouselImgs/4Bacardi.png";
import JackDaniels from "../../resources/carouselImgs/5JackDaniels.png";
import JohnnieWalker from "../../resources/carouselImgs/6JohnnieWalker.png";
import Absolut from "../../resources/carouselImgs/7Absolut.png";
import ChivasRegal from "../../resources/carouselImgs/8ChivasRegal.png";
import Patrón from "../../resources/carouselImgs/9Patrón.png";
import Jägermeister from "../../resources/carouselImgs/10Jägermeister.png";
import Genshin from "../../resources/carouselImgs/11Genshin.png";
import Baileys from "../../resources/carouselImgs/2cocacola.png";
import Ballantines from "../../resources/carouselImgs/13Ballantines.png";
import GreyGoose from "../../resources/carouselImgs/14GreyGoose.png";

export const Carousel = () => {
  return (
    <div className="CarouselDiv">
      <div className="slider">
        <div className="slide-track">
          <div className="slide">
            <img
              src={Hennessy}
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src={cocacola}
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src={smirnoff}
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src={Bacardi}
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src={JackDaniels}
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src={JohnnieWalker}
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src={Absolut}
              height="100"
              width="250"
              alt=""
            />
          </div>

          <div className="slide">
            <img
              src={ChivasRegal}
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src={Patrón}
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src={Jägermeister}
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src={Genshin}
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src={Baileys}
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src={Ballantines}
              height="100"
              width="250"
              alt=""
            />
          </div>
          <div className="slide">
            <img
              src={GreyGoose}
              height="100"
              width="250"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
