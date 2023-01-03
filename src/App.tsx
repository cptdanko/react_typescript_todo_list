import './App.css';
import { TodoList } from './components/todolist';
import { Login } from './components/login';
import { Typography } from '@mui/material';

function App() {

  return (
    <div className="App">
      
      <div style={{paddingTop: 10}}>
          <div className='TodoArea'>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                React todo list with Typescript & MUI
            </Typography>
            <Login />
            <TodoList />
          </div>
      </div>
    </div>
  );
}

export default App;
