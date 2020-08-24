import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";

interface ChartProps {
  levelScoresCount: number; // Re-render for each new level.
  currentPace?: number;
}

export const Chart = ({ levelScoresCount, currentPace }: ChartProps) => {
  const [currentLevel, setCurrentLevel] = useState(5);
  const [paces, setPaces] = useState<any[]>([]);

  useEffect(() => {
    if (currentPace === undefined) {
      setPaces([]);
      setCurrentLevel(5);
    } else {
      const newPace = { x: currentLevel, y: currentPace };

      // We use levelScoresCount to check if the pace was adjusted because
      // of something like a bonus or a death. In that case, we DON'T want
      // to update the chart. We only want to update the chart when a level
      // is actually completed.
      if (
        !paces.length ||
        (paces.length && paces[paces.length - 1].x !== levelScoresCount + 4)
      ) {
        setPaces((paces) => [...paces, newPace]);
        setCurrentLevel(currentLevel + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPace, levelScoresCount]);

  const data = [
    {
      id: "pace",
      data: paces
    }
  ];

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 30, bottom: 50, left: 70, right: 20 }}
      enableGridX={false}
      axisLeft={{
        tickSize: 5,
        format: (v) => v.toLocaleString()
      }}
      axisBottom={{
        format: (v) => (v < 10 ? `L=0${v}` : `L=${v}`),
        tickRotation: -45
      }}
      yScale={{ min: "auto", max: "auto", type: "linear" }}
      colors={{ scheme: "greys" }}
      theme={{ axis: { ticks: { text: { fill: "#eee" } } } }}
      isInteractive={false}
      lineWidth={3}
    />
  );
};
