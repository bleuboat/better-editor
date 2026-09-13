import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /(\[\[# )([-_A-Za-z0-9.%]+?)(\]\])/ig;

  process = (...matches: string[]): string => {
    const name = matches[2];
    const start = this.token({ name: name });
    return start;
  };

  render = (options: { [key: string]: unknown }): string => {
    const element = document.createElement("a");
    element.name = options.name as string;
    return element.outerHTML;
  };
}).register("Anchor");
