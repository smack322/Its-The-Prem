import React from 'react';
import Navbar from '@/app/components/Navbar';

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
      {/* Create a table to display the data */}
      <table
        style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            {/* <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Entry ID
            </th> */}
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Team Name
            </th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Team Owner
            </th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Players
            </th>
          </tr>
        </thead>
        <tbody>
          {lineups.map((lineup, index) =>
            lineup ? (
              <tr key={index}>
                {/* <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {entryIds[index]}
                </td> */}
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {teamNames[index]}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {teamOwners[index]}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {lineup.picks.map((pick: any) => {
                      const player = playerMap.get(pick.element); // Get player data
                      if (player) {
                        return (
                          <li key={pick.element}>
                            {player.first_name || 'Unknown'}{' '}
                            {player.second_name}, Position: {pick.position},
                            Assists: {player.assists}, Clean Sheets:{' '}
                            {player.clean_sheets}, Goals: {player.goals_scored},
                            News: {player.news}, Expected Goal Involvements:{' '}
                            {player.expected_goal_involvements}, Expected Assist
                            Involvements:{player.expected_assists}
                          </li>
                        );
                      }
                      return (
                        <li key={pick.element}>
                          Unknown Player (ID: {pick.element})
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td
                  colSpan={4}
                  style={{ border: '1px solid #ddd', padding: '8px' }}
                >
                  No lineup data available for Entry ID: {entryIds[index]}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTeams;
