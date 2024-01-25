export const Card = ({ children }) => {
  return (
    <div className="border p-4 shadow-xl rounded-lg w-[400px] bg-gray-200">
      {children}
    </div>
  );
};
