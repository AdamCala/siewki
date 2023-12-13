import { FC } from "react";
import styles from "../../styles/components/trayListing.module.scss";
import SeedlingTray from "../icons/seedlingTray";

interface trayListingProps {
  areSettingsOpen: boolean;
}

const trayListing: FC<trayListingProps> = (props) => {
  const { areSettingsOpen } = props;

  return (
    <>
      {!areSettingsOpen ? (
        <div className={`${styles.main} rounded-l-full`}>
          <SeedlingTray className={`${styles.icon}`} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default trayListing;
