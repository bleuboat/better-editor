import type { Page } from "../page.ts";

export const DELIM = "\xFF";
export const RULES = [
  "Include",
  "Prefilter",
  "Delimiter",
  "Code",
  "Form",
  "Raw",
  "Rawold",
  "Modulepre",
  "Module",
  "Module654",
  "Iftags",
  "Comment",
  "Iframe",
  "Date",
  "Math",
  "Concatlines",
  "Freelink",
  "Equationreference",
  "Footnote",
  "Footnoteitem",
  "Footnoteblock",
  "Bibitem",
  "Bibliography",
  "Bibcite",
  "Divprefilter",
  "Anchor",
  "User",
  "Blockquote",
  "Heading",
  "Toc",
  "Horiz",
  "Separator",
  "Clearfloat",
  "Break",
  "Span",
  "Size",
  "Div",
  "Divalign",
  "Collapsible",
  "Tabview",
  "Note",
  "Gallery",
  "List",
  "Deflist",
  "Table",
  "Tableadv",
  "Button",
  "Image",
  "Embed",
  "Social",
  "File",
  "Center",
  "Newline",
  "Paragraph",
  "Url",
  "Email",
  "Mathinline",
  "Interwiki",
  "Colortext",
  "Strong",
  "Emphasis",
  "Underline",
  "Strikethrough",
  "Tt",
  "Superscript",
  "Subscript",
  "Typography",
  "Tighten",
];

export class Renderer {
  static all: Map<string, typeof Renderer> = new Map;
  protected regex: RegExp | undefined;
  protected recursion: boolean = false;
  protected rule: string;
  protected page: Page;

  constructor(rule: string, page: Page) {
    this.rule = rule;
    this.page = page;
  }

  static register(name: string): void {
    Renderer.all.set(name, this);
  }

  protected token(options: { [key: string]: unknown } = {}): string {
    this.page.tokens.push([this.rule, options]);
    return DELIM + String(this.page.tokens.length - 1) + DELIM;
  }

  protected error(message: string): string {
    return `<div class="error-block">${message}</div>`;
  }

  protected attrs(text: string): { [key: string]: string } {
    const tmp = text.trim().split('="');
    const attrs: { [key: string]: string } = {};
    let key = null;

    for (const [ i, val ] of tmp.entries()) {
      if (i == 0) {
        key = val.trim();
        continue;
      }
      const pos = val.indexOf('"');
      attrs[key!] = val.substring(0, pos).replaceAll(/\\(.)/g, "$1");
      key = val.substring(pos + 1).trim();
    }

    return attrs;
  }

  protected parse(source: string): string {
    if (!this.regex) return source;
    if (!this.recursion) return source.replaceAll(this.regex, this.process);
    for (let i = 0; i < 100; i++) {
      const newSource = source.replaceAll(this.regex, this.process);
      if (source === newSource) return source;
      source = newSource;
    }
    throw Error;
  }

  parseWithFallback(source: string): string {
    try { source = this.parse(source); }
    catch (error) { console.error(error); }
    return source;
  }

  process = (..._matches: string[]): string => {
    throw Error;
  };

  render = (_options: { [key: string]: unknown }): string => {
    throw Error;
  };
}
