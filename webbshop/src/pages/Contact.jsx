import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Contact() {
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      axios
        .post("https://js2-ecommerce-api.vercel.app/api/messages", values)
        .then((response) => {
          console.log("API Response:", response);
          setSuccessMessage("Your message has been sent!");
          resetForm({});
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });
  return (
    <div className="flex flex-col items-center justify-center mt-12 bg-pink-100">
      <h1 className="text-center text-4xl p-4 pb-12">Send us a message!</h1>
      <form
        className="w-full max-w-md bg-white rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            {...formik.getFieldProps("message")}
          />
          {formik.touched.message && formik.errors.message ? (
            <p className="text-red-500 text-xs italic">
              {formik.errors.message}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-pink-400 w-full mb-4 py-1.5 rounded-md text-white hover:bg-pink-600 transition-colors"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="text-green-500 text-xs italic">{successMessage}</p>
      )}
    </div>
  );
}

export default Contact;
