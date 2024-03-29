
export default function signinLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="no-scrollbar h-full w-full">{children}</div>

  );
}
