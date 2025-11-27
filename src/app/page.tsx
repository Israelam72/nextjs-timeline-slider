'use client';

import React, { useState } from 'react';
import { endOfToday, set } from 'date-fns';
import TimeRange from '@/lib';

const now = new Date();

// Helper to get "today at a specific hour"
const getTodayAtSpecificHour = (hour: number = 12): Date =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });

// A selected interval is always [startDate, endDate]
type Interval = [Date, Date];

interface DisabledInterval {
  start: Date;
  end: Date;
}

// This is what TimeRange passes into onUpdateCallback
interface UpdatePayload {
  error?: boolean;
  [key: string]: unknown; // allow extra fields without complaining
}

const selectedStart = getTodayAtSpecificHour();
const selectedEnd = getTodayAtSpecificHour(14);

const startTime = getTodayAtSpecificHour(7);
const endTime = endOfToday();

const disabledIntervals: DisabledInterval[] = [
  { start: getTodayAtSpecificHour(16), end: getTodayAtSpecificHour(17) },
  // { start: getTodayAtSpecificHour(7), end: getTodayAtSpecificHour(12) },
  { start: getTodayAtSpecificHour(20), end: getTodayAtSpecificHour(24) },
];

const App: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [selectedInterval, setSelectedInterval] = useState<Interval>([
    selectedStart,
    selectedEnd,
  ]);

  const errorHandler = ({ error }: UpdatePayload) => {
    // If error is undefined, treat it as false
    setError(Boolean(error));
  };

  const onChangeCallback = (interval: Date[]) => {
    // TimeRange guarantees this is [start, end]
    setSelectedInterval(interval as Interval);
  };

  return (
    <TimeRange
      error={error}
      ticksNumber={36}
      selectedInterval={selectedInterval}
      timelineInterval={[startTime, endTime]}
      onUpdateCallback={errorHandler}
      onChangeCallback={onChangeCallback}
      disabledIntervals={disabledIntervals}
    />
  );
};

export default App;