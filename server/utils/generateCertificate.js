const fs = require("fs");
const path = require("path");
const { PDFDocument, StandardFonts } = require("pdf-lib");

const generateCertificate = async (name, jobTitle, filename) => {
  const templatePath = path.join(__dirname, "../templates/certificate_template.pdf"); // Your Canva PDF
  const outputPath = path.join(__dirname, "../certificates", filename);

  const templateBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(templateBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Customize coordinates based on your Canva design
  firstPage.drawText(name, { x: 200, y: 400, size: 22, font });
  firstPage.drawText(jobTitle, { x: 200, y: 360, size: 18, font });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
};

module.exports = generateCertificate;
