import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiTrophyLine } from 'react-icons/ri';
import useStore from '../store/useStore';

export default function GlobalCheckoutModal() {
  const { 
    checkoutOpen, closeCheckout, checkoutItems, isAuth, 
    openLogin, claimedVoucher 
  } = useStore();

  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({ name: '', phone: '', address: '', city: '', pincode: '' });
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset steps when modal opens
  useEffect(() => {
    if (checkoutOpen) {
      setCheckoutStep(1);
      setShowSuccess(false);
      setPaymentMethod('');
      setVoucherApplied(false);
      setVoucherInput('');
    }
  }, [checkoutOpen]);

  if (!checkoutOpen) return null;

  const itemsTotal = checkoutItems.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);
  const shippingCharge = (voucherApplied && claimedVoucher === 'FREESHIP') ? 0 : 49;
  
  const calculateDiscount = () => {
    if (!voucherApplied || !claimedVoucher) return 0;
    if (claimedVoucher === 'FREESHIP') return 49;
    
    const val = parseInt(claimedVoucher.replace('TWIST', ''));
    if (!isNaN(val)) {
      if (val === 100) return 100;
      return (itemsTotal * val / 100);
    }
    return 0;
  };

  const discount = calculateDiscount();
  const finalTotal = itemsTotal + shippingCharge - discount;

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert('Please select a payment method!');
      return;
    }

    const newOrder = {
      id: 'TW' + Math.floor(Math.random() * 100000),
      date: new Date().toLocaleDateString(),
      items: checkoutItems.map(i => i.name).join(', '),
      total: finalTotal.toFixed(2),
      status: 'Processing',
      payment: paymentMethod.toUpperCase()
    };

    const existingOrders = JSON.parse(localStorage.getItem('twistwear_orders') || '[]');
    existingOrders.push(newOrder);
    localStorage.setItem('twistwear_orders', JSON.stringify(existingOrders));

    setShowSuccess(true);
  };

  return (
    <>
      <AnimatePresence>
        {checkoutOpen && !showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center px-4 bg-black/95 backdrop-blur-md"
            style={{ padding: '20px' }}
          >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0a0a0a] border border-[#c8a45c]/30 p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(200,164,92,0.2)] pointer-events-auto"
              >
                <button 
                  className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-20 pointer-events-auto"
                  onClick={closeCheckout}
                >
                  <RiCloseLine size={28} />
                </button>

                <h2 className="font-display text-4xl text-white mb-8 underline decoration-[#c8a45c]/30 underline-offset-8">
                  Checkout
                </h2>

                {checkoutStep === 1 ? (
                  <div className="flex flex-col gap-6 relative z-10">
                    <p className="text-[#c8a45c] text-xs uppercase tracking-[0.3em] font-black mb-4">Shipping Address</p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-white/40 text-[10px] uppercase">Full Name</label>
                        <input 
                          type="text" 
                          value={shippingInfo.name}
                          onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                          className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-[#c8a45c] pointer-events-auto" 
                          placeholder="Enter Name" 
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-white/40 text-[10px] uppercase">Phone Number</label>
                        <input 
                          type="text" 
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-[#c8a45c] pointer-events-auto" 
                          placeholder="+91 00000 00000" 
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-white/40 text-[10px] uppercase">Address</label>
                      <textarea 
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-[#c8a45c] min-h-[80px] pointer-events-auto" 
                        placeholder="Street, Apartment, Locality" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-white/40 text-[10px] uppercase">City</label>
                        <input 
                          type="text" 
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-[#c8a45c] pointer-events-auto" 
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-white/40 text-[10px] uppercase">Pincode</label>
                        <input 
                          type="text" 
                          value={shippingInfo.pincode}
                          onChange={(e) => setShippingInfo({...shippingInfo, pincode: e.target.value})}
                          className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-[#c8a45c] pointer-events-auto" 
                        />
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        const { name, phone, address, city, pincode } = shippingInfo;
                        if (!name || !phone || !address || !city || !pincode) {
                          alert('Please fill all details to proceed!');
                          return;
                        }
                        setCheckoutStep(2);
                      }}
                      className="w-full py-5 bg-[#c8a45c] text-black font-black text-xs uppercase tracking-[0.4em] hover:bg-[#d4b46c] mt-4 pointer-events-auto"
                    >
                      Next Step
                    </button>
                  </div>
              ) : checkoutStep === 2 ? (
                <div className="flex flex-col gap-8">
                  <div>
                    <p className="text-[#c8a45c] text-xs uppercase tracking-[0.3em] font-black mb-4">Order Summary</p>
                    <div className="max-h-[150px] overflow-y-auto mb-4 divide-y divide-white/5">
                      {checkoutItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-white/80 py-2">
                          <span className="text-sm italic">{item.name} {item.qty > 1 && `x${item.qty}`}</span>
                          <span className="font-mono text-sm">Rs. {(item.price * (item.qty || 1)).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between text-white/50 py-2 border-t border-white/5">
                      <span className="text-xs uppercase">Items Total</span>
                      <span className="text-xs">Rs. {itemsTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/50 py-2">
                      <span className="text-xs uppercase">Shipping</span>
                      <span className="text-xs uppercase">{shippingCharge === 0 ? 'FREE' : `Rs. ${shippingCharge}.00`}</span>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-[#c8a45c] text-[10px] font-black uppercase mb-3 tracking-widest italic">Apply Promo Code</p>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          className="flex-1 bg-transparent border border-white/10 p-3 text-white text-sm outline-none focus:border-[#c8a45c]" 
                          placeholder="ENTER CODE"
                          value={voucherInput}
                          onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                        />
                        <button 
                          onClick={() => {
                            if (voucherInput === claimedVoucher) {
                              setVoucherApplied(true);
                              alert('Success! Code applied.');
                            } else if (voucherInput === '') {
                              alert('Please enter a code.');
                            } else {
                              alert('Oops! This code is invalid or expired.');
                            }
                          }}
                          className="bg-[#c8a45c] text-black text-[10px] font-bold px-6 py-3 uppercase tracking-wider"
                        >
                          Use
                        </button>
                      </div>
                      {claimedVoucher && !voucherApplied && (
                        <p className="mt-3 text-[10px] text-white/30 italic">Hint: You have a code available! Check your Lucky Wheel result.</p>
                      )}
                    </div>

                    {voucherApplied && (
                      <div className="mt-4 flex justify-between text-[#c8a45c] py-2 font-bold italic border-t border-[#c8a45c]/20 pt-4">
                        <span>Voucher Discount ({claimedVoucher})</span>
                        <span>- Rs. {discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-white text-xl font-bold mt-6 pt-6 border-t border-white/10 uppercase tracking-tighter">
                      <span>Total Pay</span>
                      <span className="text-[#c8a45c]">Rs. {finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCheckoutStep(1)}
                      className="flex-1 py-5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.4em] hover:bg-white/5"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setCheckoutStep(3)}
                      className="flex-[2] py-5 bg-[#c8a45c] text-black font-black text-xs uppercase tracking-[0.4em]"
                    >
                      Payment
                    </button>
                  </div>
                </div>
              ) : checkoutStep === 3 ? (
                <div className="flex flex-col gap-8">
                  <p className="text-[#c8a45c] text-xs uppercase tracking-[0.3em] font-black">Select Payment Method</p>
                  
                  <div className="flex flex-col gap-4">
                    <div 
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-5 border transition-all cursor-pointer ${paymentMethod === 'upi' ? 'border-[#c8a45c] bg-[#c8a45c]/5' : 'border-white/10 hover:border-white/20'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold tracking-wider uppercase text-sm">UPI / G-Pay / PhonePe</span>
                        <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'upi' ? 'border-[#c8a45c] bg-[#c8a45c]' : 'border-white/20'}`} />
                      </div>
                      {paymentMethod === 'upi' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex flex-col gap-4">
                          <input type="text" placeholder="Enter UPI ID" className="bg-transparent border-b border-white/10 p-2 text-white italic text-xs outline-none" />
                          <button onClick={() => setShowScanner(!showScanner)} className="text-[#c8a45c] text-[10px] uppercase font-black underline tracking-widest text-left">
                            {showScanner ? 'Hide QR Scanner' : 'Show QR Scanner'}
                          </button>
                          {showScanner && (
                            <div className="bg-white p-4 w-40 h-40 mx-auto rounded-lg">
                              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TwistPay_${finalTotal}`} alt="UPI QR" className="w-full h-full" />
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>

                    <div 
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-5 border transition-all cursor-pointer ${paymentMethod === 'cod' ? 'border-[#c8a45c] bg-[#c8a45c]/5' : 'border-white/10 hover:border-white/20'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold tracking-wider uppercase text-sm">Cash on Delivery</span>
                        <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'cod' ? 'border-[#c8a45c] bg-[#c8a45c]' : 'border-white/20'}`} />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setCheckoutStep(2)} className="flex-1 py-5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.4em] hover:bg-white/5">Back</button>
                    <button onClick={handlePlaceOrder} className="flex-[2] py-5 bg-[#c8a45c] text-black font-black text-xs uppercase tracking-[0.4em] animate-pulse">Place Order</button>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200000] flex items-center justify-center bg-black/98 backdrop-blur-xl"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(100)].map((_, i) => {
                  const angle = (Math.random() * 360) * (Math.PI / 180);
                  const velocity = Math.random() * 50 + 10;
                  return (
                    <motion.div
                      key={i}
                      initial={{ x: '50vw', y: '50vh', rotate: 0, scale: 0, opacity: 1 }}
                      animate={{ 
                        x: `calc(50vw + ${Math.cos(angle) * velocity}vw)`, 
                        y: `calc(50vh + ${Math.sin(angle) * velocity}vh)`, 
                        rotate: 1440, scale: [0, 1.5, 0.8], opacity: [1, 1, 0] 
                      }}
                      transition={{ duration: Math.random() * 2.5 + 1.5, ease: "circOut" }}
                      style={{
                        position: 'absolute', width: Math.random() * 12 + 6 + 'px', height: Math.random() * 6 + 6 + 'px',
                        backgroundColor: ['#c8a45c', '#ffffff', '#ff4d4d', '#4db8ff', '#ffbe4d'][i % 5],
                        borderRadius: '2px', boxShadow: '0 0 15px rgba(200,164,92,0.3)', zIndex: 10
                      }}
                    />
                  );
                })}
            </div>

            <motion.div initial={{ scale: 0.8, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} className="text-center p-10 relative z-10">
              <div className="w-24 h-24 bg-[#c8a45c]/20 border border-[#c8a45c]/50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(200,164,92,0.3)]">
                <RiTrophyLine className="text-[#c8a45c] text-5xl animate-bounce" />
              </div>
              <h2 className="font-display text-5xl md:text-7xl text-white mb-4 italic font-black uppercase tracking-tighter">Order Placed!</h2>
              <p className="text-[#c8a45c] text-sm uppercase tracking-[0.6em] mb-12 font-black">Your style is on its way.</p>
              <button onClick={() => window.location.href = '/'} className="px-12 py-5 bg-[#c8a45c] text-black font-black text-xs uppercase tracking-[0.4em] hover:scale-105 transition-transform">Continue Shopping</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
