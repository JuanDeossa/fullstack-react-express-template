import { AuthProvider } from "./context/authProvider";
import { AppContent } from "./components";

export const App = () => {
  //
  //
  return (
    <div className="App">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </div>
  );
};
