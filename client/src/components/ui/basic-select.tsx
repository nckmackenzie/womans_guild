import { FormControl } from './form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
// import { Option } from "@/index";
import { cn } from '@/lib/utils';
import { type Option } from '@/types';
// import type { Option } from 'index';

interface BasicSelectProps {
  options: Option[];
  onChange?: (value: string) => void;
  defaultValue?: string | undefined;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  value?: string;
}

export default function BasicSelect({
  options,
  defaultValue,
  onChange,
  placeholder = 'Select one...',
  disabled,
  hasError,
  value,
}: BasicSelectProps) {
  return (
    <Select
      onValueChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <FormControl>
        <SelectTrigger
          className={cn('', hasError && 'border border-destructive')}
          value={value}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map(option => (
          <SelectItem value={option.value} key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
