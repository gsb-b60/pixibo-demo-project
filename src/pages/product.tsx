import { useParams } from "react-router-dom";

function Product() {
  const { productId } = useParams();
  return (
    <>
      <div>{productId}</div>
    </>
  );
}

export default Product;
