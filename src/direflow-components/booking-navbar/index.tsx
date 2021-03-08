import { DireflowComponent } from "direflow-component";
import App from "./App";

export default DireflowComponent.create({
  component: App,
  configuration: {
    tagname: "booking-navbar",
  },
  plugins: [
    {
      name: "font-loader",
      options: {
        google: {
          families: ["Lato"],
        },
      },
    },
    {
      name: "styled-components",
    },
  ],
});
