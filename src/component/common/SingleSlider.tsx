import React, { useCallback, useEffect, useState, useRef } from "react";
import "./singleSlider.scss";
import { SliderType } from "../../constants/sliderConstants";

interface SingleSliderProps {
  min: number;
  max: number;
  type: SliderType;
  size: number;
  noOfSteps?: number;
}

const SingleSlider: React.FC<SingleSliderProps> = ({ min, max, type, size, noOfSteps }) => {
  const [value, setValue] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [inputTrackSteps, setInputTrackSteps] = useState([]);
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );
  console.log(`single ${type} valu`, value)
  useEffect(() => {
    const renderSteps = () => {
      const steps = [];
      const stepSize = max - min;

      for (let i = 0; i <= stepSize; i++) {
        steps.push(
          <div
            key={i}
            style={{
              position: "absolute",
              left: i == stepSize ? "" : `${(i * 100) / stepSize}%`,
              right: i === stepSize ? "0%" : "auto",

              width: "4px",
              height: "4px",
              top: "50%",
              borderRadius: "100%",
              transform: "translateY(-50%)",
              background: i <= value ? "white" : "#47b647",
              zIndex: i <= value ? 2 : 2,
            }}
          ></div>
        );
      }

      return steps;
    };

    setInputTrackSteps(renderSteps() as any);
  }, [value, min, max]);

  useEffect(() => {
    const percent = getPercent(value);
    if (sliderRef.current) {
      sliderRef.current.style.width = `${percent}%`;
    }
  }, [value, getPercent]);

  function typeBasedSlider(type: SliderType) {
    switch (type) {
      case SliderType.Continous:
        return (
          <>
            <input
              min={min}
              max={max}
              step={1}
              type="range"
              value={value}
              onChange={(event) => {
                const value = Number(event.target.value);
                setValue(value);
              }}
              className={`thumb ${size === 24 ? "thumb-size-24" : "thumb-size-32"
                }`}
            />
            <div className="slider">
              <div className="slider__track"></div>
              <div ref={sliderRef} className="slider__range"></div>
            </div>
          </>
        );
      case SliderType.Discrete:
        return (
          <>
            <input
              min={min}
              max={max}
              step={noOfSteps}
              type="range"
              value={value}
              onChange={(event) => {
                const value = Number(event.target.value);
                setValue(value);
              }}
              className={`thumb ${size === 24 ? "thumb-size-24" : "thumb-size-32"
                }`}
            />
            <div className="slider">
              <div className="slider__track"></div>
              <div ref={sliderRef} className="slider__range"></div>
              {inputTrackSteps}
            </div>
          </>
        );
      default:
        return null;
    }
  }

  return <div className="container">{typeBasedSlider(type)}</div>;
};

export default SingleSlider;
