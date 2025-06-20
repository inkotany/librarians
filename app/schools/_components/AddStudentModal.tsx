"use client";

import CloseButton from "@/app/_components/CloseButton";
import RequiredFieldsWarning from "@/app/_components/RequiredFieldsWarning";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@radix-ui/themes";
import { Dialog } from "radix-ui";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useAddStudentModal } from "../../../stores/useAddStudentModal";
import { addStudent } from "./addStudent";

const studentSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(100),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .max(100),
  parentPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^0\d{9}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address").optional(),
  studentCard: z
    .union([
      z.string().min(3, "Student card must be at least 3 characters"),
      z.literal(""),
    ])
    .optional(),

  className: z.string().refine(
    (val) => {
      const matches = val.match(/\d+/g) || [];
      return matches.length === 1;
    },
    {
      message: "Class name must contain exactly one numeric sequence",
    }
  ),
});

export type AddStudent = z.infer<typeof studentSchema>;

const AddStudentModal = () => {
  const { isOpen, close } = useAddStudentModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<AddStudent>({
    mode: "onChange",
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = async (data: AddStudent) => {
    const response = await addStudent(data);
    if (response.success) {
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }
  };

  const fields: Array<[keyof AddStudent, string, string?, boolean?]> = [
    ["firstName", "First Name"],
    ["lastName", "Last Name"],
    ["parentPhone", "Parent Phone"],
    ["email", "Email", "email", true],
    ["studentCard", "Student Card", "text", true],
    ["className", "Class Name"],
  ];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(val) => !val && close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-gray-900 p-8 shadow-lg focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            Add New Student
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
            Fill in the student details below and click save to continue.
          </Dialog.Description>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {fields.map(([name, label, type = "text", isOptional = false]) => (
              <fieldset key={name} className="flex flex-col gap-2">
                <label
                  htmlFor={name}
                  className="text-[15px] font-medium text-gray-700 dark:text-gray-300"
                >
                  {label}{" "}
                  {!isOptional && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  id={name}
                  type={type}
                  {...register(name)}
                  className="h-[40px] rounded px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary"
                />
                {errors[name] && (
                  <span className="text-red-500 text-xs">
                    {(errors as unknown)[name]?.message}
                  </span>
                )}
              </fieldset>
            ))}
            <RequiredFieldsWarning />

            <div className="md:col-span-2 flex justify-end pt-4">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="inline-flex h-[40px] items-center justify-center rounded bg-primary px-6 text-white font-medium hover:bg-primary/90 transition disabled:opacity-50"
              >
                Save Student {isSubmitting && <Spinner size="2" />}
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 inline-flex size-[25px] items-center justify-center rounded-full text-gray-500 hover:text-red-500 focus:outline-none"
              aria-label="Close"
            >
              <CloseButton />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddStudentModal;
