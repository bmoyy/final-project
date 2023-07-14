import 'App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import GPTSearch from './components/GPTSearch';
import AlgoliaResult from './components/AlgoliaResult';
import GPTResult from './components/GPTResult';
import useApplicationData from 'hooks/useApplicationData';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Order from './components/Order';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {
  const {
    state,
    setGPTRequest,
    onSubmitSearch,
  } = useApplicationData();

  const [Products, setProducts] = useState([]);
  const [ProductData, setProductData] = useState({});
  const [Cart, setCart] = useState([])
  
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <Router>       
        <NavBar />
       <GPTSearch
        state={state}
        setGPTRequest={setGPTRequest}
        onSubmitSearch={onSubmitSearch}
        />
        {state.gptResponse && <GPTResult state={state} />}
        {state.algoliaResponse && <AlgoliaResult state={state} />}

        <ProductList 
        products={Products}
        ProductData={ProductData}
        setProductData={setProductData}
        Cart={Cart}
        setCart={setCart}
        />
        <Routes>

        <Route path="/productdetails" element={<ProductDetails product={ProductData}/>}/>
        <Route path="/order" element={<Order Cart={Cart}/>}/>
        </Routes>
      </Router>
    </div>
  );


}