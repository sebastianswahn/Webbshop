import { useFormik } from "formik";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export const RegisterForm = () => {
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const { error, success } = await register(values);

      if (error) {
        setError(error);
      }
      if (success) {
        setSuccess(success);
      }
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          id="email"
          value={form.values.email}
          onChange={form.handleChange}
          type="text"
          className="border border-gray-400 rounded-md w-full px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block">
          Password
        </label>
        <input
          id="password"
          value={form.values.password}
          onChange={form.handleChange}
          type="text"
          className="border border-gray-400 rounded-md w-full px-2 py-1"
        />
      </div>
      {error && (
        <p className="bg-red-500/30 text-red-800 font-semibold px-2 py-1 mb-3">
          {error}
        </p>
      )}
      {success && (
        <p className="bg-emerald-500/30 text-emerald-800 font-semibold px-2 py-1 mb-3">
          {success}
        </p>
      )}
      <button
        type="submit"
        className="bg-purple-800 w-full py-1.5 rounded-md text-white hover:bg-purple-900 transition-colors"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
