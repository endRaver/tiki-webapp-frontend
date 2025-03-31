interface SelectionProps {
  title: string;
  name: string;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

const Selection = ({
  children,
  name,
  title,
  ariaLabel,
  className,
}: SelectionProps) => {
  return (
    <label
      htmlFor={title}
      className={`group flex items-center gap-2 ${className}`}
      aria-label={ariaLabel}
    >
      <input
        id={title}
        type="radio"
        name={name}
        className="radio group-hover:border-primary-300 checked:border-primary-300 checked:text-primary-300 h-[18px] w-[18px] border-[#c4c4cf] bg-transparent checked:bg-transparent"
      />
      {children}
    </label>
  );
};

export default Selection;
