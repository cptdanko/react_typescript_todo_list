import './App.css';
import { TodoList } from './components/todolist';
// import './customMuiComponents/custom.css';
import { Login } from './components/login';
import { Card, Typography } from '@mui/material';
import { Dashboard } from './containers/dashboard';

function App() {

  return (
    <div className="App">
      <div className='TodoArea'>
        <Card className='CustomCard'>
          <Typography sx={{ fontSize: 18, paddingTop: 2 }} color="text.secondary" gutterBottom>
            React todo list with Typescript & MUI
          </Typography>
          <hr />
          <TodoList />
          </Card>
        </div>
    </div>
  );
}

export default App;
