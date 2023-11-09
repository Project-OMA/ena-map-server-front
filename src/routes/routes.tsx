import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";
import { useUser } from '../hooks/useUser';
import UserTypes from '../constants/UserTypes';
import { IUser } from '../types/models/IUser';
import { ROUTES } from './RoutesConfig';
import Error404 from '../pages/shared/Error404';


type ComponentToRenderParams = {
  component: any,
  userType: UserTypes
}

const ComponentToRender = ({ component, userType }: ComponentToRenderParams) => {
  const Component = component[userType];
  return <Component />;
}

export default function ApplicationRoutes() {
  const user : IUser = useUser().user;

  function getRoutes() {

    let rt = ROUTES.map((r, i) => {
      if (r.isPublic) {
        return <Route key={i} {...r} element={<ComponentToRender component={r.component} userType={UserTypes.ANY} />} />;
      } else {
        if(user) return (
          <Route
            key={i}
            {...r}
            element={<PrivateRoute element={<ComponentToRender component={r.component} userType={user.type} />} />}
          />
        );
      }
    });

    rt.push(<Route path='*' element={<Error404 />} />)
    return rt;
  }

  return <Routes>{getRoutes()}</Routes>;
}
