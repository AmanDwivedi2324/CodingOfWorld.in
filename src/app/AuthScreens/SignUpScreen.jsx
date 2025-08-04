import { useState } from "react";
import signup from "../../assets/images/signup.svg";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/InputAndButton/CustomInput";
import CustomButton from "../../components/InputAndButton/CustomButton";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import * as Yup from "yup";
import { useFormik } from "formik";
import { collection, addDoc } from "firebase/firestore";
import { FaGoogle } from "react-icons/fa";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [socialLoading, setSocialLoading] = useState(false);

  const waitForEmailVerification = async (user) => {
    try {
      const interval = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(interval);
          setSuccessMessage("Email successfully verified!");
          navigate("/loginscreen");
        }
      }, 5000);
    } catch (error) {
      console.error("Error checking email verification:", error);
    }
  };

  // const handleGoogleLogin = async () => {
  //   if (socialLoading) return;
  //   setSocialLoading(true);
  //   const provider = new GoogleAuthProvider();

  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;

  //     // You can save the user to Firestore if needed
  //     console.log("Google user:", user);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Google Login Error:", error);
  //     if (error.code === "auth/unauthorized-domain") {
  //       setErrorMessage("Unauthorized domain: Please add your domain in Firebase > Authentication > Authorized domains.");
  //     } else {
  //       setErrorMessage(error.message);
  //     }
  //   } finally {
  //     setSocialLoading(false);
  //   }
  // };

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
        setSuccessMessage("Verification email sent! Please check your inbox.");
        waitForEmailVerification(user);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-dark dark:text-white transition-all duration-700 ease-in-out">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-4 py-10 gap-10">
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <img src={signup} className="w-full max-w-md p-4 object-contain" alt="Sign Up Visual" />
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-md space-y-6">
            <h1 className="text-sm sm:text-xl font-bold text-center text-gray-800 pt-20 dark:text-white">
              Sign up with
            </h1>

            {/* <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-2 rounded-md text-white bg-primary transition"
            >
              <FaGoogle className="text-lg" />
              <span>Continue with Google</span>
            </button> */}
{/* 
            <div className="flex items-center my-6 w-full">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-md font-medium text-black dark:text-white px-3">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div> */}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <CustomInput
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500">{formik.errors.name}</p>
              )}

              <CustomInput
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}

              <CustomInput
                placeholder="Enter your password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500">{formik.errors.password}</p>
              )}

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              {successMessage && <p className="text-green-500">{successMessage}</p>}

              <div className="text-center mt-5">
                <CustomButton
                  type="submit"
                  disabled={loading}
                  text={loading ? "Registering..." : "Register"}
                />
                {/* ?kxoadj */}
                <p className="mt-2 text-sm">
                  Have an account?{" "}
                  <a
                    href="#!"
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate("/auth/signin")}
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
