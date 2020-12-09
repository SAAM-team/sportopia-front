// Importing
import BiddingMain from './components/bidding/bidding-main';
import BiddingRoom from './components/bidding/bidding-room';

import { Route, Router, Switch } from 'react-router-dom';

// Component

function App() {
  return (
    <>
      <Route exact path='/bidding'>
        <BiddingMain />
      </Route>
      <Route path='bidding/*'>
        <BiddingRoom />
      </Route>
    </>
  );
}

export default App;
