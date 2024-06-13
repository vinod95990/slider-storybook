import MultiRangeSlider from "./common/MultiRangeSlider";
import { SliderType, SliderSubtype } from "../constants/sliderConstants";
import SingleSlider from "./common/SingleSlider";

interface SliderProps {
  type: SliderType;
  subType: SliderSubtype;
  noOfSteps?: number;
  size: 24 | 32;
}

const Slider: React.FC<SliderProps> = ({ type, subType, noOfSteps, size }) => {
  // const { type, subType, noOfSteps, size } = props;

  function getSliderBasedOnType(type: SliderType,
    subType: SliderSubtype) {
    switch (type) {
      case SliderType.Continous:
        switch (subType) {
          // continous ranged
          case SliderSubtype.Ranged:
            return (
              <MultiRangeSlider
                min={0}
                max={20}
                type={SliderType.Continous} // discrete or continous
                size={size} // 24 or 32, by default 32 size is applied

              />
            );

          // continous single
          case SliderSubtype.Single:
            return (
              <SingleSlider
                min={0}
                max={20}
                type={SliderType.Continous}
                size={size} // 24 or 32, by default 32 size is applied
              />
            );
        }
      case SliderType.Discrete:
        switch (subType) {
          // discrete ranged
          case SliderSubtype.Ranged:
            return (
              <MultiRangeSlider
                min={0}
                max={20}
                type={SliderType.Discrete} // discrete or continous
                size={size} // 24 or 32, by default 32 size is applied
                noOfSteps={noOfSteps} // if discrete, steps inc

              />
            );

          // discrete single
          case SliderSubtype.Single:
            return (
              <SingleSlider
                min={0}
                max={20}
                type={SliderType.Discrete} // discrete or continous
                size={size} // 24 or 32, by default 32 size is applied
                noOfSteps={noOfSteps}
              />
            );
        }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-24">
        {getSliderBasedOnType(type, subType)}
      </div>
    </div>
  );
}

export default Slider;
