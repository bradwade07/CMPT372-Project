// source: https://codesandbox.io/p/sandbox/multi-range-slider-react-js-forked-4uq1uo?file=%2Fsrc%2Fcomponent%2FmultiRangeSlider%2FMultiRangeSlider.js%3A83%2C24

"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./ratingFilter.module.css";
import classNames from "classnames";

type RatingFilterProps = {
  min: number;
  max: number;
  onChange: ({ min, max }: { min: number; max: number }) => void;
};

export const RatingFilter = ({ min, max, onChange }: RatingFilterProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement | null>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="mb-12">
      <h3 className="flex text-center justify-center mb-4 select-none">
        Rating:
      </h3>
      <div className={styles.container}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className={classNames(styles.thumb, styles.thumb_left)}
          style={{ zIndex: 5 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className={classNames(styles.thumb, styles.thumb_right)}
        />
        <div className={styles.slider}>
          <div className={styles.slider_track} />
          <div ref={range} className={styles.slider_range} />
          <div className={styles.slider_left_value}>{minVal}</div>
          <div className={styles.slider_right_value}>
            {maxVal == max ? `${max}` : maxVal}
          </div>
        </div>
      </div>
    </div>
  );
};
