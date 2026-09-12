import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /^\[\[include ([a-zA-Z0-9\s\-:]+?)(\s+.*?)?(?:\]\])$/imsg;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Include");

