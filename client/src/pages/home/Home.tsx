import { HomeComponent } from "./HomeTypes";
import { useTranslation } from "react-i18next";

const Home: HomeComponent = () => {
  const { t } = useTranslation();

  return <div>{t("home")}</div>;
};

export default Home;
