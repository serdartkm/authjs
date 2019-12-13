import { h, render } from "preact";
import AppShell from "../../components/app-shell";

render(
  <div>
    <AppShell
      drawerItems={[{ route: "/modules", title: "Modules" },{ route: "/projects", title: "Projects" }]}
      appTitle="Portfolio"
      routes={[{ path: "/modules", load: () => import("./modules/index") },{ path: "/projects", load: () => import("./modules/index") }]}
    />
  </div>,
  document.getElementById("root")
);
