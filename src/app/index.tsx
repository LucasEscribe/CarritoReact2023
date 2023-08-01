import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
// import { FilterProvider } from "./contexts/FilterContext";


import Layout from "./components/Layout";
import Home from "./pages/Home";
import Categories from "./pages/Category/Categories";
import Products from "./pages/Product/Products";
import ProductDetail from "./pages/Product/ProductDetail";
import ProductsCategory from "./pages/Product/ProductsCategory";
import ProductEdit from "./pages/Product/ProductAdmin/ProductEdit";
import ProductCreate from "./pages/Product/ProductAdmin/ProductCreate";
import NotFound from "./pages/NotFound";
import ScrollToTop from './components/ScrollToTop';
import AuthProvider from "./contexts/AuthContext";
import RequireAuth from "./components/Auth/RequireAuth";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CartDetail from "./pages/Cart/CartDetail";
import CategoryCreate from "./pages/Category/CategoriesAdmin/CategoryCreate";
import CategoryEdit from "./pages/Category/CategoriesAdmin/CategoryEdit";
import Buy from "./pages/Buy";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AuthProvider>
              {/* <FilterProvider> */}
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:productID" element={<ProductDetail />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:categoryID/products" element={<ProductsCategory />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route path="/products/create" element={<RequireAuth adminOnly><React.Fragment><ProductCreate /></React.Fragment></RequireAuth>} />
                  <Route path="/products/edit/:id" element={<RequireAuth adminOnly><React.Fragment><ProductEdit /></React.Fragment></RequireAuth>} />
                  <Route path="/categories/create" element={<RequireAuth adminOnly><CategoryCreate /></RequireAuth>} />
                  <Route path="/categories/edit/:id" element={<RequireAuth adminOnly><CategoryEdit /></RequireAuth>} />

                  <Route path="/cart-detail" element={<RequireAuth customerOnly><React.Fragment><CartDetail /></React.Fragment></RequireAuth>}></Route>
                  <Route path="/buy" element={<RequireAuth customerOnly><React.Fragment><Buy /></React.Fragment></RequireAuth>}></Route>

                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
              {/* </FilterProvider> */}
            </AuthProvider>
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
