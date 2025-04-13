import Navbar from "../components/Navbar";
import Schedule from "../components/Schedule"

function App(scheduleFromSheet) {
  //setMatches(scheduleFromSheet)
  // console.log(scheduleFromSheet.scheduleFromSheet[0].team1)

  return (
    <div>
      <Navbar />
      <Schedule scheduleFromSheet={scheduleFromSheet} />
    </div>
  );
}

export default App;
