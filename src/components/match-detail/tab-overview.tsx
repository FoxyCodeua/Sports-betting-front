import type { Match } from "@/types/graphql";
import type { RefereeResponse } from "@/types/api";

import { SquadCard } from "./squad-card";
import { RefereeCard } from "./referee-card";

interface TabOverviewProps {
  match: Match;
  referee: RefereeResponse | null;
}

export function TabOverview({ match, referee }: TabOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <SquadCard
          title={match.homeTeam.name}
          formation={match.homeFormation}
          coach={match.homeCoachName}
          players={match.homeTeam.players}
        />
        <SquadCard
          title={match.awayTeam.name}
          formation={match.awayFormation}
          coach={match.awayCoachName}
          players={match.awayTeam.players}
        />
      </div>

      {referee && referee.name && <RefereeCard referee={referee} />}
    </div>
  );
}
