import Header from './components/header/header'
import Products from './components/products/products'
import Carousel from './components/carousel/carousel'
import { EachCategory } from './components/circle/circle';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CategoryProds from './components/category-prods/category-prods';

function App() {
  return (
    <>
      <BrowserRouter>

        <Header />
        <Carousel />
        <Products />
        <CategoryProds />
        <Switch>
          <Route path='/circle'>
            <EachCategory />
          </Route>
        </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;
