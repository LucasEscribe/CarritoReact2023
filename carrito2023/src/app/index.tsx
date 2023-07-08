import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Categories from "./pages/Category/Categories";
import Products from "./pages/Product/Products";
import ProductsCategory from "./pages/Product/ProductsCategory";
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./contexts/ThemeContext";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories/:categoryID/products" element={<ProductsCategory />} />
              {/* <Route path="/cart-detail" element={<CartDetail />} /> */}
              {/* <Route path="/products:id" element={<ProductsDetail />} /> */}
              {/* <Route path="/products/create" element={<ProductsCreate />} /> */}
              {/* <Route path="/products/edit/:id" element={<ProductsEdit />} /> */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App
