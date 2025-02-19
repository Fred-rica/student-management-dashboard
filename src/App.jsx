import "./App.css";
import StudentDetails from "./studentInformation/StudentDetails";
import { StudentProvider } from "./context/StudentContext";

function App() {
  return (
    <StudentProvider>
      <StudentDetails />
    </StudentProvider>
  );
}

export default App;
