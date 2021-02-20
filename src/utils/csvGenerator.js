import { ExportToCsv } from "export-to-csv";
import fs from "fs";
import os from "os";
import path from "path";

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

    const homedir = os.homedir();
    const downloadPath = path.join(homedir, "Downloads");
    const filePath = path.join(downloadPath, fileName);

    const findDownloadDir = () => {
      const exists = fs
        .readdirSync(homedir)
        .filter((file) => fs.statSync(path.join(homedir, file)).isDirectory())
        .find((dirName) => dirName == "Downloads");
      return exists;
    };

    const createFile = () => {
      const downloadExists = findDownloadDir();
      if (downloadExists) {
        fs.writeFileSync(filePath, csv);
        return { data: items };
      }
      fs.mkdir(downloadPath, function (err, result) {
        if (!err) {
          fs.writeFileSync(filePath, csv);
          return { data: items };
        }
        return { error: err };
      });
    };
    return createFile();
  } catch (error) {
    return { error };
  }
};
