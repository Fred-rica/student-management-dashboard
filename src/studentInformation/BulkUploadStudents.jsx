import { useStudentContext } from "../context/StudentContext";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const BulkUploadStudents = () => {
  const { students, addStudent } = useStudentContext();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;

      if (file.name.endsWith(".csv")) {
        parseCSV(data);
      } else if (file.name.endsWith(".xlsx")) {
        parseExcel(data);
      } else {
        alert(
          "❌ Upload failed. Invalid file format. Please upload a CSV or Excel file."
        );
      }
    };

    reader.readAsBinaryString(file);
  };

  const parseCSV = (data) => {
    Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => processStudents(result.data),
    });
  };

  const parseExcel = (data) => {
    const workbook = XLSX.read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const parsedData = XLSX.utils.sheet_to_json(sheet);
    processStudents(parsedData);
  };

  const processStudents = (data) => {
    if (!data || data.length === 0) {
      alert("❌ Upload failed. No valid student data found.");
      return;
    }

    const newStudents = data.map((student, index) => ({
      id: students.length + index + 1,
      name: student.name || "Unknown",
      email: student.email || "No Email",
      dateOfBirth: student.dateOfBirth || "N/A",
      applications: Number(student.applications) || 0,
      status: "Active", // Default status
    }));

    newStudents.forEach((student) => addStudent(student));

    alert(`✅ Upload successful! ${newStudents.length} students added.`);
  };

  return (
    <div className="relative cursor-pointer">
      <label
        htmlFor="fileUpload"
        className="cursor-pointer bg-[#0A2139] text-white px-1 md:px-4 py-3 rounded text-sm flex items-center"
      >
        Bulk Upload Students
      </label>
      <input
        id="fileUpload"
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileUpload}
        className="absolute opacity-0 w-0 h-0"
      />
    </div>
  );
};

export default BulkUploadStudents;
