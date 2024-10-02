import {
  fetchCurrentGameWeek,
  fetchManagerLineup,
  fetchPlayerData,
  fetchLeagueDetails,
} from '../../lib/api';
import LeagueTeams from '@/app/components/LeagueTeams';

const League2Page = async () => {
  const currentGameWeek = await fetchCurrentGameWeek();
  const playerData = await fetchPlayerData();
  const league1 = await fetchLeagueDetails(31543);
  console.log(playerData);

  // Create an array of objects from league_entries
  const leagueEntries = league1.league_entries.map((entry: any) => ({
    entry_id: entry.entry_id,
    team_name: entry.entry_name,
    owner_name: `${entry.player_first_name} ${entry.player_last_name}`,
  }));

  // console.log(leagueEntries);

  // Extract just the entry_ids to use for fetching lineups
  const entryIds = leagueEntries.map((entry: any) => entry.entry_id);
  const teamNames = leagueEntries.map((entry: any) => entry.team_name);
  const teamOwners = leagueEntries.map((entry: any) => entry.owner_name);

  // const entryIds = [111144, 111200, 113772, 117288, 121025, 260671]; // Replace with actual entry IDs
  const lineups = await Promise.all(
    entryIds.map(async (entryId: any) => {
      return await fetchManagerLineup(
        entryId,
        currentGameWeek?.current_event || 1
      );
    })
  );

  // Pass the fetched data as props to the component
  return (
    <div>
      <LeagueTeams
        currentGameWeek={currentGameWeek}
        playerData={playerData}
        league1={league1}
        league2={null} // If you have league2, fetch it similarly or pass null if not needed
        lineups={lineups}
        entryIds={entryIds}
        teamNames={teamNames}
        teamOwners={teamOwners}
      />
    </div>
  );
};

export default League2Page;
