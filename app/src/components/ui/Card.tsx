interface CardProps {
  children: React.ReactNode;
  highlight?: boolean;
  className?: string;
}

export default function Card({
  children,
  highlight = false,
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-sm ${
        highlight
          ? "ring-2 ring-primary shadow-md"
          : "ring-1 ring-gray-200"
      } ${className}`}
    >
      {children}
    </div>
  );
}
