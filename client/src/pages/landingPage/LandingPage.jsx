import React from "react";
import styles from "./LandingPage.module.css";
import Button from "../../components/Button/Button";
import { FiLogIn } from "react-icons/fi";
import { FaRegCopyright } from "react-icons/fa6";

const LandingPage = ({ onClick }) => {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.navLanding}>
        <div className={styles.logoLanding}>
          <p>XDAO!</p>
        </div>
        <Button
          onClick={onClick}
          title="Connect to wallet"
          icon={<FiLogIn />}
          color={"#102685"}
          backgroundColor={"white"}
        />
      </div>

      {/* MID SECTION */}
      <div className={styles.midSection}>
        <h1 className={styles.midH1}>Welcome to XDAO!</h1>
        <h3 className={styles.midH3}>
          A blockchain marketplace for various Voting proposals
        </h3>
      </div>

      {/* Bottom Section */}

      <div className={styles.bottomLanding}>
        <FaRegCopyright className={styles.cIcon} />
        2024
      </div>
    </div>
  );
};

export default LandingPage;
