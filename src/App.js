import Header from './components/header/header';
import Products from './components/products/products';
import { EachCategory } from './components/circle/circle';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CategoryProds from './components/category-prods/category-prods';
import BiddingMain from './components/bidding/bidding-main';
import BiddingRoom from './components/bidding/bidding-room';
import GlobalState from './context/global-state';
import SignIn from './components/signin';
import Admin from './components/admin/index';
// Component

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalState>
          <Header />
          <Switch>
            <Route exact path='/' component={Products} />
            <Route exact path='/register' component={SignIn} />
            <Route exact path='/bidding' component={BiddingMain} />
            <Route path='/bidding/:id' component={BiddingRoom} />
            <Route path='/admin' component={Admin} />
            <Route path='/circle'>
              <EachCategory />
            </Route>
            <Route path='/:id' component={CategoryProds} />
          </Switch>
        </GlobalState>
      </BrowserRouter>
    </>
  );
}

export default App;
