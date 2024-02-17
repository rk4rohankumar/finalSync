import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider,Outlet} from 'react-router-dom';
import Header from './components/header';
import Body from './components/Body';
import Footer from './components/Footer';
import Stopwatch from './components/stopWatch';
import WorldClock from './components/worldClock';
import Timer from './components/timer';


const AppLayout = () => {
  return(
    <div>
      <Header />
      <Outlet />

    </div>
  );
};

const appRouter  = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/stopwatch',
        element: <Stopwatch />,
      },
      {
        path: '/worldclock',
        element: <WorldClock />,
      },
      {
        path: '/timer',
        element: <Timer />,
      }
      ],
  },
  {
    path: '/stopwatch',
    element: <Stopwatch />,
  },
  {
    path: '/worldclock',
    element: <WorldClock />,
  },
  {
    path: '/timer',
    element: <Timer />,
  },
  {
    path: '/clock',
    element: <App />,
  },
 

]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);
reportWebVitals();
