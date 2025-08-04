"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../../firebase";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import login from '../../../public/login.svg';


const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

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
          router.push("/");
        } else {
          setErrorMessage("Please verify your email first.");
        }
      } catch (error) {
        setErrorMessage("Invalid email or password. Please try again.");
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
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      // This is the key change: we check for the specific error code.
      // If the user closes the popup, we don't show an error message.
      if (error.code !== 'auth/popup-closed-by-user') {
        setErrorMessage(error.message);
      }
    } finally {
      // This block will always run, resetting the button state correctly.
      setSocialLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto gap-16">
        
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <Image src={login} className="w-full max-w-md" alt="Login Visual" priority />
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-md space-y-6">
            <h1 className="text-3xl font-bold text-center text-[#ff2929]">
              Welcome Back!
            </h1>

            <button
              onClick={handleGoogleLogin}
              disabled={socialLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition duration-300 cursor-pointer"
            >
              <FaGoogle />
              <span>{socialLoading ? "Signing in..." : "Sign in with Google"}</span>
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 text-sm font-medium text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <CustomInput
                placeholder="Enter your email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-gray-800 border-gray-700 text-white"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}

              <CustomInput
                placeholder="Enter your password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-gray-800 border-gray-700 text-white"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}

              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Forgot Password?
                </button>
              </div>
              
              {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
              {resetSuccess && <p className="text-green-500 text-center">{resetSuccess}</p>}

              {/* CORRECTED LOGIN BUTTON STRUCTURE */}
              <div className="pt-2">
                <CustomButton
                  type="submit"
                  disabled={loading}
                  text={loading ? "Logging in..." : "Login"}
                  className="w-full bg-[#ff2929] hover:bg-red-700 cursor-pointer"
                />
              </div>

              <p className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/signup" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}