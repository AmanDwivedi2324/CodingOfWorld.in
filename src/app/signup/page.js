'use client'
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import signup from '../../../public/signup.svg';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SignUpScreen() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    if (socialLoading) return;
    setSocialLoading(true);
    setErrorMessage("");
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
        whoIs: "isUser",
      });

      router.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSocialLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setErrorMessage("");
      setSuccessMessage("");
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: values.name,
          email: user.email,
          createdAt: new Date(),
          whoIs: "isUser",
          isCreatePermission: false,
          isVlogCreatePermission: false,
          isCourseContentCreatePermission: false,
          isCourseWithVideoCreatePermission: false,
        });

        await sendEmailVerification(user);
        setSuccessMessage("Verification email sent! Please check your inbox and then log in.");
        
        formik.resetForm();

      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto gap-16">
        
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <Image src={signup} className="w-full max-w-md" alt="Sign Up Visual" priority />
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-md space-y-6">
            <h1 className="text-3xl font-bold text-center text-[#ff2929]">
              Create an Account
            </h1>

            <button
              onClick={handleGoogleSignUp}
              disabled={socialLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition duration-300 cursor-pointer"
            >
              <FaGoogle />
              <span>{socialLoading ? "Signing up..." : "Sign up with Google"}</span>
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 text-sm font-medium text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <CustomInput
                placeholder="Enter your name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-gray-800 border-gray-700 text-white"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}

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

              {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
              {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

              <div className="pt-2">
                 <CustomButton
                   type="submit"
                   disabled={loading}
                   text={loading ? "Registering..." : "Register"}
                   className="w-full bg-[#ff2929] hover:bg-red-700 cursor-pointer"
                 />
              </div>

              <p className="text-center text-sm text-gray-400">
                Have an account?{" "}
                <Link href="/signin" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-300">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}