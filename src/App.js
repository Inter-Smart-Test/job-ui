import "./App.css";
import { AuthContext } from "./utils/AuthContext";
import { useMemo, useState } from "react";
import Configuration from "./layout/Configuration";
import { TokenContext } from "./utils/TokenContext";

function App() {
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div>
      <AuthContext.Provider value={userValue}>
        <TokenContext.Provider value={userValue}>
          <Configuration />
        </TokenContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
