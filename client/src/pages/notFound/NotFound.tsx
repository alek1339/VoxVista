import { NotFoundComponent } from "./NotFoundTypes";
import { useTranslation } from "react-i18next";

const NotFound: NotFoundComponent = () => {
  const { t } = useTranslation();

  return <div>{t("error.pageNotFound")}</div>;
};

export default NotFound;
