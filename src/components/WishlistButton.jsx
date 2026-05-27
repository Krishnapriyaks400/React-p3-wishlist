import React from 'react'

export default function WishlistButton({ toggleWishlist, isInWishlist }) {
    console.log('button')
  return (
    <button onClick={toggleWishlist}>
      {/* {isInWishlist ? "Remove from wishlist" : "Add to Wishlist"} */}
      {isInWishlist ? '♥' : '♡'}
    </button>
  )
}
