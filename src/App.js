import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  incrementCartItemQuantity = productId => {
    this.setState(prevState => {
      const productIdx = prevState.cartList.findIndex(
        item => item.id === productId,
      )
      const product = {...prevState.cartList[productIdx]}
      product.quantity = product.quantity + 1
      return {
        cartList: [
          ...prevState.cartList.slice(0, productIdx),
          product,
          ...prevState.cartList.slice(productIdx + 1),
        ],
      }
    })
  }

  decrementCartItemQuantity = productId => {
    this.setState(prevState => {
      const productIdx = prevState.cartList.findIndex(
        item => item.id === productId,
      )
      const product = {...prevState.cartList[productIdx]}
      product.quantity = product.quantity - 1
      if (product.quantity > 0) {
        return {
          cartList: [
            ...prevState.cartList.slice(0, productIdx),
            product,
            ...prevState.cartList.slice(productIdx + 1),
          ],
        }
      }
      return {
        cartList: [
          ...prevState.cartList.slice(0, productIdx),
          ...prevState.cartList.slice(productIdx + 1),
        ],
      }
    })
  }
  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const count = product.quantity
    const obj = {...product}
    this.setState(prevState => {
      const productIdx = prevState.cartList.findIndex(
        item => item.id === product.id,
      )
      if (productIdx !== -1) {
        obj.quantity = count + prevState.cartList[productIdx].quantity
        return {
          cartList: [
            ...prevState.cartList.slice(0, productIdx),
            obj,
            ...prevState.cartList.slice(productIdx + 1),
          ],
        }
      }
      return {cartList: [...prevState.cartList, product]}
    })
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = productId => {
    this.setState(prevState => {
      const productIdx = prevState.cartList.findIndex(
        item => item.id === productId,
      )
      return {
        cartList: [
          ...prevState.cartList.slice(0, productIdx),
          ...prevState.cartList.slice(productIdx + 1),
        ],
      }
    })
  }

  removeAllCartItems = () => this.setState({cartList: []})

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
