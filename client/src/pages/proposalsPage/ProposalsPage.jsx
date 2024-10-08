import React from "react";
import styles from "./ProposalsPage.module.css";
import Button from "../../components/Button/Button";
import { FiLogIn } from "react-icons/fi";
import { FaRegCopyright } from "react-icons/fa6";

const ProposalsPage = ({
  onClick,
  onClickVote,
  assumedCardTitle,
  assumedCardDescription,
}) => {
  const handleClick = () => {
    alert("wa");
  };
  return (
    <div className={styles.proposalsContainer}>
      <div className={styles.navProposals}>
        <div className={styles.logoProposals}>
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
      <div className={styles.midSectionP}>
        <h1 className={styles.midH1P}>Voting Proposals!</h1>

        {/* Map Card Container */}
        <div className={styles.cardContainer}>
          <h3>{assumedCardTitle}</h3>
          <p>{assumedCardDescription}</p>

          <Button
            onClick={onClickVote}
            title="Go to Vote"
            icon={<FiLogIn />}
            color={"white"}
            backgroundColor={"#102685"}
          />
        </div>
      </div>

      {/* Bottom Section */}

      <div className={styles.bottomProposals}>
        <FaRegCopyright className={styles.cIcon} />
        2024
      </div>
    </div>
  );
};

export default ProposalsPage;
