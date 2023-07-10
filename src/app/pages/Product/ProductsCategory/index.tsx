import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import QUERY_KEY_PRODUCTS_CATEGORY from "../../../querys/products";
import ProductCard from "../../../components/ProductCard";
import { useCart } from "../../../contexts/CartContext";
import styles from './styles.module.css';

const fetchProducts = async (categoryID: string) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryID}/products`);
    const json = await res.json();

    if (json.error) {
        throw new Error(json.error);
    }

    return json;
};

function ProductsCategory() {
    const { categoryID } = useParams();
    const { data, status, error } = useQuery(
        [QUERY_KEY_PRODUCTS_CATEGORY, categoryID],
        () => fetchProducts(categoryID || "")
    );

    const { updateTotalPrice } = useCart();

    const handleAddProductToCart = (price: number) => {
        updateTotalPrice(price);
    };

    const handleRemoveProductFromCart = (price: number) => {
        updateTotalPrice(-price);
    };

    return (
        <main>
            <h1>Productos de la categoría {categoryID}:</h1>
            <div className={styles.grid}>
                {status === "loading" && <h1>Cargando....</h1>}
                {status === "error" && <h1>Error: {(error as Error).message}</h1>}
                {status === "success" && data &&
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data.map((product: any) => {
                        return (
                            <div>
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

export default ProductsCategory;