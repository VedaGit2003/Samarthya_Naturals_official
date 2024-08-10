import React, { useEffect, useState } from 'react'
import Lay from '../components/Layout/Lay'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import DropIn from "braintree-web-drop-in-react"

const CartPage = () => {
  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart()
  const [clientToken, setClientToken] = useState("")
  const [instance, setInstance] = useState("")
  const [loading, setLoading] = useState(false);
  const [terms,setTerms]=useState(false)
  const navigate = useNavigate()

  //total price
  const totalPrice = () => {
    try {
      let total = 0
      cart?.map((item) => {
        total = total + item.price
      })
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR"
      })
    } catch (error) {
      console.log(error)
    }
  }

  //delete item
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex((item) => item._id === pid)
      myCart.splice(index, 1)
      setCart(myCart)
      localStorage.setItem('cart', JSON.stringify(myCart))
    } catch (error) {
      console.log(error)
    }
  }

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/braintree/token')
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getToken()
  }, [auth?.token])

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCheckbox=()=>{
    setTerms(!terms)
  }

  return (
    <Lay title={"Cart-ShipShop"}>
      <div className='container' style={{ display: 'flex', flexDirection: 'column' }} >
        <div className='row' >
          <div className='col-md-12' >
            <h1 className='text-center bg-light p-2 mb-1'>
              {`Hellow ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className='text-center'>
              {cart?.length ? `You have ${cart?.length} items in your cart ${auth?.token ? ""
                : "Please Login to checkout"}` : "Your Cart is Empty"
              }
            </h4>
          </div>
        </div>
        <div className='row' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='col-md-6'>
            {
              cart?.map((p) => (
                <div className='row mb-2 card flex-row p-3'>
                  <div className='col-md-4'>
                    <img src={`/api/v1/product/product-photo/${p._id}`}
                      className='card-img-top' alt={p.name}
                      style={{ width: "90%", height: "90%", border: "0.5px solid grey" }}
                    />
                  </div>
                  <div className='col-md-8'>
                    <p>Product name: {p.name.substring(0, 30)}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price :<strong style={{ color: 'green' }}>{p.price}</strong> </p>
                    <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
          <div className='col-md-4'>
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {
              auth?.user?.address ? (<>
                <div className='mb-3'>
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button className='btn btn-outline-warning'
                    onClick={() => navigate('/dashboard/user/profile')}>
                    Update Address
                  </button>
                </div>
              </>) :
                (<div className='mb-3'>
                  {
                    auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Plase Login to checkout
                      </button>
                    )
                  }
                </div>)
            }
            <h2>Click the checkbox to continue payment</h2>
            <input type='checkbox' onClick={handleCheckbox}/><h9>I agree with Terms and conditions</h9>
            <div className="mt-2">
              {!clientToken || !cart?.length || !terms ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Lay>
  )
}

export default CartPage

// import React, { useState, useEffect } from "react";
// // import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Lay from "../components/Layout/Lay";

// const CartPage = () => {
//   const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useCart();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   //total price
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item.price;
//       });
//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //detele item
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get payment gateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/braintree/token");
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   //handle payments
//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const { data } = await axios.post("/api/v1/product/braintree/payment", {
//         nonce,
//         cart,
//       });
//       setLoading(false);
//       localStorage.removeItem("cart");
//       setCart([]);
//       navigate("/dashboard/user/orders");
//       toast.success("Payment Completed Successfully ");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };
//   return (
//     <Lay>
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <h1 className="text-center bg-light p-2 mb-1">
//               {`Hello ${auth?.token && auth?.user?.name}`}
//             </h1>
//             <h4 className="text-center">
//               {cart?.length
//                 ? `You Have ${cart.length} items in your cart ${
//                     auth?.token ? "" : "please login to checkout"
//                   }`
//                 : " Your Cart Is Empty"}
//             </h4>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-8">
//             {cart?.map((p) => (
//               <div className="row mb-2 p-3 card flex-row" key={p._id}>
//                 <div className="col-md-4">
//                   <img
//                     src={`/api/v1/product/product-photo/${p._id}`}
//                     className="card-img-top"
//                     alt={p.name}
//                     width="100px"
//                     height={"100px"}
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   <p>{p.name}</p>
//                   <p>{p.description.substring(0, 30)}</p>
//                   <p>Price : {p.price}</p>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => removeCartItem(p._id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="col-md-4 text-center">
//             <h2>Cart Summary</h2>
//             <p>Total | Checkout | Payment</p>
//             <hr />
//             <h4>Total : {totalPrice()} </h4>
//             {auth?.user?.address ? (
//               <>
//                 <div className="mb-3">
//                   <h4>Current Address</h4>
//                   <h5>{auth?.user?.address}</h5>
//                   <button
//                     className="btn btn-outline-warning"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="mb-3">
//                 {auth?.token ? (
//                   <button
//                     className="btn btn-outline-warning"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-outline-warning"
//                     onClick={() =>
//                       navigate("/login", {
//                         state: "/cart",
//                       })
//                     }
//                   >
//                     Plase Login to checkout
//                   </button>
//                 )}
//               </div>
//             )}
//             <div className="mt-2">
//               {!clientToken || !cart?.length ? (
//                 ""
//               ) : (
//                 <>
//                   <DropIn
//                     options={{
//                       authorization: clientToken,
//                       paypal: {
//                         flow: "vault",
//                       },
//                     }}
//                     onInstance={(instance) => setInstance(instance)}
//                   />

//                   <button
//                     className="btn btn-primary"
//                     onClick={handlePayment}
//                     disabled={loading || !instance || !auth?.user?.address}
//                   >
//                     {loading ? "Processing ...." : "Make Payment"}
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Lay>
//   );
// };

// export default CartPage;