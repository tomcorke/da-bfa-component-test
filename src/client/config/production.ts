import { Endpoints, getEndpoints } from "./common";

const config: Endpoints = {
  ...getEndpoints("https://www.da-guild.co.uk/class-selection/")
};

export default config;
