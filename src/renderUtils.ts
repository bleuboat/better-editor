import type { Page } from "./page";

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
  "Paragraph" ,
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
  regex: RegExp | undefined;
  rule: string;
  page: Page;

  constructor(rule: string, page: Page) {
    this.rule = rule;
    this.page = page;
  }

  token(options: { [key: string]: unknown }): string {
    this.page.tokens.push([this.rule, options]);
    return DELIM + String(this.page.tokens.length - 1) + DELIM;
  }

  _parse(source: string): string {
    if (this.regex === undefined) {
      throw Error;
    }
    return source.replaceAll(this.regex, this.process);
  }

  parse(source: string): string {
    try {
      source = this._parse(source);
    } catch (error) {
      console.error(error);
    }
    return source;
  }

  process = (..._matches: string[]): string => {
    throw Error;
  }

  render = (_options: { [key: string]: unknown }): string => {
    throw Error;
  }

  error(message: string): string {
    return `<div class="error-block">${message}</div>`
  }
}


export const RENDERERS = new Map<string, typeof Renderer>();
