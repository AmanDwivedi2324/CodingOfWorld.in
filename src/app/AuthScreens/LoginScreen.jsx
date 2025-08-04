import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase";

// Assets & Components
import login from "../../assets/images/login.svg";
import CustomInput from "../../components/InputAndButton/CustomInput";
import CustomButton from "../../components/InputAndButton/CustomButton";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function LoginScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  // Formik setup
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setErrorMessage("");
      setResetSuccess("");
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;
        if (user.emailVerified) {
          navigate("/");
        } else {
          setErrorMessage("Please verify your email first.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleForgotPassword = async () => {
    setErrorMessage("");
    setResetSuccess("");
    if (!formik.values.email) {
      setErrorMessage("Please enter your email to receive a reset link.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, formik.values.email);
      setResetSuccess("Password reset link sent! Please check your inbox.");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    if (socialLoading) return;
    setSocialLoading(true);
    setErrorMessage("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google user:", result.user);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSocialLoading(false);
    }
  };

  return (
    <section className="transition-all duration-700 ease-in-out md:h-screen dark:bg-dark dark:text-white">
      <div className="container flex flex-wrap items-center justify-center h-full lg:justify-between">
        {/* Left Side Image */}
        <div className="mb-12 md:w-9/12 lg:w-6/12">
          <img src={login} className="w-full" alt="Login Visual" />
        </div>

        {/* Right Side Form */}
        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-center mb-4 lg:justify-start">
              <p className="mb-0 mr-4 text-lg">Sign in with your</p>
            </div>

            {/* Social Login Buttons */}
            <div className="flex flex-col gap-4 mb-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={socialLoading}
                className="flex items-center justify-center gap-3 py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                <FaGoogle /> Login with Google
              </button>
              {/* Add Facebook login if needed */}
            </div>

            {/* OR separator */}
            <div className="my-4 flex items-center before:flex-1 before:border-t before:border-neutral-300 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 font-semibold text-center dark:text-white">Or</p>
            </div>

            {/* Email Field (shared for login + reset) */}
            <CustomInput
              placeholder="Enter your email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500">{formik.errors.email}</p>
            )}

            {/* Password Field */}
            <CustomInput
              placeholder="Enter your password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500">{formik.errors.password}</p>
            )}

            {/* Forgot Password Button */}
            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Error & Success Messages */}
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            {resetSuccess && <p className="text-green-600 mt-2">{resetSuccess}</p>}

            {/* Login Button */}
            <div className="mt-8 text-center lg:text-left">
              <CustomButton
                type="submit"
                text={loading ? "Logging in..." : "Login"}
                disabled={loading}
              />
              <p className="mt-2 text-sm font-semibold">
                Don't have an account?{" "}
                <a
                  href="#!"
                  onClick={() => navigate("/auth/signup")}
                  className="text-blue-600 hover:underline"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
