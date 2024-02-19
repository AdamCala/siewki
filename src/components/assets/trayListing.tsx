import { FC } from "react";
import styles from "../../styles/components/trayListing.module.scss";
import SeedlingTray from "../icons/seedlingTray";
import Add from "../icons/add";

interface trayListingProps {
  areSettingsOpen: boolean;
}

const trayListing: FC<trayListingProps> = (props) => {
  const { areSettingsOpen } = props;

  return (
    <>
      {!areSettingsOpen ? (
        <div className={`${styles.main} rounded-l-full`}>
          <Add className={`${styles.icon_add}`} />
          <SeedlingTray className={`${styles.icon_tray}`} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default trayListing;
