import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /^\[\[code(\s[^\]]*)?\]\](.*?)\[\[\/code\]\](\s|$)/msig;
  recursion = true;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Code");
