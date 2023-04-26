import { useEffect } from "react";

const TitleHook = (title) => {
  useEffect(() => {
    document.title = `${title}-Work Schedule`;
  }, [title]);
};

export default TitleHook;
