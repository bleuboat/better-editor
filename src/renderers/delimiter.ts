import { DELIM, Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = new RegExp(DELIM, "g");

  process = (..._matches: string[]): string => {
    return this.token();
  };

  render = (_options: { [key: string]: unknown }): string => {
    return DELIM;
  };
}).register("Delimiter");
