import { Page } from "./page.ts";

function typecheck(obj: HTMLElement, type: typeof HTMLElement): void {
  if (!(obj instanceof type)) throw TypeError;
}

const title = document.getElementById("title") as HTMLInputElement;
const source = document.getElementById("source") as HTMLTextAreaElement;
const preview = document.getElementById("preview") as HTMLIFrameElement;

typecheck(title, HTMLInputElement);
typecheck(source, HTMLTextAreaElement);
typecheck(preview, HTMLIFrameElement);

function render(_: InputEvent): void {
  preview.srcdoc = new Page().render(title.value, source.value);
}

title.addEventListener("input", render);
source.addEventListener("input", render);
