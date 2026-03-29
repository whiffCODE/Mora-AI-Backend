import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// =======================
// 📄 SIMPLE TEXT PARSER
// =======================
export async function parsePDF(filePath) {
  const loadingTask = pdfjsLib.getDocument({
    url: filePath,
    disableWorker: true,
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


// =======================
// 🧠 PAGE-WISE PARSER (BASIC)
// =======================
export async function parsePDFWithPages(filePath) {
  const loadingTask = pdfjsLib.getDocument({
    url: filePath,
    disableWorker: true,
    useSystemFonts: true
  });

  const pdf = await loadingTask.promise;

  let pages = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const text = content.items.map(item => item.str).join(" ");

    pages.push({
      pageNumber: i,
      text
    });
  }

  return pages;
}


// =======================
// 🎯 ADVANCED PARSER (HIGHLIGHT READY)
// =======================
export async function parsePDFWithPositions(filePath) {
  const loadingTask = pdfjsLib.getDocument({
    url: filePath,
    disableWorker: true,
    useSystemFonts: true
  });

  const pdf = await loadingTask.promise;

  let pages = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const items = content.items.map((item) => {
      return {
        text: item.str,

        // 📍 Positioning (for highlight overlay)
        x: item.transform[4],
        y: item.transform[5],

        // 📏 Size
        width: item.width,
        height: item.height
      };
    });

    const fullText = items.map(i => i.text).join(" ");

    pages.push({
      pageNumber: i,
      text: fullText,
      items // 🔥 important for highlight rendering
    });
  }

  return pages;
}