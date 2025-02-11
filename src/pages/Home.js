import React from 'react';
import './Home.css';
import Footer from '../components/Footer'; // Import Footer component
const isSpecialPage = true; // You can conditionally change this based on your page logic

const Home = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <div style={{background:'black'}}>
      
      {/* Hero Section */}
      <section className="hero-section" style={styles.heroSection}>
              <div style={styles.heroContent}>
          <h1 style={{fontSize:'2.4em', marginTop:'15%'}}>Welcome to TradePilot</h1>
          <p style={{fontSize: '1.1em', marginBottom:'10%'}}>
            We are Shubham Dhiman and Atharva, passionate innovators from the IACSD-DAC-AUG-2024 Batch,
            united by a mission to make trading accessible, stress-free, and profitable for everyone.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section style={styles.missionStatement}>
        <h2 style={{fontSize:'2.4em', color:'white', marginBottom:'4%'}}>Our Mission</h2>
        <p style={{fontSize: '1.1em', marginLeft: '10%', marginRight: '10%'}}>
          Coming from diverse backgrounds, we’ve built a solution that helps individuals automate their trades
          and grow their savings while living their busy lives. Our trading algorithms take the guesswork out of
          the market, ensuring you can earn money without constant monitoring.
        </p>
        <p style={{fontSize: '1.1em' , marginBottom:'15%'}}>
        At our core, we believe in empowering individuals to make smart, automated trades and secure a better
        financial future.
        </p>
      </section>

      {/* Our Services Section */}
      <section style={styles.servicesSection}>
        <h2 style={{fontSize:'2.4em', color:'white' , marginBottom:'4%'}}>What We Offer</h2>
        <div style={styles.services}>
          <div style={styles.serviceCard}>
            <img src="/assets/img/img2.jpg" width={'196x'} alt="Service 1" style={{borderRadius:'5px', border:'2px solid black'}} />
            <h3 style={{fontSize: '1.2em'}}>Automated Trading</h3>
            <p style={{fontSize: '1em'}}>
              Say goodbye to stress and let our trading algorithms take care of your trades, ensuring you're always in profit.
            </p>
          </div>

          <div style={styles.serviceCard}>
            <img src="/assets/img/img1.jpg" width={'196px'} alt="Service 2" />
            <h3 style={{fontSize: '1.2em'}}>Smart Financial Growth</h3>
            <p style={{fontSize: '1em'}}>
              Our platform helps you grow your savings through intelligent, data-driven trading strategies.
            </p>
          </div>

          <div style={styles.serviceCard}>
            <img src="/assets/img/img3.jpg" width={'196px'} alt="Service 3" />
            <h3 style={{fontSize: '1.2em'}}>Effortless Monitoring</h3>
            <p style={{fontSize: '1em'}}>
              We take the hassle out of constant market monitoring. Our algorithms are always working for you in the background.
            </p>
          </div>
        </div>
      </section>
      <Footer positionStyle={isSpecialPage ? 'relative' : 'fixed'} />
      
    </div>
  );
};

const styles = {
  heroSection: {
    // background: '#4CAF50',
    background: 'black',
    padding: '50px 20px',
    textAlign: 'center',
    color: 'white',
  },
  heroContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  missionStatement: {
    padding: '40px 20px',
    textAlign: 'center',
    // backgroundColor: '#f4f4f4',
    backgroundColor: 'black',
    color:'white',
  },
  servicesSection: {
    background:'black',
    padding: '40px 20px',
    textAlign: 'center',
  },
  services: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '200px',
  },
};

export default Home;
