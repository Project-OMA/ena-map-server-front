import { useRoutes } from "../../../hooks/useRoutes";
import { HeaderBox, HeaderName } from "../../styled/main.styled";
import {
  HeaderTitle,
  ButtonSection,
  UserSection,
  WrapperButton,
  ButtonHeader,
} from "./style";
import { Drawer } from "@mui/material";
import { useCallback, useState } from "react";
import { UserCircle } from "@styled-icons/heroicons-solid/";
import { useUser } from "../../../hooks/useUser";
import { LogOut } from "@styled-icons/boxicons-regular";
import { Menu } from "@styled-icons/boxicons-regular";
import convertUserType from "../../../utils/convertUserType";
import { isAdmin, isTeacher } from "../../../utils/verifyTypeFromUser";
interface HeaderI {
  title: string;
}

export default function Header({ title }: HeaderI) {
  const { routes } = useRoutes();
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleBunttonActive = useCallback(
    (route: string) => {
      const path = window.location.pathname.split("/").pop();
      if (path) {
        if (path === "mapserver") {
          return false;
        }

        return path.includes(route);
      }
      return false;
    },
    [open]
  );

  return (
    <>
      {user && (
        <HeaderBox>
          <Drawer anchor="left" open={open} onClose={handleClose}>
            <UserSection>
              <UserCircle size={50} />
              {user?.name}

              <div style={{ marginTop: 5 }}>
                <strong>{user ? convertUserType(user.type) : ""}</strong>
              </div>
            </UserSection>
            <ButtonSection>
              {/* ADMIN - TEACHER */}
              {(isAdmin(user?.type) || isTeacher(user?.type)) && (
                <>
                  <ButtonHeader
                    isActive={handleBunttonActive("groups")}
                    onClick={() => routes.groups()}
                  >
                    Grupos
                  </ButtonHeader>

                  <ButtonHeader
                    isActive={handleBunttonActive("users")}
                    onClick={() => routes.users()}
                  >
                    {isAdmin(user?.type) ? "Usuários" : "Alunos"}
                  </ButtonHeader>

                  <ButtonHeader
                    isActive={handleBunttonActive("map")}
                    onClick={() => routes.map()}
                  >
                    Mapas
                  </ButtonHeader>
                </>
              )}

              {/* All users */}
              <ButtonHeader
                isActive={handleBunttonActive("my-groups")}
                onClick={() => routes.myGroups()}
              >
                Meus grupos
              </ButtonHeader>
            </ButtonSection>
            <ButtonHeader
              isActive={false}
              style={{ marginTop: "auto", gap: 10 }}
              onClick={() => routes.logout()}
            >
              <LogOut size={20} /> Logout
            </ButtonHeader>
          </Drawer>
          <button onClick={() => setOpen(true)}>
            {" "}
            <Menu size={25} />
          </button>

          <HeaderName>
            <HeaderTitle isActive={false} onClick={() => routes.home()}>
              {title}
            </HeaderTitle>
          </HeaderName>
          <WrapperButton></WrapperButton>
        </HeaderBox>
      )}
    </>
  );
}
