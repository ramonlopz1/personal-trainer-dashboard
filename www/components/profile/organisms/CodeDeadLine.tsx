import React, { useState, useEffect } from "react";

interface CodeDeadLineProps {
  startDate: string; // Accepts a date string in the format 'YYYY-MM-DD'
}

const CodeDeadLine: React.FC<CodeDeadLineProps> = ({ startDate }) => {
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const targetDate = new Date(startDate);
      targetDate.setDate(targetDate.getDate() + 30); // Add 30 days to the start date
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const countdownInSeconds = Math.floor(diff / 1000);
      const days = Math.floor(countdownInSeconds / (3600 * 24));
      const hours = Math.floor((countdownInSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((countdownInSeconds % 3600) / 60);
      const seconds = Math.floor(countdownInSeconds % 60);

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    const timer = setInterval(calculateCountdown, 1000); // Update countdown every second

    return () => {
      clearInterval(timer); // Cleanup the timer on component unmount
    };
  }, [startDate]);

  if (
    countdown.days === 0 &&
    countdown.hours === 0 &&
    countdown.minutes === 0 &&
    countdown.seconds === 0
  ) {

    //delete all codes
  }

  return (
    <div style={{
      fontSize: '15px',
      marginLeft: '5px'
    }}>
      {countdown.days > 0 && (
        <p>
          {countdown.days} dias, <span> </span>
          {countdown.hours}h:{countdown.minutes}m:{countdown.seconds}s
        </p>
      )}
      {countdown.days === 0 &&
        countdown.hours === 0 &&
        countdown.minutes === 0 &&
        countdown.seconds === 0 && <p>Product has expired.</p>}
    </div>
  );
};

export default CodeDeadLine;
