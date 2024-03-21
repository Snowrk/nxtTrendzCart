// Write your code here
const CartSummary = props => {
  const {totalCost, items} = props
  return (
    <div className="summary">
      <h1>
        Order Total: <span>Rs {totalCost}/-</span>
      </h1>
      <p>{items} items in cart</p>
      <button type="button" className="checkout">
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
