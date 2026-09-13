import { Page } from "./page.ts";
import type { DataType } from "./utils/data.ts";
import { load } from "./wikidot.ts";

const title = document.getElementById("title") as HTMLInputElement;
const source = document.getElementById("source") as HTMLTextAreaElement;
const tags = document.getElementById("tags") as HTMLInputElement;
const preview = document.getElementById("preview") as HTMLIFrameElement;
const previewButton = document.getElementById("preview-button") as HTMLInputElement;
const saveButton = document.getElementById("save-button") as HTMLInputElement;
const saveContent = document.getElementById("save-content") as HTMLDivElement;

const page = new Page();

const getData = (): DataType => {
  return { title: title.value, source: source.value, tags: tags.value };
};

const getSaveStatus = (): boolean => {
  return (
    title.value === savedData.title &&
    source.value === savedData.source &&
    tags.value === savedData.tags
  )
}

const saveCheck = (): void => {
  if (getSaveStatus()) saveContent.style = "";
  else {
    saveContent.className = "warning";
    saveContent.innerHTML = "代码未保存！";
    saveContent.style = "display:block";
  };
}

const keydown = (event: KeyboardEvent): void => {
  if ((event.ctrlKey || event.metaKey) && event.key === "s") {
    event.preventDefault();
    saveButton.click();
  }
}

const saved = localStorage.getItem("data");

let savedData: DataType;

if (saved) {
  savedData = JSON.parse(saved);
  title.value = savedData.title;
  source.value = savedData.source;
  tags.value = savedData.tags;
} else {
  savedData = getData();
}

title.addEventListener("input", saveCheck);
title.addEventListener("keydown", keydown);
source.addEventListener("input", saveCheck);
source.addEventListener("keydown", keydown);
tags.addEventListener("input", saveCheck);
tags.addEventListener("keydown", keydown);

previewButton.addEventListener("click", () => {
  preview.srcdoc = page.renderHtml(getData());
  preview.addEventListener("load", () => {
    load(preview.contentDocument!);
  });
});

saveButton.addEventListener("click", () => {
  localStorage.setItem("data", JSON.stringify(getData()));
  savedData = getData();
  saveCheck();

  saveContent.className = "accept";
  saveContent.innerHTML = "保存成功！";
  saveContent.style = "display:flex";
});

previewButton.click();

window.addEventListener("beforeunload", (event) => {
  if (!getSaveStatus()) event.preventDefault();
})
