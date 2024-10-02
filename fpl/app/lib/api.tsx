// Fetch details of a specific league
export const fetchLeagueDetails = async (leagueId: number) => {
  try {
    const res = await fetch(
      `https://draft.premierleague.com/api/league/${leagueId}/details`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch league ${leagueId}. Status: ${res.status}`
      );
    }

    const leagueData = await res.json();
    return leagueData;
  } catch (error: any) {
    console.error(`Error fetching league ${leagueId}:`, error.message);
    return null; // Return null or handle this gracefully in your app
  }
};

// Fetch the current game week
export const fetchCurrentGameWeek = async () => {
  try {
    const res = await fetch('https://draft.premierleague.com/api/game', {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch current game week. Status: ${res.status}`
      );
    }

    const gameWeekData = await res.json();
    return gameWeekData;
  } catch (error: any) {
    console.error('Error fetching current game week:', error.message);
    return null;
  }
};

// Fetch the current manager's lineup based on entry ID and event ID (game week)
export const fetchManagerLineup = async (entryId: number, eventId: number) => {
  try {
    const res = await fetch(
      `https://draft.premierleague.com/api/entry/${entryId}/event/${eventId}`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch lineup for entry ${entryId} and event ${eventId}. Status: ${res.status}`
      );
    }

    const lineupData = await res.json();
    return lineupData;
  } catch (error: any) {
    console.error(
      `Error fetching lineup for entry ${entryId} and event ${eventId}:`,
      error.message
    );
    return null;
  }
};

// Fetch player data (all static player information)
export const fetchPlayerData = async () => {
  try {
    const res = await fetch(
      'https://draft.premierleague.com/api/bootstrap-static',
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch player data. Status: ${res.status}`);
    }

    const playerData = await res.json();
    return playerData;
  } catch (error: any) {
    console.error('Error fetching player data:', error.message);
    return null;
  }
};
