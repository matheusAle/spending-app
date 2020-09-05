import useFormHook from "react-hook-form";

export function useForm<P>(defs, defaultValues?) {

  return useFormHook<P>({
    validationSchema: defs.schema,
    defaultValues: defaultValues || defs.values
  });
};
