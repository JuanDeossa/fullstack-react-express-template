import { AuthProvider } from "./context/authProvider";
import { AppContent } from "./components/appContent";

export const App = () => {
  //
  //
  return (
    <AuthProvider>
      <div className="App">
        {/* <h1 className="text-3xl font-bold m-2">I am the frontend</h1> */}
        <AppContent />
      </div>
    </AuthProvider>
  );
};
