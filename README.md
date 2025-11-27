## React Timeline Range Slider (Next.js + Tailwind)

I refactored this library from [lizashkod](https://github.com/lizashkod)], to update and use modern technologies.
Credits are given bellow.

---

## Getting Started

### Prerequisites

- **Node.js** (v24.10.0)
- **Yarn** (or `npm` / `pnpm` / `bun`)

```bash
yarn install
yarn dev
```

## Usage

The `TimeRange` component is exported from `src/lib/index.tsx` and used in the example page.

Basic usage (simplified from `src/app/page.tsx`):

```tsx
import React, { useState } from 'react';
import { endOfToday, set } from 'date-fns';
import TimeRange from '@/lib';

const now = new Date();
const getTodayAtSpecificHour = (hour: number = 12): Date =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });

type Interval = [Date, Date];

const App: React.FC = () => {
  const [error, setError] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState<Interval>([
    getTodayAtSpecificHour(),
    getTodayAtSpecificHour(14),
  ]);

  const startTime = getTodayAtSpecificHour(7);
  const endTime = endOfToday();

  const disabledIntervals = [
    { start: getTodayAtSpecificHour(16), end: getTodayAtSpecificHour(17) },
  ];

  const errorHandler = ({ error }: { error?: boolean }) => {
    setError(Boolean(error));
  };

  const onChangeCallback = (interval: Date[]) => {
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
```

## Tech Stack

- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **date-fns**
- **react-compound-slider**

---

## Credits

This project is **heavily based on** the original work by **[lizashkod](https://github.com/lizashkod)**:

- Original component:  
  [`react-timeline-range-slider`](https://github.com/lizashkod/react-timeline-range-slider)

All core timeline/validation logic comes from that library; this project mainly adapts it to a Next.js + Tailwind setup and adds a small demo page.

---

## License

This project follows the same spirit as the original `react-timeline-range-slider` and is intended for learning and example purposes.  
Please refer to the original repository’s license if you reuse significant parts of the component logic. 
