import ReactDom from "react-dom/client";
import App from "./App";

const Approot = ReactDom.createRoot(document.getElementById("eve"));
Approot.render(<App />);
