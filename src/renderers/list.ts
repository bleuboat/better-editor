import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /^((\*|#) .*\n)(?!\2 |(?: \{1,\}((?:\*|#) |\n)))/usmg;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("List");
