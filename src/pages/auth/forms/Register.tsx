import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import { User } from 'src/types';
import { useAuth } from "src/context/AuthContext";
import { FaGoogle, FaFacebookF } from "react-icons/fa";


const RegisterForm = () => {
  // Router
  const navigate = useNavigate();
  // Hooks
  const { register, isLoading } = useAuth();
  // State UI
  const [user, setUser] = useState<Partial<User>>({});
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      await register(user);
      navigate("/");
    } catch (error: any) {
      setError(error.message || "An error occurred");
    }
  }

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
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput
            id="username"
            type="text"
            sizing="md"
            required
            className="form-control form-rounded-xl"
            value={user.username}
            onChange={e => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email Address" />
          </div>
          <TextInput
            id="email"
            type="email"
            sizing="md"
            required
            className="form-control form-rounded-xl"
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            sizing="md"
            required
            className="form-control form-rounded-xl"
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <Button
          type="submit"
          color={"primary"}
          className="w-full bg-primary text-white rounded-xl"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
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
  )
}

export default RegisterForm
