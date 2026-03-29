import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function parsePDF(filePath) {
  const loadingTask = pdfjsLib.getDocument({
    url: filePath,
    disableWorker: true,

    // 🔥 FIXES WARNINGS
    standardFontDataUrl: null,
    useSystemFonts: true
  });

  const pdf = await loadingTask.promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const pageText = content.items.map(item => item.str).join(" ");
    text += pageText + "\n";
  }

  return text;
}