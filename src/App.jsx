/* eslint-disable react/no-unescaped-entities */
import { AppBar, Container, Typography } from '@mui/material';
import { useDrinkList } from './Context';
import TransitionGroupExample from './List';

function App() {

  const { drinkList } = useDrinkList();

  return (
    <Container maxWidth="sm">
      <AppBar>
        <Container maxWidth="sm">
          <Typography textAlign='center' variant="h3">Mark's To-drink list</Typography>
        </Container>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 10 }}>
          <TransitionGroupExample drinks={drinkList}/>
      </Container>
    </Container>
  );
}

export default App;