import React from "react";
import Header from "../common/header/Header";
import ProductCard from "../customer/collections/ProductCard";
import Footer from "../common/footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

function CollectionsPage() {
  return (
    <div>
      <Header />

      <div>
        <ProductCard />
      </div>

      <Footer />
    </div>
  );
}

export default CollectionsPage;
