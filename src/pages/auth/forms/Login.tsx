import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button, Checkbox, Label, TextInput, Alert } from "flowbite-react";
import { useAuth } from "src/context/AuthContext";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const LoginForm = () => {
  // Router
  const navigate = useNavigate();
  // Hooks
  const { login, isLoading } = useAuth();
  // State UI
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/");
    } catch (error: any) {
      setError(error.message || "An error occurred");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} >
        {error && (
          <Alert color="failure" className="mb-4">
            {error}
          </Alert>
        )}
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            sizing="md"
            required
            className="form-control form-rounded-xl"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            sizing="md"
            required
            className="form-control form-rounded-xl"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" className="checkbox" />
            <Label
              htmlFor="accept"
              className="opacity-90 font-normal cursor-pointer"
            >
              Remember this Device
            </Label>
          </div>
          <Link to={"/"} className="text-primary text-sm font-medium">
            Forgot Password ?
          </Link>
        </div>
        <Button
          type="submit"
          color={"primary"}
          className="w-full bg-primary text-white rounded-xl"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-400 text-sm">hoặc</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            color="outline"
            className="w-full flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <FaGoogle /> Google
          </Button>
          <Button
            type="button"
            color="outline"
            className="w-full flex items-center justify-center gap-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            <FaFacebookF /> Facebook
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
