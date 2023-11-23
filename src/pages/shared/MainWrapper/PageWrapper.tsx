import React, { useEffect } from "react";
import Footer from "../../../common/components/Footer/Footer";
import { WrapperApplication } from "../../../common/styled/main.styled";
import { useUser } from "../../../hooks/useUser";

export type PageWrapperProps = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  const { handleCheckAuth } = useUser();

  useEffect(() => {
    handleCheckAuth();
  }, []);

  return (
    <>
      <WrapperApplication>
        {children}
        <Footer />
      </WrapperApplication>
    </>
  );
}
