import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  import { TopNavigation } from './components/TopNavigation';
import Disserts from './components/disserts';
import { ItemDetailsModal } from './components/ItemDetailsModal';
 
function AppContent() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'menu': return <MenuPage />;
       case 'orders': return <OrdersPage />;
      case 'payment': return <PaymentPage />;
       default: return <HomePage />;
    }
  };

  const isHomePage = currentPage === 'home';

  return (

    <div className="min-h-screen bg-gray-50">

      <TopNavigation />

      {!isHomePage &&  <Disserts /> }
 
       {!isHomePage && <Navbar />}

      <main className="relative">
        {renderPage()}
      </main>

       {!isHomePage && <BottomNavigation />}

  
       <Routes>
        <Route path="/cart" element={< ItemDetailsModal />} />
        <Route path="/tracking" element={<OrderTrackingPage />} />
        <Route path="/itemdetails" element={<ItemDetailsModal />} />
        <Route path="/receipt" element={<ReceiptPage />} />
        <Route path="/pizza" element={<Disserts />} />
        </Routes>
       </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home/*" element={<AppContent />} />
          <Route path="/menu/*" element={<AppContent />} />
          <Route path="/cart/*" element={<AppContent />} />
          <Route path="/orders/*" element={<AppContent />} />
          <Route path="/payment/*" element={<AppContent />} />
          <Route path="/tracking/*" element={<AppContent />} />
          <Route path="/receipt/*" element={<AppContent />} />
           <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
