import { saveAs } from "file-saver";
import Papa from "papaparse";

export const downloadCSV = (students) => {
  if (!students || students.length === 0) {
    alert("No student data available to export.");
    return;
  }

  const csv = Papa.unparse(students);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "students.csv");
};
