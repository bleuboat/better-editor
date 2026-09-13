import { Renderer } from "../utils/render.ts";

(class extends Renderer {
  regex = /\n\[\[table(\s.*?)?\]\](\s*(?:\[\[row(?:\s[^\]]*)?\]\]\s*(?:\[\[(column|col|cell)(?:\s[^\]]*)?\]\].*?\[\[\/(column|col|cell)\]\]\s*)+\[\[\/row\]\]\s*)+)\[\[\/table\]\]\n/sig;
  recursion = true;

  process = (...matches: string[]): string => {
    return matches[0];
  };

  render = (_options: { [key: string]: unknown }): string => {
    return "";
  };
}).register("Tableadv");
