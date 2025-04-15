import Navbar from "../components/Navbar";
import Schedule from "../components/Schedule"

function App(scheduleFromSheet) {
  return (
    <div>
      <Navbar
        title="Schedule 2025"
        buttonText="Standings and Pools"
        buttonHref="/pools"
      />
      <Schedule scheduleFromSheet={scheduleFromSheet} />
    </div>
  );
}

export default App;
