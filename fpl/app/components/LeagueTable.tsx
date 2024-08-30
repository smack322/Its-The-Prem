import React from 'react';

type Entry = {
  entry_id: number;
  entry_name: string;
  id: number;
  player_first_name: string;
  player_last_name: string;
  short_name: string;
  waiver_pick: number;
};

type Standing = {
  last_rank: number;
  league_entry: number;
  matches_drawn: number;
  matches_lost: number;
  matches_played: number;
  matches_won: number;
  points_against: number;
  points_for: number;
  rank: number;
  rank_sort: number;
  total: number;
};

type LeagueData = {
  league_entries: Entry[];
  standings: Standing[];
};

type LeagueTableProps = {
  leagueData: LeagueData;
};

const LeagueTable: React.FC<LeagueTableProps> = ({ leagueData }) => {
  // console.log('Raw league data:', leagueData);
  const { league_entries, standings } = leagueData;

  // Create a map of IDs to league entries for quick lookup
  const entryMap = new Map<number, Entry>();
  league_entries.forEach((entry) => {
    entryMap.set(entry.id, entry);
  });

  // Sort standings by matches won (descending), matches lost (ascending), and total points (descending)
  const sortedStandings = [...standings].sort((a, b) => {
    if (b.matches_won !== a.matches_won) return b.matches_won - a.matches_won;
    if (a.matches_lost !== b.matches_lost)
      return a.matches_lost - b.matches_lost;
    return b.points_for - a.points_for;
  });

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>League Standings</h1>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={tableHeaderStyle}>Rank</th>
            <th style={tableHeaderStyle}>Team Name</th>
            <th style={tableHeaderStyle}>Owner</th>
            <th style={tableHeaderStyle}>Total For Points</th>
            <th style={tableHeaderStyle}>Total Points Against</th>
            <th style={tableHeaderStyle}>Wins</th>
            <th style={tableHeaderStyle}>Draws</th>
            <th style={tableHeaderStyle}>Losses</th>
          </tr>
        </thead>
        <tbody>
          {sortedStandings.map((standing, index) => {
            const entry = entryMap.get(standing.league_entry);

            // Apply green background to top 3 entries
            const rowStyle = index < 3 ? { backgroundColor: 'lightgreen' } : {};

            return entry ? (
              <tr
                key={standing.league_entry}
                style={{ ...rowStyle, ...tableRowStyle }}
              >
                <td style={tableCellStyle}>{index + 1}</td>
                <td style={tableCellStyle}>{entry.entry_name}</td>
                <td
                  style={tableCellStyle}
                >{`${entry.player_first_name} ${entry.player_last_name}`}</td>
                <td style={tableCellStyle}>{standing.points_for}</td>
                <td style={tableCellStyle}>{standing.points_against}</td>
                <td style={tableCellStyle}>{standing.matches_won}</td>
                <td style={tableCellStyle}>{standing.matches_drawn}</td>
                <td style={tableCellStyle}>{standing.matches_lost}</td>
              </tr>
            ) : (
              <tr key={standing.league_entry} style={tableRowStyle}>
                <td style={tableCellStyle} colSpan={8}>
                  No matching entry found
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'center' as const,
  fontWeight: 'bold' as const,
};

const tableRowStyle = {
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'center' as const,
};

export default LeagueTable;
