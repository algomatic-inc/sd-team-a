import { useEffect, useState } from "react";
import { StrollPage } from "./pages/StrollPage";
import { RelocatePage } from "./pages/RelocatePage";

function App() {
  const [mode, setMode] = useState<"relocate" | "stroll">("stroll");

  // URLの#mode=xxxからmodeを決める
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#mode=relocate") {
      setMode("relocate");
    } else if (hash === "#mode=stroll") {
      setMode("stroll");
    }
  }, []);

  return <>{mode === "relocate" ? <RelocatePage /> : <StrollPage />}</>;
}

export default App;
