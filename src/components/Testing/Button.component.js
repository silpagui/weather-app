import React, { useEffect, useState } from "react";

export function Button() {
  const [bacons, setBacons] = useState([]);

  useEffect(
    function () {
      console.log(
        "Mi componente efectivamente se componentDidMount, despues de que el componente termino de renderizarse"
      );

      fetch("https://baconipsum.com/api/?type=meat-and-filler")
        .then((response) => response.json())
        .then((data) => {
          setBacons(data);
        });

      return function onUnmount() {
        console.log("Mi componente se destruye, o desmonta");
      };
    },
    [setBacons]
  );

  console.log("Mi componente se esta por montar, componentWillMount");

  // if (bacons.length === 0) {
  //   fetch("https://baconipsum.com/api/?type=meat-and-filler")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBacons(data);
  //     });
  // }

  return <div>{bacons}</div>;
}
