import "../assets/scss/button.scss"

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?:boolean,
  varient?: "Primary" | "Secondary";
}

export function Button({
  type,
  className,
  children,
  varient = "Primary",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={`${className} ${varient}`} {...rest}>
      {children}
    </button>
  );
}
