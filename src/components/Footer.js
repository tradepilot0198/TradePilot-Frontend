const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <p>&copy; TradePilot 2025</p>
        <p>MADE WITH LOVE ♥</p>
        <p>IACSD-AUG 2024 BATCH</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    position: 'relative',      // Fix the position of the footer
    bottom: 0,              // Align it to the bottom of the page
    left: 0,                // Align it to the left of the page
    width: '100%',          // Make the footer span the entire width
    background: 'black',
    color: 'white',
    padding: '20px 0',
    textAlign: 'center',
    marginTop: '40px',
  },
  footerContent: {
    fontSize: '1em',
    padding:'50px'
  },
};

export default Footer;
