import { useState, useEffect, useCallback, useMemo } from "react";
import Button from "../../common/components/Button";
import InputText from "../../common/components/InputText";
import { FormSection, Title, WrapperLogin, WrapperLoginCard } from "./style";
import { authGuard } from "../../guard/auth/components/AuthGuard";
import { useRoutes } from "../../hooks/useRoutes";
import { useUser } from "../../hooks/useUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { routes } = useRoutes();
  const { handleLogin, loading } = useUser();

  useEffect(() => {
    if (authGuard.isAuthenticated()) {
      return routes.home();
    }
  }, []);

  const disableButton = useMemo(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    console.log("testeee 000");

    if (emailRegex.test(email) && password !== "") {
      console.log("testeee");
      return false;
    }
    return true;
  }, [email, password]);

  return (
    <WrapperLogin>
      <WrapperLoginCard>
        <FormSection>
          <Title>Login</Title>
          <InputText
            type="email"
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputText
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            title="Entrar"
            handleClick={() => handleLogin({ email, password })}
            disabled={disableButton}
            style={{ width: "100%" }}
            isLoading={loading}
          />
        </FormSection>
      </WrapperLoginCard>
    </WrapperLogin>
  );
}
