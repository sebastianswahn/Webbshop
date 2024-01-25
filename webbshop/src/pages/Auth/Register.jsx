import { useFormik } from "formik";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (values.password !== values.passwordConfirmation) {
        errors.passwordConfirmation = "Passwords do not match";
      }
      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      const { error, success } = await register(values);

      if (error) {
        setError(error);
      }
      if (success) {
        setSuccess(success);
        navigate("/auth/login");
      }
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit}
      className="border p-4 shadow-xl rounded-lg w-[400px] bg-gray-200"
    >
      <h1 className="text-center pb-8 text-2xl">Register</h1>
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
        {form.errors.email && (
          <p className="text-red-500">{form.errors.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block">
          Password
        </label>
        <input
          id="password"
          value={form.values.password}
          onChange={form.handleChange}
          type="password"
          className="border border-gray-400 rounded-md w-full px-2 py-1"
        />
      </div>{" "}
      <div className="mb-4">
        <label htmlFor="passwordConfirmation" className="block">
          Confirm Password
        </label>
        <input
          id="passwordConfirmation"
          value={form.values.passwordConfirmation}
          onChange={form.handleChange}
          type="password"
          className="border border-gray-400 rounded-md w-full px-2 py-1"
        />
        {form.errors.passwordConfirmation && (
          <p className="text-red-500">{form.errors.passwordConfirmation}</p>
        )}
      </div>
      {error && (
        <p className="bg-red-500/30 text-red-800 font-semibold px-2 py-1 mb-3 rounded-md">
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
        className="bg-emerald-800 w-full mb-4 py-1.5 rounded-md text-white hover:bg-emerald-600 transition-colors"
      >
        Register
      </button>
      <p>
        Already a member?{" "}
        <Link className="text-blue-600 underline" to="/auth/login">
          Log in here!
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
