import { z } from "zod";
import { useStudentContext } from "../../context/StudentContext";
import { useState } from "react";

export default function useAddStudentForm(
  setIsModalOpen,
  initialData,
  onStudentAdded
) {
  const { addStudent } = useStudentContext();

  // Define validation schema for applications
  const applicationSchema = z.object({
    program: z.string().min(3, "Program must be at least 3 characters"),
    date: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
      message: "Invalid date",
    }),
    status: z.enum(["Pending", "Approved", "Rejected"]),
  });

  const studentSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    dateOfBirth: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
      message: "Invalid date",
    }),
    applications: z
      .array(applicationSchema)
      .nonempty("At least one application is required"),
  });

  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      email: "",
      dateOfBirth: "",
      applications: [],
    }
  );

  const [errors, setErrors] = useState({});

  const validateField = (field, value, index = null) => {
    let newData = { ...formData };

    if (index !== null) {
      newData.applications[index] = {
        ...newData.applications[index],
        [field]: value,
      };
    } else {
      newData[field] = value;
    }

    const validationResult = studentSchema.safeParse(newData);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      setErrors({
        ...errors,
        [field]:
          index !== null
            ? formattedErrors.applications?._errors?.[index] || ""
            : formattedErrors[field]?._errors[0] || "",
      });
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      setFormData((prev) => {
        const updatedApplications = [...prev.applications];
        updatedApplications[index] = {
          ...updatedApplications[index],
          [name.split(".")[1]]: value,
        };
        return { ...prev, applications: updatedApplications };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    validateField(name, value, index);
  };

  const addApplication = () => {
    setFormData((prev) => ({
      ...prev,
      applications: [
        ...prev.applications,
        { program: "", date: "", status: "Pending" },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationResult = studentSchema.safeParse(formData);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      setErrors({
        name: formattedErrors.name?._errors[0] || "",
        email: formattedErrors.email?._errors[0] || "",
        dateOfBirth: formattedErrors.dateOfBirth?._errors[0] || "",
        applications: formattedErrors.applications?._errors || [],
      });
      return;
    }

    addStudent(formData);

    if (onStudentAdded) onStudentAdded(formData);

    // Reset form
    setFormData({ name: "", email: "", dateOfBirth: "", applications: [] });
    setErrors({});
    setIsModalOpen(false);

    alert(
      initialData
        ? "Student details updated successfully!"
        : "Student added successfully!"
    );
  };

  return {
    studentSchema,
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    addApplication,
  };
}
