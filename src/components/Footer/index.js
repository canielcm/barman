import React from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faGithubSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
export const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white FooterDiv">
      <div className="container p-2">
        <div className="smediacontainer">
          <a
            className="btn  btn-floating "
            href="https://www.youtube.com/watch?v=21qNxnCS8WU"
            target="_blank"
          >
            <FontAwesomeIcon
              className="FooterIcon"
              icon={faGithubSquare}
            ></FontAwesomeIcon>
          </a>
          <a
            className="btn  btn-floating "
            href="https://www.facebook.com/carlosdaniel.castromaussa/"
            target="_blank"
          >
            <FontAwesomeIcon
              className="FooterIcon"
              icon={faFacebookSquare}
            ></FontAwesomeIcon>
          </a>
          <a
            className="btn  btn-floating "
            href="https://www.youtube.com/watch?v=21qNxnCS8WU"
            target="_blank"
          >
            <FontAwesomeIcon
              className="FooterIcon"
              icon={faTwitterSquare}
            ></FontAwesomeIcon>
          </a>
        </div>

        <div className="mb-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            distinctio earum repellat quaerat voluptatibus placeat nam, commodi
            optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </div>

        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Made by</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=21qNxnCS8WU"
                    className="text-white"
                  >
                    Carlos Daniel Castro Maussa
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=21qNxnCS8WU"
                    className="text-white"
                  >
                    Andrés Felipe Ruiz Mestra
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Contact info</h5>

              <ul className="list-unstyled mb-0">
                <li>+57 301 0000000</li>
                <li>+57 302 0000000</li>
              </ul>
            </div>
            <br />
            <p className="text-muted">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              omnis autem quae aliquid perferendis natus, quibusdam cum neque
              necessitatibus est impedit quisquam maiores laboriosam esse, animi
              soluta quidem, aut beatae! Lorem
            </p>
          </div>
        </div>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2020 Copyright:
        <a
          className="text-white"
          target="_blank"
          href="https://www.youtube.com/watch?v=21qNxnCS8WU"
          rel="noreferrer"
        >
          mydrinkonline.com
        </a>
      </div>
    </footer>
  );
};
