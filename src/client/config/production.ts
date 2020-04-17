import { Endpoints, getEndpoints } from "./common";

const config: Endpoints = {
  ...getEndpoints("https://class-selection.da-guild.co.uk/")
};

export default config;
