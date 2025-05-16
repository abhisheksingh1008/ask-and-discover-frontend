
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Player, PlayerStats } from "./PlayerComparisonTool";

interface StatsTableProps {
  player1: Player | null;
  player2: Player | null;
  player1Stats: PlayerStats | null;
  player2Stats: PlayerStats | null;
}

const StatsTable: React.FC<StatsTableProps> = ({
  player1,
  player2,
  player1Stats,
  player2Stats,
}) => {
  if (!player1 || !player2 || !player1Stats || !player2Stats) return null;

  // Helper function to highlight the better stat
  const highlightBetter = (
    stat1: number | undefined,
    stat2: number | undefined,
    higherIsBetter = true
  ): [string, string] => {
    if (stat1 === undefined || stat2 === undefined) return ["", ""];
    
    if (stat1 > stat2) {
      return higherIsBetter 
        ? ["font-bold text-green-600", ""] 
        : ["", "font-bold text-green-600"];
    } else if (stat1 < stat2) {
      return higherIsBetter 
        ? ["", "font-bold text-green-600"] 
        : ["font-bold text-green-600", ""];
    }
    return ["", ""]; // Equal stats
  };

  // For batting metrics
  const [battingAvgClass1, battingAvgClass2] = highlightBetter(
    player1Stats.battingAverage,
    player2Stats.battingAverage
  );
  const [strikeRateClass1, strikeRateClass2] = highlightBetter(
    player1Stats.strikeRate,
    player2Stats.strikeRate
  );
  const [hundredsClass1, hundredsClass2] = highlightBetter(
    player1Stats.hundreds,
    player2Stats.hundreds
  );
  const [fiftiesClass1, fiftiesClass2] = highlightBetter(
    player1Stats.fifties,
    player2Stats.fifties
  );
  const [highestScoreClass1, highestScoreClass2] = highlightBetter(
    player1Stats.highestScore,
    player2Stats.highestScore
  );

  // For bowling metrics if available
  const [bowlingAvgClass1, bowlingAvgClass2] = highlightBetter(
    player1Stats.bowlingAverage,
    player2Stats.bowlingAverage,
    false // Lower bowling average is better
  );
  const [economyClass1, economyClass2] = highlightBetter(
    player1Stats.economyRate,
    player2Stats.economyRate,
    false // Lower economy is better
  );
  const [wicketsClass1, wicketsClass2] = highlightBetter(
    player1Stats.wickets,
    player2Stats.wickets
  );
  const [fiveWicketsClass1, fiveWicketsClass2] = highlightBetter(
    player1Stats.fiveWicketHauls,
    player2Stats.fiveWicketHauls
  );

  const showBowlingStats = Boolean(
    player1Stats.bowlingAverage && player2Stats.bowlingAverage
  );

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Statistics Comparison</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Statistic</TableHead>
              <TableHead>{player1.name}</TableHead>
              <TableHead>{player2.name}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Batting Average</TableCell>
              <TableCell className={battingAvgClass1}>{player1Stats.battingAverage}</TableCell>
              <TableCell className={battingAvgClass2}>{player2Stats.battingAverage}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Strike Rate</TableCell>
              <TableCell className={strikeRateClass1}>{player1Stats.strikeRate}</TableCell>
              <TableCell className={strikeRateClass2}>{player2Stats.strikeRate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Hundreds</TableCell>
              <TableCell className={hundredsClass1}>{player1Stats.hundreds}</TableCell>
              <TableCell className={hundredsClass2}>{player2Stats.hundreds}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Fifties</TableCell>
              <TableCell className={fiftiesClass1}>{player1Stats.fifties}</TableCell>
              <TableCell className={fiftiesClass2}>{player2Stats.fifties}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Highest Score</TableCell>
              <TableCell className={highestScoreClass1}>{player1Stats.highestScore}</TableCell>
              <TableCell className={highestScoreClass2}>{player2Stats.highestScore}</TableCell>
            </TableRow>

            {showBowlingStats && (
              <>
                <TableRow>
                  <TableCell className="font-medium bg-gray-50" colSpan={3}>
                    Bowling Statistics
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Bowling Average</TableCell>
                  <TableCell className={bowlingAvgClass1}>{player1Stats.bowlingAverage}</TableCell>
                  <TableCell className={bowlingAvgClass2}>{player2Stats.bowlingAverage}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Economy Rate</TableCell>
                  <TableCell className={economyClass1}>{player1Stats.economyRate}</TableCell>
                  <TableCell className={economyClass2}>{player2Stats.economyRate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Wickets</TableCell>
                  <TableCell className={wicketsClass1}>{player1Stats.wickets}</TableCell>
                  <TableCell className={wicketsClass2}>{player2Stats.wickets}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">5-Wicket Hauls</TableCell>
                  <TableCell className={fiveWicketsClass1}>{player1Stats.fiveWicketHauls}</TableCell>
                  <TableCell className={fiveWicketsClass2}>{player2Stats.fiveWicketHauls}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Best Bowling</TableCell>
                  <TableCell>{player1Stats.bestBowling || "-"}</TableCell>
                  <TableCell>{player2Stats.bestBowling || "-"}</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StatsTable;
