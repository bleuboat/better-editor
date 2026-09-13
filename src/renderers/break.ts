import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = / _\n/g;

  process = (..._matches: string[]): string => {
    return this.token();
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "<br />";
  };
}).register("Break");
