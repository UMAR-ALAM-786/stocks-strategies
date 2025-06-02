export function Input({ ...props }) {
  return (
    <input
      {...props}
      className={`${props.className} p-2 rounded outline-none w-full`}
    />
  );
}