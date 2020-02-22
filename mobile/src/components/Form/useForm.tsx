import useFormHook from "react-hook-form";

export const useForm = (defs, defaultValues?) => {

  return useFormHook({
    validationSchema: defs.schema,
    defaultValues: defaultValues || defs.values
  });
};
