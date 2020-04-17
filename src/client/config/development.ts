import { Endpoints, getEndpoints } from "./common";

const config: Endpoints = {
  // ...require('./mockData').default,
  ...getEndpoints("https://localhost:3443/")
};

export default config;
