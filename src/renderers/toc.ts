import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /^(?:\n*)\[\[(f[<>])?toc( .*)?\]\](\n)*/mg;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Toc");
