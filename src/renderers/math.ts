import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /^\[\[math(\s+[a-z0-9_]*?)?((?:\s+[a-z0-9]+="[^"]*"))*\s*\]\](.*?)\n\[\[\/math\]\](\s|$)/msig;
  recursion = true;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Math");
