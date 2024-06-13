import { useState } from "react";
import "./App.scss";
import Slider from "./component/Slider";
import { SliderSubtype, SliderType } from "./constants/sliderConstants";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "120px",
      }}
    >
      <div>
        <Slider type={SliderType.Discrete} subType={SliderSubtype.Ranged} noOfSteps={4} size={24} />
      </div>
      <div>
        <Slider type={SliderType.Discrete} subType={SliderSubtype.Single} noOfSteps={4} size={24} />
      </div>
      <div>
        <Slider type={SliderType.Continous} subType={SliderSubtype.Single} size={24} />
      </div>
      <div>
        <Slider type={SliderType.Continous} subType={SliderSubtype.Ranged} noOfSteps={4} size={24} />
      </div>
    </div>
  );
}

export default App;
