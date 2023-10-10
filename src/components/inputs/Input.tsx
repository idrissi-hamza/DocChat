import { cn } from '@/lib/utils';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  register: UseFormRegister<any>;
  errors: any;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  register,
  errors,
  placeholder,
}) => {
  return (
    <div className="w-full relative flex flex-col gap-1">
      <label
        className={cn('font-semibold', 'text-sm', 'text-slate-700', {
          'text-rose-500': errors[id],
          'text-neutral-800': !errors[id],
        })}
      >
        {label}
      </label>
      {errors[id] ? (
        <span className="text-xs italic text-red-500">
          {errors[id]?.message}
        </span>
      ) : null}

      <input
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder={placeholder}
        type={type}
        className={cn(
          'peer w-full p-2 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed',
          {
            'border-rose-500 focus:border-rose-500': errors[id],
            'border-neutral-300 focus:border-black': !errors[id],
          }
        )}
      />
    </div>
  );
};

export default Input;
