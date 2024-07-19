export default function ChatInput() {
  return (
    <div className="absolute bottom-0 w-full p-4">
      <input
        type="text"
        className=" bg-white text-[#907d99] p-4 w-full rounded-xl text-sm px-12 border"
        placeholder="Type Message ..."
      />
      <span className="absolute w-5 h-5 bg-accent rounded left-8 top-[32px]" />
      <span className="absolute w-5 h-5 bg-accent rounded right-8 top-[32px]" />
    </div>
  );
}
