import { useForm as _useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { FormBuilder } from '@/components/Form/FormBuilder';

export function useForm<P>(defs: FormBuilder<P>) {

  return _useForm<P>({
    resolver: yupResolver(defs.schema),
    defaultValues: defs.values,
  });
}
