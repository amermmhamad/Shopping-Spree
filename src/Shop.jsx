import React, { useState } from "react";
import waffle from "./assets/waffle.jpg";
import Creme from "./assets/Creme.jpg";
import Baklava from "./assets/Baklava.jpg";
import Brownie from "./assets/Brownie.jpg";
import Cake from "./assets/Cake.jpg";
import Macaron from "./assets/Macaron.jpg";
import Tiramisu from "./assets/Tiramisu.jpg";
import Meringue from "./assets/Meringue.jpg";
import Panna from "./assets/Panna.jpg";
import emptycart from "./assets/emptycart.svg";
import add from "./assets/add.svg";
import remove from "./assets/remove.svg";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const items = [
    {
      name: "Waffle with Berries",
      price: 6.5,
      description: "Waffle",
      imgSrc: waffle,
    },
    {
      name: "Vanilla Bean Crème Brûlée",
      price: 7.0,
      description: "Crème Brûlée",
      imgSrc: Creme,
    },
    {
      name: "Macaron Mix of Five",
      price: 8.0,
      description: "Macaron",
      imgSrc: Macaron,
    },
    {
      name: "Classic Tiramisu",
      price: 5.5,
      description: "Tiramisu",
      imgSrc: Tiramisu,
    },
    {
      name: "Pistachio Baklava",
      price: 4.0,
      description: "Baklava",
      imgSrc: Baklava,
    },
    {
      name: "Lemon Meringue Pie",
      price: 5.0,
      description: "Pie",
      imgSrc: Meringue,
    },
    { name: "Red Velvet Cake", price: 4.5, description: "Cake", imgSrc: Cake },
    {
      name: "Salted Caramel Brownie",
      price: 5.5,
      description: "Brownie",
      imgSrc: Brownie,
    },
    {
      name: "Vanilla Panna Cotta",
      price: 6.5,
      description: "Panna Cotta",
      imgSrc: Panna,
    },
  ];

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const increaseQuantity = (itemName) => {
    const updatedCart = cart.map((item) =>
      item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (itemName) => {
    const updatedCart = cart.map((item) =>
      item.name === itemName ? { ...item, quantity: item.quantity - 1 } : item
    );

    setCart(updatedCart.filter((item) => item.quantity > 0));
  };

  const removeFromCart = (itemName) => {
    setCart(cart.filter((item) => item.name !== itemName));
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleConfirmOrder = () => {
    if (cart.length > 0) {
      setOrderConfirmed(true);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCart([]);
  };

  return (
    <div className="flex flex-col bg-red-50">
      <div className="flex-col text-5xl font-bold pt-28 pl-96">Desserts</div>
      <div className="flex">
        <div className="grid grid-cols-3 gap-2 p-5 pl-96">
          {items.map((item, index) => {
            const cartItem = cart.find(
              (cartItem) => cartItem.name === item.name
            );
            return (
              <div
                key={index}
                className="relative border p-4 rounded-lg shadow-lg group hover:scale-105 transition ease-in-out"
              >
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  className="w-full h-56 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-400 mt-4 -mb-3 pt">
                  {item.description}
                </p>
                <h3 className="text-xl font-semibold mt-4">{item.name}</h3>
                <p className="text-lg text-gray-700">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex-row">
                  {cartItem ? (
                    <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 px-3 py-1 flex justify-between items-center bg-red-600 text-white rounded-full w-32">
                      <button
                        onClick={() => decreaseQuantity(item.name)}
                        className="px-2 text-white text-lg bg-red-600 rounded-full border-opacity-100 transition ease-in-out"
                      >
                        –
                      </button>
                      <span className="px-2">{cartItem.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.name)}
                        className="px-2 text-white text-lg"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="absolute bottom-24 left-1/2 transform -translate-x-1/2 px-6 py-1 text-black bg-white border border-red-500 rounded-full hover:text-red-500 transition ease-in-out"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-10 w-96 h-2/5 bg-white rounded-xl mt-5">
          <h2 className="text-4xl font-bold mb-6 text-red-500">
            Your Cart ({cart.length})
          </h2>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center">
              <img src={emptycart} alt="empty cart" className="w-full h-44" />
              <p className="text-base text-gray-500 italic">
                Your added items will appear here
              </p>
            </div>
          ) : (
            <div>
              <ul>
                {cart.map((item, index) => (
                  <li key={index} className="flex items-center mb-4">
                    <div className="flex flex-col">
                      <span className="font-bold">{item.name}</span>
                      <span>
                        <span className="text-red-500 font-bold">
                          {item.quantity}x
                        </span>
                        <span className="text-gray-400"> @</span> $
                        {item.price.toFixed(2)}
                      </span>
                    </div>
                    <img
                      src={remove}
                      onClick={() => removeFromCart(item.name)}
                      className="ml-auto px-4 py-2 cursor-pointer border hover:bg-red-600 transition ease-in-out"
                    />
                  </li>
                ))}
              </ul>

              <div className="mt-6 mb-10">
                <hr className="border-gray-300 mb-4" />
                <div className="flex justify-between text-xl font-semibold text-gray-700">
                  <span>Order Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>

              <div className="flex justify-center items-center -mt-5 -mb-5">
                <p className="bg-red-100 p-4 px-12 rounded-lg text-sm">This is a <span className="font-bold">carbon-neutral</span> delivery.</p>
              </div>

              <div className="flex flex-col items-center m-20">
                <button
                  onClick={handleConfirmOrder}
                  className="w-80 px-3 py-3 -mt-10 bg-red-600 text-white rounded-3xl hover:bg-red-800"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-green-500">
                Order Confirmed
              </h2>
              <p className="text-base text-gray-500">
                We hope you enjoy your food!
              </p>
            </div>

            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-left">
                  <img
                    src={item.imgSrc}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg"
                  />
                    <span className="font-bold">{item.name}</span>
                    <span className="font-bold">{item.quantity}x</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <h3 className="text-lg font-bold">Order Total: ${calculateTotal()}</h3>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-800"
              >
                Start New Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
