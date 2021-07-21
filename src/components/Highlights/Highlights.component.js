import React from "react";
import { HighlightsNavigation } from "../HighlighsNavigation/HighlightsNavigation.component";
import { HighlightsHumidityBar } from "../HighlightsHumidityBar/HighlightsHumidityBar.component";
import { HighlightsItem } from "../HighlightsItem/HighlightsItem.component";
import "./Highlights.styles.css";

export function Highlights({
  todayWindSpeed,
  humidity,
  visibility,
  airPressure,
  windDirection,
  windDirectionDegrees,
}) {
  const highlights = [
    {
      title: "Wind Status",
      dataNumber: todayWindSpeed,
      dataUnit: "mph",
      decoration: (
        <HighlightsNavigation
          windDirection={windDirection}
          windDirectionDegrees={windDirectionDegrees}
        />
      ),
    },
    {
      title: "Humidity",
      dataNumber: humidity,
      dataUnit: "%",
      decoration: <HighlightsHumidityBar humidity={humidity} />,
    },
    {
      title: "Visibility",
      dataNumber: visibility,
      dataUnit: "miles",
    },
    {
      title: "Air Pressure",
      dataNumber: airPressure,
      dataUnit: "mb",
    },
  ];

  return (
    <div className="highlights-container">
      {highlights.map((item) => {
        return (
          <HighlightsItem
            key={item.title}
            title={item.title}
            dataNumber={item.dataNumber}
            dataUnit={item.dataUnit}
            decoration={item.decoration}
          />
        );
      })}
    </div>
  );
}
