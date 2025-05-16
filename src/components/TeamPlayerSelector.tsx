
import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Team, Player } from "./PlayerComparisonTool";

interface TeamPlayerSelectorProps {
  teams: Team[];
  players: Player[];
  selectedTeam: Team | null;
  selectedPlayer: Player | null;
  onTeamChange: (team: Team | null) => void;
  onPlayerChange: (player: Player | null) => void;
  title: string;
}

const TeamPlayerSelector: React.FC<TeamPlayerSelectorProps> = ({
  teams,
  players,
  selectedTeam,
  selectedPlayer,
  onTeamChange,
  onPlayerChange,
  title,
}) => {
  const filteredPlayers = useMemo(() => {
    if (!selectedTeam) return [];
    return players.filter(player => player.teamId === selectedTeam.id);
  }, [players, selectedTeam]);

  const handleTeamChange = (teamId: string) => {
    const team = teams.find(t => t.id === teamId) || null;
    onTeamChange(team);
    onPlayerChange(null); // Reset player when team changes
  };

  const handlePlayerChange = (playerId: string) => {
    const player = players.find(p => p.id === playerId) || null;
    onPlayerChange(player);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor={`team-${title}`} className="text-sm font-medium">
            Select Team
          </label>
          <Select
            value={selectedTeam?.id || ""}
            onValueChange={handleTeamChange}
          >
            <SelectTrigger id={`team-${title}`}>
              <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor={`player-${title}`} className="text-sm font-medium">
            Select Player
          </label>
          <Select
            value={selectedPlayer?.id || ""}
            onValueChange={handlePlayerChange}
            disabled={!selectedTeam}
          >
            <SelectTrigger id={`player-${title}`}>
              <SelectValue placeholder="Select a player" />
            </SelectTrigger>
            <SelectContent>
              {filteredPlayers.map((player) => (
                <SelectItem key={player.id} value={player.id}>
                  {player.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPlayerSelector;
