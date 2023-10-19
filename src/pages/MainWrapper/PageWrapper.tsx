import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../common/components/Header/Header";
import Footer from "../../common/components/Footer/Footer";
import { WrapperApplication } from "../../common/styled/main.styled";

export type PageWrapperProps = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <Router>
      <WrapperApplication>
        {children}
        <Footer />
      </WrapperApplication>
    </Router>
  );
}
