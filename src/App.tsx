import "./App.css";
import PageWrapper from "./pages/shared/MainWrapper/PageWrapper";
import Providers from "./providers";
import ApplicationRoutes from "./routes/routes";
import { MuiTheme } from "./themes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Providers muiTheme={MuiTheme}>
      <Router>
        <PageWrapper>
          <ApplicationRoutes></ApplicationRoutes>
        </PageWrapper>
      </Router>
    </Providers>
  );
}

export default App;
