import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /(\n)?\[\[div(\s.*?)?\]\] *\n(.*?)\[\[\/div\]\] */msig;
  recursion = true;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Div");
