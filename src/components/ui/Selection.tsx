interface SelectionProps {
  title: string;
  name: string;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const Selection = ({
  children,
  name,
  title,
  ariaLabel,
  className,
  onClick,
  isActive,
}: SelectionProps) => {
  return (
    <label
      className={`group flex items-center gap-2 ${className}`}
      htmlFor={title}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <input
        id={title}
        type="radio"
        name={name}
        checked={isActive}
        onChange={onClick}
        className={`radio group-hover:border-primary-300 checked:border-primary-300 checked:text-primary-300 h-[18px] w-[18px] border-[#c4c4cf] bg-transparent checked:bg-transparent ${
          isActive ? "border-primary-300" : "border-[#c4c4cf]"
        }`}
      />
      {children}
    </label>
  );
};

export default Selection;
