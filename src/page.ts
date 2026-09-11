

export class Page {
  tokens: [string, { [key: string]: unknown }][]
  vars: { [key: string]: unknown }
  renderers: { [key: string]: unknown }

  constructor() {
    this.tokens = [];
    this.vars = {};
    this.renderers = {};
  }

  parse(_title: string, source: string): string {
    return source;
  }

  render(title: string, source: string): string {
    return this.parse(title, source);
  }
}
