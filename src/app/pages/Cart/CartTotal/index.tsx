type TotalProps = {
    totalPrice: number;
};

function Total(props: TotalProps) {
    const formattedTotal = props.totalPrice.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
    });

    return (
        <div /* className={styles.total} */>
            <img src="/src/app/assets/img/ico_carrito.ico" alt="icocno_carrito" width={32} height={32} />
            <p>Total Carrito: {formattedTotal}</p>
        </div>
    );
}

export default Total;