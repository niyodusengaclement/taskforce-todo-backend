import { ExportToCsv } from "export-to-csv";
import path from "path";
import fs from "fs";

export default (items, title) => {
  try {
    const options = {
      fieldSeparator: ",",
      quoteStrings: "",
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: title || "My todos list",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);
    const csv = csvExporter.generateCsv(items, true);
    const fileName = `todo-list-${new Date().getTime()}.csv`;

    const filePath = path.join("./tmp/", fileName);
    fs.writeFileSync(filePath, csv);
    return { data: items };
  } catch (error) {
    return { error };
  }
};
