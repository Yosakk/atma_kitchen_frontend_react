import { useEffect, useState } from "react";

function useRefresh(eventType) {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const handleRefresh = () => {
      setRefresh((prev) => !prev);
    };

    window.addEventListener(eventType, handleRefresh);

    return () => {
      window.removeEventListener(eventType, handleRefresh);
    };
  }, [eventType]);

  return refresh;
}

export default useRefresh;
