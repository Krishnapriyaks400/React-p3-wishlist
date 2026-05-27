import "./App.css";
import { useState } from "react";
import WishlistButton from "./components/WishlistButton";
import WishlistPage from "./components/WishlistPage";

function App() {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });
  // const dummyProduct = {
  //   id: 7891234567890,
  //   title: "Classic Cotton T-Shirt",
  //   handle: "classic-cotton-t-shirt",
  //   description:
  //     "A comfortable everyday t-shirt made from 100% organic cotton.",
  //   vendor: "TestBrand",
  //   product_type: "Apparel",
  //   tags: ["cotton", "unisex", "casual"],
  //   status: "active",
  //   created_at: "2024-01-15T10:00:00Z",
  //   updated_at: "2024-06-01T12:00:00Z",
  //   published_at: "2024-01-16T08:00:00Z",
  //   images: [
  //     {
  //       id: 1001,
  //       src: "https://via.placeholder.com/600x600?text=T-Shirt+Front",
  //       alt: "Classic Cotton T-Shirt - Front",
  //       width: 600,
  //       height: 600,
  //       position: 1,
  //     },
  //     {
  //       id: 1002,
  //       src: "https://via.placeholder.com/600x600?text=T-Shirt+Back",
  //       alt: "Classic Cotton T-Shirt - Back",
  //       width: 600,
  //       height: 600,
  //       position: 2,
  //     },
  //   ],
  //   variants: [
  //     {
  //       id: 101,
  //       title: "Small / White",
  //       option1: "Small",
  //       option2: "White",
  //       sku: "TSHIRT-S-WHITE",
  //       price: "29.99",
  //       compare_at_price: "39.99",
  //       inventory_quantity: 50,
  //       available: true,
  //       weight: 0.3,
  //       weight_unit: "kg",
  //       image_id: 1001,
  //     },
  //     {
  //       id: 102,
  //       title: "Medium / White",
  //       option1: "Medium",
  //       option2: "White",
  //       sku: "TSHIRT-M-WHITE",
  //       price: "29.99",
  //       compare_at_price: "39.99",
  //       inventory_quantity: 30,
  //       available: true,
  //       weight: 0.32,
  //       weight_unit: "kg",
  //       image_id: 1001,
  //     },
  //     {
  //       id: 103,
  //       title: "Large / Black",
  //       option1: "Large",
  //       option2: "Black",
  //       sku: "TSHIRT-L-BLACK",
  //       price: "29.99",
  //       compare_at_price: null,
  //       inventory_quantity: 0,
  //       available: false,
  //       weight: 0.34,
  //       weight_unit: "kg",
  //       image_id: 1002,
  //     },
  //   ],
  //   options: [
  //     {
  //       id: 1,
  //       name: "Size",
  //       position: 1,
  //       values: ["Small", "Medium", "Large"],
  //     },
  //     { id: 2, name: "Color", position: 2, values: ["White", "Black"] },
  //   ],
  // };
  // const productId = dummyProduct ? dummyProduct.id : window.__productId;
  const productHandle = window.__productHandle;

  const isInWishlist = wishlist.some((item) => item.handle === productHandle);

  const toggleWishlist = () => {
    if (isInWishlist) {
      setWishlist((prev) => {
        const updated = prev.filter((item) => item.handle !== productHandle);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        return updated;
      });
    } else {
      getproductDetail();
    }
  };

  const getproductDetail = async () => {
    const response = await fetch(`/products/${productHandle}.js`);
    const data = await response.json();
    setWishlist((prev) => {
      const updated = [...prev, data];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const isWishlistPage = window.location.pathname.includes("/pages/wishlist");

  return (
    <div className="App">
      {isWishlistPage ? (
        <WishlistPage wishlist={wishlist} setWishlist={setWishlist} />
      ) : (
        productHandle && (
          <WishlistButton
            toggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
          />
        )
      )}
    </div>
  );
}

export default App;
