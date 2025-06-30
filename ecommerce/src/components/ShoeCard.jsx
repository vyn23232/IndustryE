
function ShoeCard({ shoe, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(shoe);
  };

  return (
    <div className="shoe-card">
      <img src={shoe.image} alt={shoe.name} className="shoe-image" />
      <h3 className="shoe-name">{shoe.name}</h3>
      <p className="shoe-price">${shoe.price.toFixed(2)}</p>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ShoeCard;