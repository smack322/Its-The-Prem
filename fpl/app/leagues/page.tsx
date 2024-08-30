import LeagueTable from '../components/LeagueTable';

export default async function LeaguePage() {
  // Fetch data for the first league
  const res1 = await fetch(
    'https://draft.premierleague.com/api/league/31541/details',
    {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  );
  const leagueData1 = await res1.json();
  console.log('League 1 data:', leagueData1);

  // Fetch data for the second league
  const res2 = await fetch(
    'https://draft.premierleague.com/api/league/31543/details',
    {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  );
  const leagueData2 = await res2.json();

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontWeight: 'bold' }}>It's The Prem (Zach League)</h2>
      <LeagueTable leagueData={leagueData2} />

      <h2 style={{ fontWeight: 'bold' }}>My Dudess (Razz League)</h2>
      <LeagueTable leagueData={leagueData1} />
    </div>
  );
}
