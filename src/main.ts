import { Page } from "./page.ts";
import type { DataType } from "./utils/data.ts";
import { load } from "./wikidot.ts";

const title = document.getElementById("title") as HTMLInputElement;
const source = document.getElementById("source") as HTMLTextAreaElement;
const tags = document.getElementById("tags") as HTMLInputElement;
const preview = document.getElementById("preview") as HTMLIFrameElement;
const previewButton = document.getElementById("preview-button") as HTMLInputElement;
const saveButton = document.getElementById("save-button") as HTMLInputElement;

const page = new Page();

const getData = (): DataType => {
  return { title: title.value, source: source.value, tags: tags.value };
};

const saved = localStorage.getItem("data");
if (saved) {
  const data: DataType = JSON.parse(saved);
  title.value = data.title;
  source.value = data.source;
  tags.value = data.tags;
}

previewButton.addEventListener("click", () => {
  preview.srcdoc = page.renderHtml(getData());
  preview.addEventListener("load", () => {
    load(preview.contentDocument!);
  });
});

saveButton.addEventListener("click", () => {
  localStorage.setItem("data", JSON.stringify(getData()));
});

previewButton.click();
