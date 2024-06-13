import React, { useCallback, useEffect, useState, useRef } from "react";
import "./multiRangeSlider.scss";
import { SliderType } from "../../constants/sliderConstants";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  type: SliderType;
  size: number;
  noOfSteps?: any;
}

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({ min, max, type, size, noOfSteps }) => {
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const [inputTrackSteps, setInputTrackSteps] = useState<JSX.Element[]>([]);

  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const renderSteps = () => {
      const steps = [];
      const stepSize = (max - min) / noOfSteps;

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
              background:
                minVal <= i * noOfSteps && i * noOfSteps <= maxVal
                  ? "white"
                  : "#47b647",
              zIndex:
                minVal <= i * noOfSteps && i * noOfSteps <= maxVal ? 2 : 2,
            }}
          >
            {i == 0 && <p className="step-value">{min}</p>}
            {i == stepSize && <p className="step-value">{max}</p>}
          </div>
        );
      }

      return steps;
    };

    setInputTrackSteps(renderSteps() as any);
  }, [minVal, maxVal, min, max, noOfSteps]);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  function typeBasedRangeSlider(type: SliderType) {
    switch (type) {
      case SliderType.Continous:
        return (
          <>
            <input
              type="range"
              min={min}
              max={max}
              value={minVal}
              onChange={(event) => {
                const value = Math.min(Number(event.target.value), maxVal - 1);
                setMinVal(value);
              }}
              className={`thumb thumb--left ${size == 24 ? "thumb-size-24" : "thumb-size-32"
                }`}
            // style={{ zIndex: minVal > max - 100 && "5" }}
            />
            <input
              type="range"
              min={min}
              max={max}
              value={maxVal}
              onChange={(event) => {
                const value = Math.max(Number(event.target.value), minVal + 1);
                setMaxVal(value);
              }}
              className={`thumb thumb--right ${size == 24 ? "thumb-size-24" : "thumb-size-32"
                }`}
            />

            <div className="slider">
              <div className="slider__track  ]" />
              <div ref={range} className="slider__range"></div>
            </div>
          </>
        );
      case SliderType.Discrete:
        return (
          <>
            <input
              type="range"
              min={min}
              max={max}
              value={minVal}
              step={noOfSteps}
              onChange={(event) => {
                const value = Math.min(Number(event.target.value), maxVal - 4);

                setMinVal(value);
              }}
              className={`thumb thumb--left ${size == 24 ? "thumb-size-24" : "thumb-size-32"
                }`}
            // style={{ zIndex: minVal > max - 100 && "5" }}
            />
            <input
              type="range"
              min={min}
              max={max}
              value={maxVal}
              step={noOfSteps}
              onChange={(event) => {
                const value = Math.max(Number(event.target.value), minVal + 4);

                setMaxVal(value);
              }}
              className={`thumb thumb--right ${size == 24 ? "thumb-size-24" : "thumb-size-32"
                }`}
            />

            <div className="slider">
              <div className="slider__track"></div>
              <div ref={range} className="slider__range"></div>
              {inputTrackSteps}
            </div>
          </>
        );
    }
  }

  return <div className="container">{typeBasedRangeSlider(type)}</div>;
};

export default MultiRangeSlider;
