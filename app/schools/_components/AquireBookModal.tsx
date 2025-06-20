"use client";

import FormError from "@/app/_components/FormError";
import { useAcquireBookModal } from "@/app/stores/useAcquireBookModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@radix-ui/themes";
import { Dialog } from "radix-ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangeEvent, useState } from "react";
import CloseButton from "@/app/_components/CloseButton";
import { getSuggestions } from "./getSuggestions";
import RequiredFieldsWarning from "@/app/_components/RequiredFieldsWarning";
import { cleanFormData } from "../utils/cleanFormData";
import { acquireBooks } from "./acquireBooks";
import toast from "react-hot-toast";

const acquisitionSchema = z.object({
  bookId: z.string().uuid({ message: "Invalid book ID" }),
  quantity: z.coerce.number().min(1, "The minimum number of books you can acquire is 1").max(200, "The maximum books you can acquire is 200"),
  supplier: z.string().min(2, "The supplier name must have at least 3 characters"),
  code: z.string().nonempty("Code is required").optional(),
  dateOfAcquisition: z.string().refine((date) => new Date(date) <= new Date(), {
    message: "Date must be in the past",
  }),
});

export type AddAquistion = z.infer<typeof acquisitionSchema>;

const AquireBookModal = () => {
  const { isOpen, close } = useAcquireBookModal();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    reset,
  } = useForm<AddAquistion>({
    mode: "onChange",
    resolver: zodResolver(acquisitionSchema),
  });

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [noSuggestions, setNoSuggestions] = useState(false);

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
    setValue("bookId", id);
    setSuggestions([]);
  };

  const onSubmit = async (data: AddAquistion) => {
    const selectedBookTitle = query;
    const cleanedData = cleanFormData(data);
    const response = await acquireBooks(cleanedData);

    if (response.success) {
      toast.success(response.message);
      reset();
      setQuery(selectedBookTitle);
      setValue("bookId", data.bookId);
    } else {
      toast.error(response.message);
    }
  };

  const fields: Array<[keyof AddAquistion | "book", string, string?, boolean?]> = [
    ["book", "Book Title"],
    ["quantity", "Quantity", "number"],
    ["dateOfAcquisition", "Date of Acquisition", "date"],
    ["code", "Code", "text"],
    ["supplier", "Supplier"]
  ];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(val) => !val && close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-gray-900 p-8 shadow-lg transition-all duration-300 ease-in-out focus:outline-none">
          <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Acquire Book
          </Dialog.Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 max-md:flex max-md:flex-col md:grid-cols-2 gap-6"
          >
            {fields.map(([name, label, type = "text", isOptional = false]) => (
              <fieldset
                key={name}
                className={`flex flex-col gap-2 ${name === "book" ? "col-span-2" : ""}`}
              >
                <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {label} {!isOptional && <span className="text-red-500">*</span>}
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
                    {loading && <div className="mt-2"><Spinner /></div>}
                    {noSuggestions && !loading && (
                      <div className="mt-2 text-sm text-gray-500">No suggestions found</div>
                    )}
                    <div className="bg-white shadow-lg rounded-md max-h-60 overflow-auto">
                      {suggestions.map((suggestion) => (
                        <div
                          key={suggestion.id}
                          className="px-3 py-2 dark:bg-gray-800 hover:bg-primary hover:text-white cursor-pointer"
                          onClick={() => handleSuggestionSelect(suggestion.id, suggestion.title)}
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
                    {...register(name as keyof AddAquistion, {
                      required: !isOptional ? `${label} is required` : false,
                    })}
                    className="h-[40px] rounded-md px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition duration-150 ease-in-out"
                  />
                )}

                <FormError error={errors[name as keyof AddAquistion]?.message} />
              </fieldset>
            ))}
            <RequiredFieldsWarning />
            <div className="md:col-span-2 flex justify-end pt-4">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="inline-flex h-[40px] items-center justify-center rounded-md bg-primary px-6 text-white font-medium hover:bg-primary/90 transition disabled:opacity-50"
              >
                Save Acquisition {isSubmitting && <Spinner size="2" />}
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

export default AquireBookModal;