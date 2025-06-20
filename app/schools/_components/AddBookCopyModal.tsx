"use client";

import { Dialog, Select } from "radix-ui";
import { Controller, useForm } from "react-hook-form";
import { ChevronDownIcon, Spinner } from "@radix-ui/themes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import CloseButton from "@/app/_components/CloseButton";
import { useAddBookCopyModal } from "@/app/stores/useAddBookCopyModal";
import { CheckIcon } from "lucide-react";
import FormError from "@/app/_components/FormError";
import { ChangeEvent, useState } from "react";
import { getSuggestions } from "./getSuggestions";
import { addBookCopy } from "./addBookCopy";
import { cleanFormData } from "../utils/cleanFormData";

const bookCopySchema = z.object({
  condition: z.enum(["NEW", "GOOD", "DAMAGED", "OLD"]).optional(),
  dateOfAcquisition: z
    .string()
    .nonempty("Date of Acquisition is required")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date <= new Date();
    }, {
      message: "Date of Acquisition must be in the past",
    }),

  callNo: z
    .string()
    .max(20)
    .refine((val) => val === "" || val.length >= 3, {
      message: "Call number must be at least 3 characters",
    })
    .optional(),
  barCode: z.string().max(15).optional(),
  code: z.string().nonempty("Code is required"),
  bookId: z.string().nonempty("Book is required"),
});

export type AddBookCopy = z.infer<typeof bookCopySchema>;

const AddBookCopyModal = () => {
  const { isOpen, close } = useAddBookCopyModal();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    setValue,
    reset,
  } = useForm<AddBookCopy>({
    mode: "onChange",
    resolver: zodResolver(bookCopySchema),
  });

  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { id: string; title: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noSuggestions, setNoSuggestions] = useState<boolean>(false);

  const onSubmit = async (data: AddBookCopy) => {
    const selectedBookTitle = query;
    const cleanedData = cleanFormData(data);
    const response = await addBookCopy(cleanedData);

    if (response.success) {
      toast.success(response.message);
      reset();
      setQuery(selectedBookTitle);
      setValue("bookId", data.bookId);
    } else {
      toast.error(response.message);
    }
  };

  const fetchSuggestions = async (query: string) => {
    try {
      setLoading(true);
      setNoSuggestions(false);
      const data = await getSuggestions(query);
      if (data.length === 0) setNoSuggestions(true);
      setSuggestions(data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookQueryChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setQuery(value);
    if (value.length > 0) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (id: string, title: string) => {
    setQuery(title);
    setSuggestions([]);
    setValue("bookId", id);
  };

  const fields: Array<[keyof AddBookCopy | "book", string, string?, boolean?]> = [
    ["book", "Book Title"],
    ["barCode", "Barcode", "text", true],
    ["dateOfAcquisition", "Date of Acquisition", "date", true],
    ["callNo", "Call Number", "text", true],
    ["code", "Code"],
  ];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(val) => !val && close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-gray-900 p-8 shadow-lg transition-all duration-300 ease-in-out focus:outline-none">
          <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Add New Book Copy
          </Dialog.Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 max-md:flex max-md:flex-col md:grid-cols-2 gap-6"
          >
            {fields.map(([name, label, type = "text", isOptional = false]) => (
              <fieldset
                key={name}
                className={`flex flex-col gap-2 ${name === "book" ? "col-span-2" : ""
                  }`}
              >
                <label
                  htmlFor={name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {label} {" "}
                  {!isOptional && <span className="text-red-500">*</span>}
                </label>

                {name === "book" ? (
                  <div className="col-span-2">
                    <input
                      id={name}
                      type={type}
                      value={query}
                      onChange={handleBookQueryChange}
                      className="h-[40px] rounded-md px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition duration-150 ease-in-out w-full"
                    />
                    {loading && (
                      <div className="mt-2">
                        <Spinner />
                      </div>
                    )}
                    {noSuggestions && !loading && (
                      <div className="mt-2 text-sm text-gray-500">
                        No suggestions found
                      </div>
                    )}
                    <div className="bg-white shadow-lg rounded-md max-h-60 overflow-auto">
                      {suggestions.map((suggestion) => (
                        <div
                          key={suggestion.id}
                          className="px-3 py-2 dark:bg-gray-800 hover:bg-primary hover:text-white cursor-pointer"
                          onClick={() =>
                            handleSuggestionSelect(
                              suggestion.id,
                              suggestion.title
                            )
                          }
                        >
                          {suggestion.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <input
                    id={name}
                    type={type}
                    {...register(name as keyof AddBookCopy, {
                      required: !isOptional ? `${label} is required` : false,
                    })}
                    className="h-[40px] rounded-md px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition duration-150 ease-in-out"
                  />
                )}

                <FormError error={errors[name as keyof AddBookCopy]?.message} />
              </fieldset>
            ))}

            <fieldset className="flex flex-col gap-2">
              <label
                htmlFor="condition"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Condition
              </label>
              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger
                      aria-label="Condition"
                      className="flex items-center justify-between h-[40px] rounded-md px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-primary transition duration-150 ease-in-out"
                    >
                      <Select.Value placeholder="Select Condition" />
                      <Select.Icon>
                        <ChevronDownIcon />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="bg-white dark:bg-gray-800 rounded-md shadow-lg">
                        <Select.Viewport>
                          {["NEW", "GOOD", "DAMAGED", "OLD"].map((value) => (
                            <Select.Item
                              key={value}
                              value={value}
                              className="flex items-center px-4 py-2 text-gray-800 dark:text-white cursor-pointer hover:bg-primary/10"
                            >
                              <Select.ItemText>{value}</Select.ItemText>
                              <Select.ItemIndicator className="ml-auto">
                                <CheckIcon />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                )}
              />
            </fieldset>

            <div className="md:col-span-2 flex justify-end pt-4">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="inline-flex h-[40px] items-center justify-center rounded-md bg-primary px-6 text-white font-medium hover:bg-primary/90 transition disabled:opacity-50"
              >
                Save Book Copy {isSubmitting && <Spinner size="2" />}
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

export default AddBookCopyModal;
