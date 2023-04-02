interface Props {
  value: string;
  attrs?: Record<string, any>;
  className?: string;
  label?: string;
  placeholder?: string;
  size?: "xs" | "sm" | "base";
  type?: string;
  onChange: (value: string) => void;
}

export default function KmInput({
  value,
  attrs = {},
  className,
  label,
  placeholder = "",
  size,
  type = "text",
  onChange,
}: Props) {
  const inputClassName = size ? `font-size-${size}` : "";

  return (
    <div className={`km-input ${className ?? ""}`}>
      {label && <label>{label}</label>}
      <input
        className={inputClassName}
        type={type}
        value={value}
        placeholder={placeholder}
        {...attrs}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
