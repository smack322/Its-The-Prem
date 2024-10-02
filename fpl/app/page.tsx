import LeagueTable from './components/LeagueTable';
import Navbar from './components/Navbar';
import { fetchLeagueDetails } from '../app/lib/api'; // Import the centralized API call

export default async function LeaguePage() {
  try {
    // Use Promise.all to fetch both leagues in parallel
    const [leagueData1, leagueData2] = await Promise.all([
      fetchLeagueDetails(31541), // Zach League
      fetchLeagueDetails(31543), // Razz League
    ]);

    return (
      <div style={{ textAlign: 'center' }}>
        <Navbar />

        <h2 style={{ fontWeight: 'bold' }}>It's The Prem (Zach League)</h2>
        <LeagueTable leagueData={leagueData2} />

        <h2 style={{ fontWeight: 'bold' }}>My Dudess (Razz League)</h2>
        <LeagueTable leagueData={leagueData1} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching league data:', error);
    return <div>Error loading data</div>; // Display an error message
  }
}
