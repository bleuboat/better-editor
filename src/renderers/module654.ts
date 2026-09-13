import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /^\[\[module654\s([a-z0-9_\-\/]+)(\s+.*?)?\]\]\n(?:(.*?)\[\[\/module\]\])?/imsg;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Module654");
