import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /\[\[form\]\]\s*\n(.*)\n---\s*\n(.*)\n\[\[\/form\]\]/isg;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Form");
