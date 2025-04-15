import Navbar from "../components/Navbar";
import Schedule from "../components/Schedule"

function App(scheduleFromSheet) {
  //setMatches(scheduleFromSheet)
  // console.log(scheduleFromSheet.scheduleFromSheet[0].team1)

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
