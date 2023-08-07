import { Link } from "react-router-dom";

/**
 * Component for the Error page.
 */
function NotFound() {
  return (
    <>
      <h1>Error 404</h1>
      <p>Esta página no existe</p>
      <Link to="/">Volver al home</Link>
    </>
  );
}

export default NotFound;