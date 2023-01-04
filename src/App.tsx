import './App.css';
import { TodoList } from './components/todolist';
import { Login } from './components/login';
import { Typography } from '@mui/material';
import { Dashboard } from './containers/dashboard';

function App() {

  return (
    <div className="App">
      
      <div style={{paddingTop: 10}}>
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
