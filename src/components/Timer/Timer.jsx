import { useEffect, useRef, useState } from "react";
import css from "./Timer.module.css";

export const Timer = () => {
  const intervalRef = useRef(null);

  const [countDown, setCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const difference = new Date("2025-03-01T00:00:00") - new Date();

    if (difference <= 0) {
      clearInterval(intervalRef.current);
    } else {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setCountDown({ days, hours, minutes, seconds });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div>
      <div className={css.timerContainer}>
        <div className={css.timerUnitContainer}>
          <div>
            <span className={css.timerUnit}>
              {padTo2Digits(countDown.days)}
            </span>
            <span className={css.timerDot}>:</span>
          </div>
          <span className={css.timerLabels}>днів</span>
        </div>

        <div className={css.timerUnitContainer}>
          <div>
            <span className={css.timerUnit}>
              {padTo2Digits(countDown.hours)}
            </span>
            <span className={css.timerDot}>:</span>
          </div>
          <span className={css.timerLabels}>годин</span>
        </div>

        <div className={css.timerUnitContainer}>
          <div>
            <span className={css.timerUnit}>
              {padTo2Digits(countDown.minutes)}
            </span>
            <span className={css.timerDot}>:</span>
          </div>
          <span className={css.timerLabels}>минут</span>
        </div>

        <div className={css.timerUnitContainer}>
          <div>
            <span className={css.timerUnit}>
              {padTo2Digits(countDown.seconds)}
            </span>
          </div>
          <span className={css.timerLabels}>секунд</span>
        </div>
      </div>
    </div>
  );
};
