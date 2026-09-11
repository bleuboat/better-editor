import { DELIM, RENDERERS, RULES } from "./renderUtils.ts"

export class Page {
  tokens: [string, Map<string, unknown>][]
  vars: Map<string, unknown>
  renderers: Map<string, any>

  constructor() {
    this.tokens = [];
    this.vars = new Map();
    this.renderers = new Map();
  }

  parse(source: string): string {
    if (this.renderers.size === 0) {
      for (const rule of RULES) {
        const Renderer = RENDERERS.get(rule);
        if (Renderer !== undefined) {
          this.renderers.set(Renderer.name, new Renderer(this));
        }
      }
    }
    for (const renderer of this.renderers.values()) {
      source = renderer.parse(source);
    }
    return source;
  }

  render(source: string): string {
    const output: string[] = [];
    const key: string[] = [];
    let in_delim = false;
    for (const char of this.parse(source)) {
      if (in_delim) {
        if (char === DELIM) {
          const num_key = Number(key.join(""));
          const rule = this.tokens[num_key][0];
          const opts = this.tokens[num_key][1];
          output.push(this.renderers.get(rule)?.render(opts));
          in_delim = false;
        } else {
          key.push(char);
        }
      } else {
        if (char === DELIM) {
          key.length = 0;
          in_delim = true;
        } else {
          output.push(char);
        }
      }
    }
    return output.join("");
  }
}
