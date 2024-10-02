import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/leagues/league1">League1</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/leagues/league2">League2</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/players">Players</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#f5f5f5',
    padding: '10px',
  },
  navList: {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginRight: '20px',
  },
};

export default Navbar;
