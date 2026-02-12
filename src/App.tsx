
import { Router, Route} from '@solidjs/router';
import { AlarmScreen } from './pages/AlarmScreen';
function App() {
  const alarmData = {
    onDismiss: () => {
      alert("Alarm dismissed! Great job taking your vitamins!");
    },
    onReschedule: () => {
      alert("Alarm rescheduled for 30 minutes later. Don't forget to take your vitamins!");
    }
  };


  return (
    <Router>
        <Route path='/' component={() => <AlarmScreen {...alarmData} />} />
    </Router>
  )
}

export default App
