import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../common/components/Header/Header";

export type PageWrapperProps = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <Router>
      <Header></Header>
      {children}
    </Router>
  );
}
