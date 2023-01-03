import { useEffect } from "react";

const TitleHook = (title) => {
  useEffect(() => {
    document.title = `${title}-Tasks Management`;
  }, [title]);
};

export default TitleHook;
