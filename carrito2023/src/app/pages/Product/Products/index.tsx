import { useQuery } from "react-query";
import { useState } from "react";
import QUERY_KEY_PRODUCTS from "../../../querys/products";
import ProductCard from "../../../components/ProductCard";
import Total from "../../Cart/CartTotal";
import styles from './styles.module.css'

const fetchProducts = async () => {
    const res = await fetch('https://api.escuelajs.co/api/v1/products')
    const json = await res.json();

    if (json.error) {
        throw new Error(json.error);
    }

    return json;
};

function Products() {
    const { data, status, error } = useQuery(
        QUERY_KEY_PRODUCTS,
        fetchProducts
    );

    const [totalPrice, setTotalPrice] = useState(0);

    const handleAddProductToCart = (price: number) => {
        setTotalPrice(totalPrice + price);
    };

    const handleRemoveProductFromCart = (price: number) => {
        setTotalPrice(totalPrice - price);
    };

    return (
        <main>
            <div>
                <Total totalPrice={totalPrice} />
                <h1>Productos:</h1>
                {status === "loading" && <h1>Cargando....</h1>}
                {status === "error" && <h1>Error: {(error as Error).message}</h1>}
                {status === "success" && data &&
                    data.map((product: any) => {
                        return (
                            <div className={styles.grid}>
                                <ProductCard
                                    key={product.id}
                                    title={product.title}
                                    price={product.price}
                                    description={product.description}
                                    category={product.category}
                                    images={product.images}
                                    handleAddProductToCart={handleAddProductToCart}
                                    handleRemoveProductFromCart={handleRemoveProductFromCart} id={0}
                                />
                            </div>
                        );
                    })}
            </div>
        </main>
    );
}

export default Products;