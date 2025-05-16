
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamPlayerSelector from "@/components/TeamPlayerSelector";
import PerformanceRadarChart from "@/components/PerformanceRadarChart";
import StatsTable from "@/components/StatsTable";

export type Team = {
  id: string;
  name: string;
};

export type Player = {
  id: string;
  name: string;
  teamId: string;
};

export type InningStat = "all" | "first" | "second";

export type PlayerStats = {
  battingAverage: number;
  strikeRate: number;
  hundreds: number;
  fifties: number;
  highestScore: number;
  bowlingAverage?: number;
  economyRate?: number;
  wickets?: number;
  fiveWicketHauls?: number;
  bestBowling?: string;
};

// Mock data
const MOCK_TEAMS: Team[] = [
  { id: "ind", name: "India" },
  { id: "aus", name: "Australia" },
  { id: "eng", name: "England" },
  { id: "sa", name: "South Africa" },
  { id: "nz", name: "New Zealand" },
];

const MOCK_PLAYERS: Player[] = [
  { id: "vk", name: "Virat Kohli", teamId: "ind" },
  { id: "rs", name: "Rohit Sharma", teamId: "ind" },
  { id: "js", name: "Jasprit Bumrah", teamId: "ind" },
  { id: "srt", name: "Sachin Tendulkar", teamId: "ind" },
  { id: "sc", name: "Steve Smith", teamId: "aus" },
  { id: "dw", name: "David Warner", teamId: "aus" },
  { id: "pc", name: "Pat Cummins", teamId: "aus" },
  { id: "jr", name: "Joe Root", teamId: "eng" },
  { id: "jb", name: "James Anderson", teamId: "eng" },
  { id: "ab", name: "AB de Villiers", teamId: "sa" },
  { id: "kw", name: "Kane Williamson", teamId: "nz" },
];

// Mock stats - would come from API in real app
const MOCK_PLAYER_STATS: Record<string, Record<InningStat, PlayerStats>> = {
  vk: {
    all: { battingAverage: 59.6, strikeRate: 93.4, hundreds: 43, fifties: 64, highestScore: 183 },
    first: { battingAverage: 63.4, strikeRate: 95.2, hundreds: 25, fifties: 30, highestScore: 183 },
    second: { battingAverage: 55.8, strikeRate: 91.6, hundreds: 18, fifties: 34, highestScore: 154 },
  },
  rs: {
    all: { battingAverage: 48.7, strikeRate: 89.2, hundreds: 29, fifties: 48, highestScore: 264 },
    first: { battingAverage: 49.8, strikeRate: 90.1, hundreds: 16, fifties: 25, highestScore: 264 },
    second: { battingAverage: 47.6, strikeRate: 88.3, hundreds: 13, fifties: 23, highestScore: 208 },
  },
  js: {
    all: { 
      battingAverage: 3.6, strikeRate: 45.2, hundreds: 0, fifties: 0, highestScore: 10,
      bowlingAverage: 22.1, economyRate: 3.5, wickets: 380, fiveWicketHauls: 8, bestBowling: "6/33" 
    },
    first: { 
      battingAverage: 4.1, strikeRate: 46.7, hundreds: 0, fifties: 0, highestScore: 10,
      bowlingAverage: 21.7, economyRate: 3.3, wickets: 210, fiveWicketHauls: 5, bestBowling: "6/33" 
    },
    second: { 
      battingAverage: 3.1, strikeRate: 43.7, hundreds: 0, fifties: 0, highestScore: 8,
      bowlingAverage: 22.5, economyRate: 3.7, wickets: 170, fiveWicketHauls: 3, bestBowling: "5/29" 
    },
  },
  sc: {
    all: { battingAverage: 61.8, strikeRate: 88.3, hundreds: 28, fifties: 36, highestScore: 239 },
    first: { battingAverage: 63.2, strikeRate: 89.5, hundreds: 16, fifties: 20, highestScore: 239 },
    second: { battingAverage: 60.4, strikeRate: 87.1, hundreds: 12, fifties: 16, highestScore: 178 },
  },
};

const PlayerComparisonTool: React.FC = () => {
  const [team1, setTeam1] = useState<Team | null>(null);
  const [team2, setTeam2] = useState<Team | null>(null);
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);
  const [inningsStat, setInningsStat] = useState<InningStat>("all");

  const getStatsForPlayer = (playerId: string | null) => {
    if (!playerId || !MOCK_PLAYER_STATS[playerId]) {
      return null;
    }
    return MOCK_PLAYER_STATS[playerId][inningsStat];
  };

  const player1Stats = getStatsForPlayer(player1?.id || null);
  const player2Stats = getStatsForPlayer(player2?.id || null);
  
  const showComparison = player1Stats && player2Stats;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamPlayerSelector
          teams={MOCK_TEAMS}
          players={MOCK_PLAYERS}
          selectedTeam={team1}
          selectedPlayer={player1}
          onTeamChange={setTeam1}
          onPlayerChange={setPlayer1}
          title="Player 1"
        />
        
        <TeamPlayerSelector
          teams={MOCK_TEAMS}
          players={MOCK_PLAYERS}
          selectedTeam={team2}
          selectedPlayer={player2}
          onTeamChange={setTeam2}
          onPlayerChange={setPlayer2}
          title="Player 2"
        />
      </div>

      {showComparison && (
        <>
          <Card className="p-4">
            <Tabs defaultValue="all" onValueChange={(value) => setInningsStat(value as InningStat)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Innings</TabsTrigger>
                <TabsTrigger value="first">First Innings</TabsTrigger>
                <TabsTrigger value="second">Second Innings</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4">
                <h3 className="text-lg font-semibold mb-4">All Innings Comparison</h3>
                <ComparisonContent player1={player1} player2={player2} player1Stats={player1Stats} player2Stats={player2Stats} />
              </TabsContent>
              <TabsContent value="first" className="pt-4">
                <h3 className="text-lg font-semibold mb-4">First Innings Comparison</h3>
                <ComparisonContent player1={player1} player2={player2} player1Stats={player1Stats} player2Stats={player2Stats} />
              </TabsContent>
              <TabsContent value="second" className="pt-4">
                <h3 className="text-lg font-semibold mb-4">Second Innings Comparison</h3>
                <ComparisonContent player1={player1} player2={player2} player1Stats={player1Stats} player2Stats={player2Stats} />
              </TabsContent>
            </Tabs>
          </Card>
        </>
      )}

      {!showComparison && player1 && player2 && (
        <div className="text-center p-6 border rounded-lg bg-gray-50">
          <p>Statistics not available for one or both selected players.</p>
        </div>
      )}

      {(!player1 || !player2) && (
        <div className="text-center p-6 border rounded-lg bg-gray-50">
          <p>Please select players from both teams to compare their statistics.</p>
        </div>
      )}
    </div>
  );
};

interface ComparisonContentProps {
  player1: Player | null;
  player2: Player | null;
  player1Stats: PlayerStats | null;
  player2Stats: PlayerStats | null;
}

const ComparisonContent: React.FC<ComparisonContentProps> = ({ player1, player2, player1Stats, player2Stats }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <PerformanceRadarChart
            player1={player1}
            player2={player2}
            player1Stats={player1Stats}
            player2Stats={player2Stats}
          />
        </div>
        <div className="w-full md:w-1/2">
          <StatsTable
            player1={player1}
            player2={player2}
            player1Stats={player1Stats}
            player2Stats={player2Stats}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerComparisonTool;
