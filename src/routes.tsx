import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/home";
import SprintPage from "./pages/sprints";
import TicketPage from "./pages/tickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "tickets",
    element: (
      <Layout>
        <TicketPage />
      </Layout>
    ),
  },
  {
    path: "sprints",
    element: (
      <Layout>
        <SprintPage />
      </Layout>
    ),
  },
]);

export default router;
