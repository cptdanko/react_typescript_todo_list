import './App.css';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { TodoList } from './components/todolist';

function App() {

  return (
    <div className="App">
      <div style={{paddingTop: 10}}>
          <div className='TodoArea'>
          <Card sx={{ minWidth: 500, maxWidth: 500 }}>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
              React todo list with Typescript & MUI
            </Typography>
            <hr />
            <TodoList />
          </Card>
          </div>
      </div>
    </div>
  );
}

export default App;
