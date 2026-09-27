import ProductList from "@/component/ProductList";
import SizeSlider from "@/component/size-recommend-section";

export default function Home() {
  return (
    <>
      <ProductList />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
        <SizeSlider />
      </div>
    </>
  );
}
