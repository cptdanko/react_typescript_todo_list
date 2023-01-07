import './App.css';
import { Typography } from '@mui/material';
import { Dashboard } from './containers/dashboard';

function App() {

  return (
    <div className='App'>
      
      <div style={{paddingTop: 10}} className="HomeScreen">
          <div className='TodoArea'>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                React todo list with Typescript & MUI
            </Typography>
            <Dashboard />
          </div>
      </div>
    </div>
  );
}

export default App;
