export const UserContainter = ({
  right,
  left,
}: {
  right: React.ReactNode;
  left: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-10 w-full p-2 gap-4">
      <div className="lg:col-span-5 col-span-10">{left}</div>
      <div className="lg:col-span-5 col-span-10">{right}</div>
    </div>
  );
};
