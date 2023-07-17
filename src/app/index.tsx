import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Categories from "./pages/Category/Categories";
import Products from "./pages/Product/Products";
import ProductDetail from "./pages/Product/ProductDetail";
import ProductsCategory from "./pages/Product/ProductsCategory";
import ProductEdit from "./pages/Product/ProductAdmin/ProductEdit";
import ProductCreate from "./pages/Product/ProductAdmin/ProductCreate";
import NotFound from "./pages/NotFound";
import AuthProvider from "./contexts/AuthContext";
import RequireAuth from "./components/Auth/RequireAuth";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";


const queryClient = new QueryClient();

function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route element={<Layout />}>
                //public
                  <Route path="/" element={<Home />} />

                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:productID" element={<ProductDetail />} />

                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:categoryID/products" element={<ProductsCategory />} />

                  {/* <Route path="/cart-detail" element={<CartDetail />} /> */}

                //public auth
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                //protected
                  <Route path="/products/create" element={
                    <RequireAuth>
                      <ProductCreate />
                    </RequireAuth>
                  } />

                  <Route path="/products/edit/:id" element={
                    <RequireAuth>
                      <ProductEdit />
                    </RequireAuth>
                  } />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
    </QueryClientProvider >
  );
}

export default App
