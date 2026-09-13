import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /[_a-z0-9\-]+(?:\.[_a-z0-9\-]+)*@[a-z0-9\-]+(?:\.[a-z0-9\-]+)+/g;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Email");
