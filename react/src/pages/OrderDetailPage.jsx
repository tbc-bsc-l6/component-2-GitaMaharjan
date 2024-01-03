import React from "react";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import OrderDetails from "../customer/OrderDetails";
function OrderDetailPage() {
  return (
    <div>
      <Header />
      <OrderDetails />
      <Footer />
    </div>
  );
}

export default OrderDetailPage;
