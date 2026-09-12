import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /__([^\s](?:.*[^\s])?)__/ug;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Underline");

