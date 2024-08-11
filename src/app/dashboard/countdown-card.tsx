"use client";
import { useCountdown } from "@/Hooks";
import { ClockIcon, TimerIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";

function CountdownCard({
  date,
  onExpired,
}: {
  date: Date;
  onExpired?: () => void;
}) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(date);

  useEffect(() => {
    if (isExpired && onExpired) onExpired();
  }, [seconds]);

  if (days > 0)
    return (
      <div className="flex rounded-xl py-1 px-2 space-x-1 text-center text-xs items-center justify-center bg-red-500 backdrop-blur text-white font-medium">
        <TimerIcon className="text-white" />
        <p className="p-0 text-xs">
          {days > 0
            ? `${days} hari lagi`
            : `${hours}h : ${minutes}m : ${seconds}s`}
        </p>
      </div>
    );

  return (
    <div className="flex rounded-full py-0.5 pl-1.5 pr-2 space-x-1 text-center text-xs items-center justify-center bg-red-500 backdrop-blur font-medium">
      <TimerIcon className="text-white" />
      <p className="text-xs rounded text-white">{hours}</p>
      <p className="text-xs font-extrabold text-white">:</p>
      <p className="text-xs rounded text-white">{minutes}</p>
      <p className="text-xs font-extrabold text-white">:</p>
      <p className="text-xs rounded text-white">{seconds}</p>
    </div>
  );
}

export default CountdownCard;
