import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNavigation } from './components/BottomNavigation';
import { HomePage } from './components/HomePage';
import { MenuPage } from './components/MenuPage';
import { CartPage } from './components/CartPage';
import { OrdersPage } from './components/OrdersPage';
import { PaymentPage } from './components/PaymentPage';
import { OrderTrackingPage } from './components/OrderTrackingPage';
import { ReceiptPage } from './components/ReceiptPage';
import { ItemDetailsModal } from './components/ItemDetailsModal';
import { OTPModal } from './components/OTPModal';
import { Toast } from './components/Toast';

function AppContent() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'menu': return <MenuPage />;
      case 'cart': return <CartPage />;
      case 'orders': return <OrdersPage />;
      case 'payment': return <PaymentPage />;
      case 'tracking': return <OrderTrackingPage />;
      case 'receipt': return <ReceiptPage />;
      default: return <HomePage />;
    }
  };

  const isHomePage = currentPage === 'home';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show Navbar only if NOT home */}
      {!isHomePage && <Navbar />}
      
      <main className="relative">
        {renderPage()}
      </main>

      {/* Show BottomNavigation only if NOT home */}
      {!isHomePage && <BottomNavigation />}
       
      {/* Modals */}
      <ItemDetailsModal />
      <OTPModal />
      
      {/* Toast Notifications */}
      <Toast />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
