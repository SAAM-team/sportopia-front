// Importing
import BiddingMain from './components/bidding/bidding-main';
import BiddingRoom from './components/bidding/bidding-room';
import { Route, Switch } from 'react-router-dom';
import GlobalState from './context/global-state';
import Header from './components/header/header';
import Products from './components/products/products';
import Carousel from './components/carousel/carousel';

// Component

function App() {
  return (
    <>
      <GlobalState>
        <Header />
        <Carousel />
        <Switch>
          <Route exact path='/' component={Products} />
          <Route exact path='/bidding' component={BiddingMain} />
          <Route path='/bidding/:id' component={BiddingRoom} />
        </Switch>
      </GlobalState>
    </>
  );
}

export default App;
