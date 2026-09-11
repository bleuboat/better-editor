import { Page } from "./page.ts";

function typecheck(obj: HTMLElement, type: typeof HTMLElement): void {
  if (!(obj instanceof type)) throw TypeError;
}

const title = document.getElementById("title") as HTMLInputElement;
const source = document.getElementById("source") as HTMLTextAreaElement;
const tags = document.getElementById("tags") as HTMLInputElement;
const preview = document.getElementById("preview") as HTMLIFrameElement;

typecheck(title, HTMLInputElement);
typecheck(source, HTMLTextAreaElement);
typecheck(tags, HTMLInputElement);
typecheck(preview, HTMLIFrameElement);

function render(store: boolean = false): void {
  // store
  if (store) {
    const data = {
      title: title.value,
      source: source.value,
      tags: tags.value,
    }
    localStorage.setItem("data", JSON.stringify(data));
  }

  const content = new Page().render(source.value);
  preview.srcdoc = content;
}

const eventListener = (_: InputEvent) => render(true);
title.addEventListener("input", eventListener);
source.addEventListener("input", eventListener);
tags.addEventListener("input", eventListener);

// store
const stored = localStorage.getItem("data");
if (stored !== null) {
  const data: {
    title: string;
    source: string;
    tags: string;
  } = JSON.parse(stored);
  title.value = data.title;
  source.value = data.source;
  tags.value = data.tags;
  render();
}
