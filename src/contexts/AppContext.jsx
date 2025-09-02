import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  cart: [],
  orders: [],
  currentPage: 'home',
  selectedMenuItem: null,
  showItemModal: false,
  showOTPModal: false,
  toasts: [],
  phoneNumber: '',
  otpValue: '',
  isOTPVerified: false
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'SHOW_ITEM_MODAL':
      return { 
        ...state, 
        selectedMenuItem: action.payload, 
        showItemModal: true 
      };
    
    case 'HIDE_ITEM_MODAL':
      return { 
        ...state, 
        selectedMenuItem: null, 
        showItemModal: false 
      };
    
    case 'SHOW_OTP_MODAL':
      return { ...state, showOTPModal: true };
    
    case 'HIDE_OTP_MODAL':
      return { 
        ...state, 
        showOTPModal: false, 
        phoneNumber: '', 
        otpValue: '', 
        isOTPVerified: false 
      };
    
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    
    case 'SET_OTP_VALUE':
      return { ...state, otpValue: action.payload };
    
    case 'VERIFY_OTP':
      return { ...state, isOTPVerified: action.payload };
    
    case 'ADD_TO_CART':
      const newCart = [...state.cart, action.payload];
      localStorage.setItem('restaurant_cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    
    case 'UPDATE_CART_ITEM':
      const updatedCart = state.cart.map(item => 
        item.id === action.payload.id ? action.payload : item
      );
      localStorage.setItem('restaurant_cart', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };
    
    case 'REMOVE_FROM_CART':
      const filteredCart = state.cart.filter(item => item.id !== action.payload);
      localStorage.setItem('restaurant_cart', JSON.stringify(filteredCart));
      return { ...state, cart: filteredCart };
    
    case 'CLEAR_CART':
      localStorage.removeItem('restaurant_cart');
      return { ...state, cart: [] };
    
    case 'ADD_ORDER':
      const newOrders = [...state.orders, action.payload];
      localStorage.setItem('restaurant_orders', JSON.stringify(newOrders));
      return { ...state, orders: newOrders };
    
    case 'UPDATE_ORDER':
      const updatedOrders = state.orders.map(order => 
        order.id === action.payload.id ? action.payload : order
      );
      localStorage.setItem('restaurant_orders', JSON.stringify(updatedOrders));
      return { ...state, orders: updatedOrders };
    
    case 'ADD_TOAST':
      return { 
        ...state, 
        toasts: [...state.toasts, { 
          id: Date.now().toString(), 
          ...action.payload 
        }] 
      };
    
    case 'REMOVE_TOAST':
      return { 
        ...state, 
        toasts: state.toasts.filter(toast => toast.id !== action.payload) 
      };
    
    case 'LOAD_PERSISTED_DATA':
      const savedCart = localStorage.getItem('restaurant_cart');
      const savedOrders = localStorage.getItem('restaurant_orders');
      return {
        ...state,
        cart: savedCart ? JSON.parse(savedCart) : [],
        orders: savedOrders ? JSON.parse(savedOrders) : []
      };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOAD_PERSISTED_DATA' });
  }, []);

  const addToast = (message, type = 'info', duration = 3000) => {
    const toast = { message, type, duration };
    dispatch({ type: 'ADD_TOAST', payload: toast });
    
    if (duration > 0) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', payload: toast.id });
      }, duration);
    }
  };

  const contextValue = {
    ...state,
    dispatch,
    addToast
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}