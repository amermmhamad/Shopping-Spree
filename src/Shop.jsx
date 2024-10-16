import React, { useState } from 'react';
import waffle from './assets/waffle.jpg'; // Your existing image import
import Creme from './assets/Creme.jpg';
import Baklava from './assets/Baklava.jpg';
import Brownie from './assets/Brownie.jpg';
import Cake from './assets/Cake.jpg';
import Macaron from './assets/Macaron.jpg';
import Tiramisu from './assets/Tiramisu.jpg';
import Meringue from './assets/Meringue.jpg';
import Panna from './assets/Panna.jpg';
import emptycart from './assets/emptycart.svg';
import add from './assets/add.svg';
import remove from './assets/remove.svg';

const Shop = () => {
  const [cart, setCart] = useState([]);

  const items = [
    { name: "Waffle with Berries", price: 6.5, description: "Waffle", imgSrc: waffle },
    { name: "Vanilla Bean Crème Brûlée", price: 7.0, description: "Crème Brûlée", imgSrc: Creme }, // Replace with actual image paths
    { name: "Macaron Mix of Five", price: 8.0, description: "Macaron", imgSrc: Macaron },
    { name: "Classic Tiramisu", price: 5.5, description: "Tiramisu", imgSrc: Tiramisu },
    { name: "Pistachio Baklava", price: 4.0, description: "Baklava", imgSrc: Baklava },
    { name: "Lemon Meringue Pie", price: 5.0, description: "Pie", imgSrc: Meringue },
    { name: "Red Velvet Cake", price: 4.5, description: "Cake", imgSrc: Cake },
    { name: "Salted Caramel Brownie", price: 5.5, description: "Brownie", imgSrc: Brownie },
    { name: "Vanilla Panna Cotta", price: 6.5, description: "Panna Cotta", imgSrc: Panna }
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, cartIndex) => cartIndex !== index);
    setCart(newCart);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-col text-5xl font-bold pt-28 pl-40">
        Desserts
      </div>
      <div className="flex">
        <div className="grid grid-cols-3 gap-8 p-10 pl-40">
          {items.map((item, index) => (
            <div key={index} className="relative border p-4 rounded-lg shadow-lg group hover:scale-105 transition ease-in-out">
              <img src={item.imgSrc} alt={item.name} className="w-full h-56 object-cover rounded-lg" />
              <p className="text-sm text-gray-400 mt-4 -mb-3">{item.description}</p>
              <h3 className="text-xl font-semibold mt-4">{item.name}</h3>
              <p className="text-lg text-gray-700">${item.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(item)}
                className="absolute bottom-24 left-1/2 transform -translate-x-1/2 px-6 py-2  text-white bg-orange-400 rounded-full hover:bg-red-500 transition ease-in-out"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="p-10 w-1/3 bg-white rounded-lg -mt-5">
          <h2 className="text-3xl font-bold mb-6 text-red-500">Your Cart ({cart.length})</h2>
          {cart.length === 0 ? (
            <div>
                <p>Your added items will appear here</p>
                <img src={emptycart} alt='empty cart' />
            </div>
          ) : (
            <div>
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="flex items-center mb-4">
                  <img src={item.imgSrc} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                  <div className="flex flex-col">
                    <span className="font-bold">{item.name}</span>
                    <span>
                        <span className='text-red-500'>1x</span>
                         <span className='text-gray-400'> @</span> ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <img
                  src={remove}
                    onClick={() => removeFromCart(index)}
                    className="ml-auto px-4 py-2 cursor-pointer border hover:bg-red-600 transition ease-in-out"
                  />
                </li>
              ))}
            </ul>
                <div className='flex flex-col items-center m-20'>   
                <button
                className="px-4 py-3 bg-red-500 text-white rounded-3xl hover:bg-red-600 w-full">
                    Confirm Order
                </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
