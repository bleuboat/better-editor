import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /^\[\[(?:tabview|tabs)(\s.*?)?\]\]\s*((?:\[\[tab(\s.*?)?\]\].*?\[\[\/tab\]\]\s*)+)\[\[\/(?:tabview|tabs)\]\] */msig;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Tabview");
