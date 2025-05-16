
import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Player, PlayerStats } from "./PlayerComparisonTool";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface PerformanceRadarChartProps {
  player1: Player | null;
  player2: Player | null;
  player1Stats: PlayerStats | null;
  player2Stats: PlayerStats | null;
}

const PerformanceRadarChart: React.FC<PerformanceRadarChartProps> = ({
  player1,
  player2,
  player1Stats,
  player2Stats,
}) => {
  if (!player1 || !player2 || !player1Stats || !player2Stats) return null;

  // Prepare normalized data for the radar chart
  const prepareChartData = () => {
    // Normalize batting metrics
    const chartData = [
      {
        category: "Batting Average",
        [player1.name]: normalizeValue(player1Stats.battingAverage, 0, 100),
        [player2.name]: normalizeValue(player2Stats.battingAverage, 0, 100),
        fullMark: 100,
      },
      {
        category: "Strike Rate",
        [player1.name]: normalizeValue(player1Stats.strikeRate, 0, 150),
        [player2.name]: normalizeValue(player2Stats.strikeRate, 0, 150),
        fullMark: 100,
      },
      {
        category: "Hundreds",
        [player1.name]: normalizeValue(player1Stats.hundreds, 0, 50),
        [player2.name]: normalizeValue(player2Stats.hundreds, 0, 50),
        fullMark: 100,
      },
      {
        category: "Fifties",
        [player1.name]: normalizeValue(player1Stats.fifties, 0, 100),
        [player2.name]: normalizeValue(player2Stats.fifties, 0, 100),
        fullMark: 100,
      },
      {
        category: "Highest Score",
        [player1.name]: normalizeValue(player1Stats.highestScore, 0, 300),
        [player2.name]: normalizeValue(player2Stats.highestScore, 0, 300),
        fullMark: 100,
      },
    ];

    // Add bowling metrics if available
    if (player1Stats.bowlingAverage && player2Stats.bowlingAverage) {
      chartData.push(
        {
          category: "Bowling Average",
          // Lower is better for bowling average, so invert the normalization
          [player1.name]: 100 - normalizeValue(player1Stats.bowlingAverage, 0, 50),
          [player2.name]: 100 - normalizeValue(player2Stats.bowlingAverage, 0, 50),
          fullMark: 100,
        },
        {
          category: "Economy Rate",
          // Lower is better for economy rate, so invert the normalization
          [player1.name]: 100 - normalizeValue(player1Stats.economyRate || 0, 0, 10),
          [player2.name]: 100 - normalizeValue(player2Stats.economyRate || 0, 0, 10),
          fullMark: 100,
        },
        {
          category: "Wickets",
          [player1.name]: normalizeValue(player1Stats.wickets || 0, 0, 500),
          [player2.name]: normalizeValue(player2Stats.wickets || 0, 0, 500),
          fullMark: 100,
        }
      );
    }

    return chartData;
  };

  // Normalize value between 0-100
  const normalizeValue = (value: number, min: number, max: number): number => {
    return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  };

  const chartData = prepareChartData();

  const chartConfig = {
    [player1.name]: { color: "#8884d8" },
    [player2.name]: { color: "#82ca9d" },
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="aspect-[4/3] md:aspect-[5/3]">
          <RadarChart data={chartData} outerRadius="80%">
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <Tooltip content={<ChartTooltipContent />} />
            <Radar
              name={player1.name}
              dataKey={player1.name}
              stroke={chartConfig[player1.name].color}
              fill={chartConfig[player1.name].color}
              fillOpacity={0.6}
            />
            <Radar
              name={player2.name}
              dataKey={player2.name}
              stroke={chartConfig[player2.name].color}
              fill={chartConfig[player2.name].color}
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceRadarChart;
