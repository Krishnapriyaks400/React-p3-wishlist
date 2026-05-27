import React from "react";

export default function WishlistPage({ wishlist, setWishlist }) {
  const removeItem = (handle) => {
    setWishlist((prev) => {
     console.log(prev, "isWishlistPage");

      const updated = prev.filter((item) => item.handle !== handle);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

   const AddToCart = (handle) => {
    const product = wishlist.find((item) => item.handle === handle);
    if (!product) return;

    fetch("/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            id: product.variants[0].id,
            quantity: 1,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then(() => {
        removeItem(handle);
        alert("Added to cart!");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  if (!wishlist || wishlist.length === 0) {
    return <div className="wishlist-page"><p className="wishlist-empty">Your wishlist is empty.</p></div>;
  }

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-title">Your Wishlist</h2>
      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div className="wishlist-card" key={product.handle}>
            {product.featured_image && (
              <div className="wishlist-card__image-wrap">
                <img
                  src={product.featured_image}
                  alt={product.images?.[0]?.alt || product.title}
                  className="wishlist-card__image"
                />
              </div>
            )}
            <div className="wishlist-card__body">
              <p className="wishlist-card__title">{product.title}</p>
              {product.variants?.[0]?.price && (
                <p className="wishlist-card__price">${product.variants[0].price}</p>
              )}
              <div className="wishlist-card__actions">
                <button className="wishlist-addToCart" onClick={() => AddToCart(product.handle)}>Add to Cart</button>
                <button className="wishlist-card__remove" onClick={() => removeItem(product.handle)}>Remove</button>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
