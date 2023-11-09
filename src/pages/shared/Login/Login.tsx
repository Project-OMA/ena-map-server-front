import { useState, useEffect, useCallback, useMemo } from "react";
import Button from "../../../common/components/Button";
import InputText from "../../../common/components/InputText";
import {
  ErrorText,
  FormSection,
  Title,
  WrapperLogin,
  WrapperLoginCard,
} from "./style";
import { authGuard } from "../../../guard/auth/components/AuthGuard";
import { useRoutes } from "../../../hooks/useRoutes";
import { useUser } from "../../../hooks/useUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { routes } = useRoutes();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { handleLogin, loading } = useUser();

  useEffect(() => {
    if (authGuard.isAuthenticated()) {
      return routes.home();
    }
  }, []);

  const disableButton = useMemo(() => {
    const emailRegex = /\S+@\S+\.\S+/;

    if (emailRegex.test(email) && password !== "") {
      return false;
    }
    return true;
  }, [email, password]);

  const submitLogin = async (data: any) => {
    try {
      await handleLogin(data);
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <WrapperLogin>
      <WrapperLoginCard>
        <FormSection>
          <Title>Login</Title>
          <InputText
            isError={isError}
            type="email"
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputText
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            isError={isError}
          />
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          <Button
            title="Entrar"
            handleClick={() => submitLogin({ email, password })}
            disabled={disableButton}
            style={{ width: "100%" }}
            isLoading={loading}
          />
        </FormSection>
      </WrapperLoginCard>
    </WrapperLogin>
  );
}
