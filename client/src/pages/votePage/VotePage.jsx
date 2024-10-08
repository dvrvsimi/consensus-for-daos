import React from "react";
import styles from "./VotePage.module.css";
import Button from "../../components/Button/Button";
import { FiLogIn } from "react-icons/fi";
import { FaRegCopyright } from "react-icons/fa6";

const VotePage = ({ onClick }) => {
  const handleYesClicked = () => {
    console.log("yes clicked!");
  };
  return (
    <div className={styles.voteContainer}>
      <div className={styles.navVote}>
        <div className={styles.logoVote}>
          <p>XDAO!</p>
        </div>
        <Button
          onClick={onClick}
          title="Log out"
          icon={<FiLogIn />}
          color={"#102685"}
          backgroundColor={"white"}
        />
      </div>

      {/* MID SECTION */}
      <div className={styles.midSectionV}>
        <h1 className={styles.midH1P}>Vote Here!</h1>

        <div className={styles.voteOptions}>
          <Button
            onClick={handleYesClicked}
            title="Yes"
            icon={<FiLogIn />}
            color={"white"}
            backgroundColor={"green"}
          />

          <Button
            onClick={handleYesClicked}
            title="Abstain"
            icon={<FiLogIn />}
            color={"grey"}
            backgroundColor={"yellow"}
          />

          <Button
            onClick={handleYesClicked}
            title="No"
            icon={<FiLogIn />}
            color={"white"}
            backgroundColor={"red"}
          />
        </div>
      </div>

      {/* Bottom Section */}

      <div className={styles.bottomVote}>
        <FaRegCopyright className={styles.cIcon} />
        2024
      </div>
    </div>
  );
};

export default VotePage;
