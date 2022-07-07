import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import BeerList from './component/beerList';
import Navbar from './component/navbar';
import { store } from './store/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Favorite from './component/favorite';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<BeerList />}></Route>
        <Route path='/favorite' element={<Favorite />}></Route>
      </Routes>
    </Router>
  </Provider>
);