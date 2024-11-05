export interface InputFieldProps {
  label: string;
  value: string;
  className?: string;
  onChange: (value: string) => void;
}

export interface TextAreaProps {
  label: string;
  value: string;
  className?: string;
  onChange: (value: string) => void;
}