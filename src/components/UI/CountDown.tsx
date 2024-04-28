'use client'
import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(intervalId);
        setTimeLeft(0);
        return;
      }

      setTimeLeft(difference);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const getTimeComponents = (
    milliseconds: number,
  ): { days: number; hours: number; minutes: number; seconds: number } => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = getTimeComponents(timeLeft);

  return (
    <div className="flex justify-center items-center text-green-500 text-xl font-bold">
      <span className="mr-2">{days}d</span>
      <span className="mr-2">{hours.toString().padStart(2, "0")}h</span>
      <span className="mr-2">{minutes.toString().padStart(2, "0")}m</span>
      <span>{seconds.toString().padStart(2, "0")}s</span>
    </div>
  );
};

export default Countdown;
