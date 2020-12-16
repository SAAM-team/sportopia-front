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
import SingleProduct from './components/singleProduct/single';
import PayPal from './components/paypal/paypal';
import Cart from './components/cart/cart';
import Favorite from './components/favorite/favorite';
import SingleProduct from './components/singleProduct/singleProduct';
import Seller from './components/seller/seller';
// Component

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalState>
          <Header />
          <Switch>
            <Route path="/paypal/:id" component={PayPal} 
            <Route path='/cart' component={Cart} />
            <Route exact path='/' component={Products} />
            <Route exact path='/register' component={SignIn} />
            <Route exact path='/bidding' component={BiddingMain} />
            <Route path='/bidding/:id' component={BiddingRoom} />
            <Route path='/admin' component={Admin} />
            <Route path='/category/:id' component={CategoryProds} />
            <Route path='/favorite' component={Favorite} />
            <Route path='/product/:id' component={SingleProduct} />
            <Route path='/seller' component={Seller} />
          </Switch>
        </GlobalState>
      </BrowserRouter>
    </>
  );
}

export default App;
