import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { ComponentsPage, ComputersPage, HomePage, OneComponentPage, OneComputerPage } from './pages';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path={'components'} element={<ComponentsPage/>}/>
        <Route path={'computers'} element={<ComputersPage/>}/>
        <Route path={'computer/:id'} element={<OneComputerPage/>}/>
        <Route path={'component/:id'} element={<OneComponentPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
