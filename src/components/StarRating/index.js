import React, { useEffect, useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useDrinkMethods } from "../../context/DrinkMethodsContext";
import { db } from "../../firebase-config";
export const StarRating = (props) => {
  const { userData } = useAuth();
  const { getDrinkData } = useDrinkMethods();
  const [rating, setRating] = useState(props.rating);
  const [hover, setHover] = useState(null);
  const drinkID = props.id;
  const updateRating = async (userRating) => {
    try {
      if (userData) {
        let checked = false;
        let vecUserRatings = await userData.ratings;
        let ratingUserResults;
        let ratingDrinkResult;
        vecUserRatings.map((element, index) => {
          ratingUserResults = element.split("_");
          console.log("ratingUserResults: ", ratingUserResults)
          console.log(ratingUserResults[1],"vs", drinkID)
          if (String(ratingUserResults[1]) == String(drinkID)) {
            checked = true;
            ratingDrinkResult = ratingUserResults;
            vecUserRatings[index]=`${userRating}_${ratingDrinkResult[1]}`
          }
        });
        let thisDrink = await getDrinkData(drinkID);
        let vecRating = thisDrink.rating;
        let totalRV = Number(vecRating[0]) * Number(vecRating[1]);
        if (!checked) {
          console.log("new rating added")
          let amountRV = Number(vecRating[1]) + 1;
          vecRating[1] = amountRV;
          totalRV = totalRV + userRating;
          let NewRating = totalRV / amountRV;
          await db
            .collection("drinks")
            .doc(drinkID)
            .update({
              rating: [NewRating, amountRV],
            });
          thisDrink = await getDrinkData(drinkID);
          vecRating = thisDrink.rating;

          setRating(vecRating[0]);

          let ratingControl = `${userRating}_${drinkID}`;
          vecUserRatings.push(ratingControl);
          await db.collection("users").doc(userData.id).update({
            ratings: vecUserRatings,
          });
        } else {
          console.log("new rating updated")
          await db.collection("users").doc(userData.id).update({
            ratings: vecUserRatings,
          });
          let newRatingDrinkUpdated=(totalRV-Number(ratingDrinkResult[0])+userRating)/Number(vecRating[1]);
          await db
          .collection("drinks")
          .doc(drinkID)
          .update({
            rating: [newRatingDrinkUpdated, vecRating[1]],
          });
          setRating(newRatingDrinkUpdated);
        }
      } else console.log("no updated");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {}, []);
  return (
    <div className="StarRatingDiv d-flex flex-wrap">
      {[...Array(5)].map((star, index) => {
        let LocalRating = rating / 2;
        if (hover != null) {
          LocalRating = hover / 2;
        }
        let icon;
        let backfill = LocalRating - index;
        let ratingV1 = (index + 1) * 2;
        let ratingV2 = (index + 1) * 2 - 1;
        if (backfill >= 1) {
          icon = <FontAwesomeIcon icon={faStar} className="star" />;
        } else {
          if (backfill >= 0.5) {
            icon = <FontAwesomeIcon icon={faStarHalfAlt} className="star" />;
          } else {
            icon = <FontAwesomeIcon icon={farStar} className="star" />;
          }
        }
        return (
          <div className="starBox" key={props.name + "" + index}>
            {icon}
            <div className="checkContainer">
              <input
                type="radio"
                name="rating"
                onClick={async () => {
                  await setRating(ratingV2);
                  await updateRating(ratingV2);
                }}
                onMouseEnter={() => setHover(ratingV2)}
                onMouseLeave={() => setHover(null)}
              />
              <input
                type="radio"
                name="rating"
                onClick={async () => {
                  await setRating(ratingV1);
                  await updateRating(ratingV1);
                }}
                onMouseEnter={() => setHover(ratingV1)}
                onMouseLeave={() => setHover(null)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
