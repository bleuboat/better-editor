import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /(\n)?\[\[note\]\]\n(.*?)\[\[\/note\]\]/msig;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Note");
