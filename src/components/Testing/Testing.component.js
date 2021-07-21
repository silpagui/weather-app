import React, { useState } from "react";
import { Button } from "./Button.component";

export function Testing() {
  const [showButton, setShowButton] = useState(true);

  return (
    <div onClick={() => setShowButton(!showButton)}>
      Hola
      {showButton ? <Button /> : "No hay boton"}
    </div>
  );
}
