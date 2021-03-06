import React from "react";
import "./styles.css";
export const Table = (props) => {
  return (
    <div className="TableDiv">
      <div className="TableContainer table-responsive">
        <table className="table table-borderless">
          <thead>
            {props.matrizCotent.map((element, index) => {
              if (index == 0) {
                return (
                  <tr key={index}>
                    {element.map((e, index) => {
                      return (
                        <th scope="col" key={index}>
                          <div className="TableElement HeadElement">{e}</div>
                        </th>
                      );
                    })}
                  </tr>
                );
              }
            })}
          </thead>
          <tbody>
            {props.matrizCotent.map((element, index) => {
              if (index > 0) {
                return (
                  <tr key={index}>
                    {element.map((e, index) => {
                      if (index == 0) {
                        return (
                          <th key={index} scope="row" className="thElement">
                            <div className="TableElement BodyElement">{e}</div>
                          </th>
                        );
                      } else
                        return (
                          <td key={index}>
                            <div className="TableElement BodyElement">{e}</div>
                          </td>
                        );
                    })}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
