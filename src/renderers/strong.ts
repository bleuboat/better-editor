import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /\*\*([^\s\n](?:.*[^\s\n])?)\*\*/ug;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Strong");

