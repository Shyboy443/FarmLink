import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './cartcheckout.css';
let userid;
function CartCheckout() {
    const { cartId } = useParams();
    const [cart, setCart] = useState(null);
    const [totalWithDiscount, setTotalWithDiscount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [total, setTotal] = useState(0);
    const [coupon, setCoupon] = useState('');
    const [showModal, setShowModal] = useState(false);
    const shippingPrice = 10; // Hardcoded shipping price
    const discountAmount = 5; // Hardcoded discount amount

    useEffect(() => {
        const fetchCartDetails = async () => {
            userid = localStorage.getItem('userId');
            try {
                const response = await axios.get(`http://localhost:5000/api/cart/get/${cartId}`);
                setCart(response.data);
                calculateTotal(response.data);
            } catch (error) {
                console.error('Error fetching cart details:', error);
            }
        };

        fetchCartDetails();
    }, [cartId]);
    //console.log(userid);
    const calculateTotal = (cartData) => {
        let total = 0;
        let itemsCount = 0;
        cartData.items.forEach((item) => {
            total += item.amount;
            itemsCount += item.quantity;
            
        });
        //console.log(total);
        const totalWithDiscount = total - discountAmount + shippingPrice;

        setTotalWithDiscount(totalWithDiscount);
        setTotalItems(itemsCount);
        setTotal(total);
    };

    const handleCouponChange = (event) => {
        setCoupon(event.target.value);
    };

    const applyCoupon = () => {
        // Add coupon logic here
    };

    const placeOrder = async () => {
        try {
            //const userId = '662759a45804d5fceb0ee1cc';
            const orderData = {
                customer: userid,
                purchasedItems: cart.items.map(item => ({
                    product: item.product,
                    name: item.productName,
                    price: item.productPrice,
                    imageURL: item.productImageURL,
                    quantity: item.quantity,
                    amount: item.amount
                })),
                discountApplied: discountAmount,
                shippingCost: shippingPrice,
                totalCost: totalWithDiscount,
                orderStatus: 'Pending',
                orderDate: new Date()
            };

            const response = await axios.post('http://localhost:5000/api/order/add', orderData);
            console.log('Order placed successfully:', response.data);
            setShowModal(true); // Show modal on successful order placement
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const closeModal = async () => {
        setShowModal(false);
        try {                                                                               
            const response = await axios.delete(`http://localhost:5000/api/cart/deleteOrder/${cartId}`);
            console.log('Cart deleted successfully:', response.data);
            // Add additional logic here after deleting the cart
        } catch (error) {
            console.error('Error deleting cart:', error);
        }
    };

    return (
        <div className="cart-card">
            <div className="card-body">
                
                <div className="row">
                    <div className="col-md-7">
                        <div className="left21 border">
                            <div className="row">
                                <span className="cart-header21">Payment</span>
                                <div className="icons21">
                                    <img src="https://img.icons8.com/color/48/000000/visa.png" alt="visa"/>
                                    <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="mastercard"/>
                                    <img src="https://img.icons8.com/color/48/000000/maestro.png" alt="maestro"/>
                                </div>
                            </div>
                            <form className="class21">
                            <span>Cardholder's name:</span>
                                <input className="input21-cart" placeholder="Linda Williams"/>
                            <br/><span>Card Number:</span>
                                <input className="input21-cart" placeholder="0125 6780 4567 9909"/>
                            <div className="row">
                            <div className="col-4"><span>Expiry date:</span>
                                <input className="input21-cart" placeholder="YY/MM"/>
                            </div>
                            <div className="col-4"><span>CVV:</span>
                                <input id="cvv" className="input21-cart"/>
                                </div>
                            </div>
                                
                            </form>
                        </div>                        
                    </div>
                    <div className="col-md-5">
                        <div className="right21 border">
                            <div className="cart-header21">Order Summary</div>
                            <p>{totalItems} items</p>
                            {cart && cart.items.map((item) => (
                                <div className="row item" key={item._id}>
                                    <div className="col-4 align-self-center"><img className="img-fluid" src={item.imageUrl} alt={item.productName}/></div>
                                    <div className="col-8">
                                        <div className="row text-muted">{item.productName}</div>
                                        <div className="row"><b>$ {item.amount.toFixed(2)}</b></div>
                                        <div className="row">Qty: {item.quantity}</div>
                                    </div>
                                    <hr/>
                                </div>
                            ))}
                            
                            <div className="row lower21">
                                <div className="col text-left">Sub Total</div>
                                <div className="col text-right">$ {total}</div>
                            </div>
                            <div className="row lower21">
                                <div className="col text-left">Shipping</div>
                                <div className="col text-right">+ ${shippingPrice}</div>
                            </div>
                            <div className="row lower21">
                                <div className="col text-left">Discount</div>
                                <div className="col text-right">- ${discountAmount}</div>
                            </div>
                            <div className="row lower21">
                                <div className="col text-left">Coupon</div>
                                <div className="col text-right">
                                    <input className="coupon-input" type="text" value={coupon} onChange={handleCouponChange} placeholder="Enter Coupon"/>
                                    <button className="coupon-btn" onClick={applyCoupon}>Apply Coupon</button>
                                </div>
                            </div>
                            <div className="row lower21">
                                <div className="col text-left"><b>Total to pay</b></div>
                                <div className="col text-right"><b>$ {totalWithDiscount.toFixed(2)}</b></div>
                            </div>
                            <button className="button-27" onClick={placeOrder}>Place order</button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="cart-modal">
                    <div className="cart-modal-content">
                        <a href='/*'><span className="cart-close" onClick={closeModal}>&times;</span></a>
                        <p>Your order has been placed successfully!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartCheckout;
