type ItemProps = {
  title: string;
  navigation?: React.ReactElement;
  children: React.ReactNode;
};
export const UserItemComponent = ({
  title,
  navigation,
  children,
}: ItemProps) => {
  return (
    <div className="flex flex-col space-y-1 h-full bg-white shadow-lg rounded-lg text-[#4b2e9b]">
      <div className="flex items-center px-2 py-2 justify-between">
        <h2 className="text-2xl font-bold capitalize">{title}</h2>
        <div>{navigation}</div>
      </div>
      <div className="flex-1 ml-[-1.8rem]">{children}</div>
    </div>
  );
};
