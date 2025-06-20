"use client";

import { Dialog } from "radix-ui";
import { Spinner } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import CloseButton from "@/app/_components/CloseButton";
import RequiredFieldsWarning from "@/app/_components/RequiredFieldsWarning";
import { useRenewCirculation } from "@/app/stores/useRenewCirculation";
import FormError from "@/app/_components/FormError";
import { renewCirculation } from "./renewCirculation";

const renewCirculationSchema = z.object({
    code: z.string().min(3, "Code must be at least 3 characters"),
    dueDate: z
        .string()
        .nonempty("Due date is required")
        .refine((date) => new Date(date) > new Date(), "Due date must be in the future"),
});

export type RenewCirculation = z.infer<typeof renewCirculationSchema>;

const RenewCirculationModal = () => {
    const { isOpen, close } = useRenewCirculation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm<RenewCirculation>({
        mode: "onChange",
        resolver: zodResolver(renewCirculationSchema),
    });

    const onSubmit = async (data: RenewCirculation) => {
        const response = await renewCirculation(data);
        if (response.success) {
          toast.success(response.message);
          reset();
        } else {
          toast.error(response.message);
        }
    };

    const fields: Array<[keyof RenewCirculation, string, string?, boolean?]> = [
        ["code", "Book Code"],
        ["dueDate", "New Due Date", "date"],
    ];

    return (
        <Dialog.Root open={isOpen} onOpenChange={(val) => !val && close()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-gray-900 p-8 shadow-lg focus:outline-none data-[state=open]:animate-contentShow">
                    <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        Renew Circulation
                    </Dialog.Title>
                    <Dialog.Description className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
                        Enter the book code and new due date to renew circulation.
                    </Dialog.Description>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
                        {fields.map(([name, label, type = "text", isOptional = false]) => (
                            <fieldset key={name} className="flex flex-col gap-2">
                                <label
                                    htmlFor={name}
                                    className="text-[15px] font-medium text-gray-700 dark:text-gray-300"
                                >
                                    {label} {!isOptional && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <input
                                    id={name}
                                    type={type}
                                    {...register(name)}
                                    className="h-[40px] rounded px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary"
                                />
                                {errors[name] && (
                                    <FormError error={errors[name]?.message} />
                                )}
                            </fieldset>
                        ))}

                        <RequiredFieldsWarning />

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                className="inline-flex h-[40px] items-center justify-center rounded bg-primary px-6 text-white font-medium hover:bg-primary/90 transition disabled:opacity-50"
                            >
                                Renew {isSubmitting && <Spinner size="2" />}
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

export default RenewCirculationModal;
