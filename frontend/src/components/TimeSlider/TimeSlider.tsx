import { useState, useEffect } from "react";
import styles from "./TimeSlider.module.css";

interface TimeSliderProps {
  targetYear: number | string;
  setTargetYear: React.Dispatch<React.SetStateAction<number | string>>;
}

export default function TimeSlider({ targetYear, setTargetYear }: TimeSliderProps) {
  // useEffect(() => {
  //   async function fetchYear() {
  //     const response = await fetch(`http://localhost:3000/gee/forest-loss/${targetYear}`);
  //     const data = await response.json();
  //     console.log(data);
  //   }
  //   fetchYear();
  // }, [targetYear]);
  return (
    <section className={styles.timeSliderSection}>
      <p className={styles.targetYear}>{targetYear}</p>
      <div className={styles.timeSliderContainer}>
        <span>2000</span>
        <input onChange={(e) => setTargetYear(e.target.value)} type='range' min='2000' max='2025' value={targetYear} step='5' className={styles.slider} id='timeSlider' />
        <span>2025</span>
      </div>
    </section>
  );
}
