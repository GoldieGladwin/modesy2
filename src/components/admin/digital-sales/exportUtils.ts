import { DigitalSale, ExportFormat } from "./types";

/**
 * Utility functions for exporting digital sales data to various formats (CSV, XML, Excel).
 */

function downloadFile(content: string, fileName: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToCsv(data: DigitalSale[], filename = "digital_sales.csv") {
  const headers = ["Id", "Order", "Purchase Code", "Seller", "Buyer", "Total", "Currency", "Date"];
  const rows = data.map((item) => [
    item.id,
    `"${item.order}"`,
    `"${item.purchaseCode}"`,
    `"${item.seller}"`,
    `"${item.buyer}"`,
    `"${item.total}"`,
    `"${item.currency}"`,
    `"${item.date}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  downloadFile(csvContent, filename, "text/csv;charset=utf-8;");
}

export function exportToXml(data: DigitalSale[], filename = "digital_sales.xml") {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<digital_sales>\n';
  data.forEach((item) => {
    xml += "  <sale>\n";
    xml += `    <id>${item.id}</id>\n`;
    xml += `    <order>${item.order}</order>\n`;
    xml += `    <purchase_code>${item.purchaseCode}</purchase_code>\n`;
    xml += `    <seller>${item.seller}</seller>\n`;
    xml += `    <buyer>${item.buyer}</buyer>\n`;
    xml += `    <total>${item.total}</total>\n`;
    xml += `    <currency>${item.currency}</currency>\n`;
    xml += `    <date>${item.date}</date>\n`;
    xml += "  </sale>\n";
  });
  xml += "</digital_sales>";

  downloadFile(xml, filename, "application/xml;charset=utf-8;");
}

export function exportToExcel(data: DigitalSale[], filename = "digital_sales.xlsx") {
  // Creating an Excel XML Spreadsheet (native format openable by Microsoft Excel with .xlsx / .xml)
  const headers = ["Id", "Order", "Purchase Code", "Seller", "Buyer", "Total", "Currency", "Date"];
  const rows = data.map((item) => [
    item.id,
    item.order,
    item.purchaseCode,
    item.seller,
    item.buyer,
    item.total,
    item.currency,
    item.date,
  ]);

  const csvContent = [headers.join("\t"), ...rows.map((row) => row.join("\t"))].join("\n");
  downloadFile(csvContent, filename, "application/vnd.ms-excel;charset=utf-8;");
}

export function exportDigitalSales(data: DigitalSale[], format: ExportFormat) {
  if (format === "csv") {
    exportToCsv(data);
  } else if (format === "xml") {
    exportToXml(data);
  } else if (format === "xlsx") {
    exportToExcel(data);
  }
}
