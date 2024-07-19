import UserAuth from "@/components/user-auth";

export default function Login() {
  return (
    <div className="grid place-items-center w-full min-h-screen bg-gray-100">
      <div className="flex flex-col items-center bg-white w-full max-w-sm shadow-2xl rounded p-4 gap-4">
        <h3 className="text-accent font-bold text-2xl">Login</h3>
        <p className="text-center text-pretty">
          Login to the application to freely chat with your friends.
        </p>
        <UserAuth />
      </div>
    </div>
  );
}
