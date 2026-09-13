import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /([A-Za-z0-9_\.]+):((?!:)[A-Za-z0-9_\/=&~#.:;\-\+]+)/g;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Interwiki");
