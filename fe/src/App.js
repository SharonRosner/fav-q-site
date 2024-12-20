import './App.css';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Quotes from './components/quotes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path='/' element={<Quotes />} />
      <Route exact path='/quotes' element={<Quotes />} />
    </>
  )
);

function App() {

  return (
    <div className="App">
      <div className='main-app'>
      <RouterProvider router={router}>
      </RouterProvider>
      </div>
    </div>
  );
}


export default App;


