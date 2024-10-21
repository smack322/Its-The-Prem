import React from 'react';
import Navbar from '@/app/components/Navbar';

const positionMap: { [key: number]: string } = {
  1: 'Goalkeeper',
  2: 'Defender',
  3: 'Midfielder',
  4: 'Forward',
};

interface Player {
  id: number;
  web_name: string;
  first_name: string;
  second_name: string;
  assists: number;
  clean_sheets: number;
  goals_scored: number;
  news: string;
  expected_goal_involvements: number;
  expected_assists: number;
  element_type: number;
}

interface GameWeek {
  current_event: number;
}

interface Pick {
  element: number;
  position: number;
  is_captain: boolean;
}

interface Substitution {
  element_in: number;
  element_out: number;
  event: number;
}

interface ManagerLineup {
  picks: Pick[];
  entry_history: Record<string, any>;
  subs: Substitution[];
}

interface EPLComponentProps {
  currentGameWeek: GameWeek | null;
  playerData: { elements: Player[] };
  league1: any;
  league2: any;
  lineups: ManagerLineup[];
  entryIds: number[];
  teamNames: string[];
  teamOwners: string[];
  error?: boolean;
}

const LeagueTeams: React.FC<EPLComponentProps> = ({
  currentGameWeek,
  playerData,
  league1,
  league2,
  lineups,
  entryIds,
  teamNames,
  teamOwners,
  error,
}) => {
  if (error) {
    return <div>Error loading data.</div>;
  }

  // Create a map of player IDs to player data for easy lookup (including name, assists, clean_sheets, etc.)
  const playerMap = new Map<number, Player>();
  playerData.elements.forEach((player) => {
    playerMap.set(player.id, player);
  });

  return (
    <div>
      <Navbar />
      <h1>Current Game Week: {currentGameWeek?.current_event}</h1>

      {lineups.map((lineup, index) =>
        lineup ? (
          <div key={`team-${index}`}>
            {/* Display a separate table for each team */}
            <h2>Team: {teamNames[index]}</h2>
            <h3>Owner: {teamOwners[index]}</h3>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                margin: '20px 0',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>
                    Player Name
                  </th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>
                    Position
                  </th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>
                    Goals
                  </th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>
                    Expected Goals
                  </th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>
                    Assists
                  </th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>
                    Expected Assists
                  </th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>
                    Clean Sheets
                  </th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>
                    News
                  </th>
                </tr>
              </thead>
              <tbody>
                {lineup.picks.map((pick: any) => {
                  const player = playerMap.get(pick.element); // Get player data
                  if (player) {
                    return (
                      <tr key={`${index}-${pick.element}`}>
                        <td
                          style={{ border: '1px solid #ddd', padding: '8px' }}
                        >
                          {player.first_name || 'Unknown'} {player.second_name}
                        </td>
                        <td
                          style={{ border: '1px solid #ddd', padding: '8px' }}
                        >
                          {positionMap[player.element_type] ||
                            'Unknown Position'}
                        </td>
                        <td
                          style={{ border: '1px solid #ddd', padding: '8px' }}
                        >
                          {player.goals_scored}
                        </td>
                        <td
                          style={{ border: '1px solid #ddd', padding: '8px' }}
                        >
                          {player.expected_goal_involvements}
                        </td>
                        <td
                          style={{ border: '1px solid #ddd', padding: '8px' }}
                        >
                          {player.assists}
                        </td>
                        <td
                          style={{ border: '1px solid #ddd', padding: '8px' }}
                        >
                          {player.expected_assists}
                        </td>
                        <td
                          style={{ border: '1px solid #ddd', padding: '8px' }}
                        >
                          {player.clean_sheets}
                        </td>
                        <td
                          style={{ border: '1px solid #ddd', padding: '8px' }}
                        >
                          {player.news}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={`${index}-${pick.element}`}>
                      <td
                        colSpan={8}
                        style={{ border: '1px solid #ddd', padding: '8px' }}
                      >
                        Unknown Player (ID: {pick.element})
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div key={index}>
            <h2>No lineup data available for Entry ID: {entryIds[index]}</h2>
          </div>
        )
      )}
    </div>
  );
};

export default LeagueTeams;
