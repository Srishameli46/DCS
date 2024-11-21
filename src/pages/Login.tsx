import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Button } from "../components/Button";
import { AuthContext } from "../context/Authcontext";
import { Type } from "../enum/enum";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import GoogleIcon from "../assets/images/GoogleIcon.png";
import * as Yup from "yup";
import { getLoginAccess } from "../service/ProfileService";
import { ACCESS_TOKEN, HOME } from "../constants";

const validationSchema = Yup.object({
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/,
      "Please provide a valid email"
    )
    .required("Email is required"),

  password: Yup.string()
    // .min(8, "Password must be at least 8 characters long")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    // .matches(/\d/, "Password must contain at least one number")
    // .matches(
    //   /[!@#$%^&*(),.?":{}|<>]/,
    //   "Password must contain at least one special character"
    // )
    .required("Please enter the password"),
});

export function Login() {
  const authentication = useContext(AuthContext);
  const { loginState, loginDispatch } = authentication;
  const navigate = useNavigate();
 

  const handleAuth = async (values: { username: string; password: string }) => {
    try {
    const username = values.username;
    const password = values.password;
    const value = await getLoginAccess(username, password);
    const token = value.data.token;
    localStorage.setItem("token", token);
    loginDispatch({
      type: Type.LOGIN,
      payload:{token},
    });
    console.log(value);

    
    if(value){
      navigate(`/${HOME}`)
    }
  } catch(err) {
    console.log(err);
    
  }
  
  
  
    

    // if (isSuccess) {
    //   const token = {
    //     accessToken: data.data.entity.accessToken ,
    //     refreshToken: data.data.entity.refreshToken,
    //   };
    //   loginDispatch({ type: Type.LOGIN, payload: { token } });
    //   navigate(`/${HOME}`);
    // }
    // if(isError) {
    //   alert(`Error:${error.message}`);
    // }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
       
        <div className="relative z-10 flex flex-col items-center w-2/6">
         
          <div className="bg-white px-8 py-5 rounded-md shadow-lg w-5/6 max-h-[380px] mt-2">
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleAuth}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="username" className="text-gray-500 text-sm">
                      Email
                    </label>
                    <Field
                      type="email"
                      id="username"
                      name="username"
                      placeholder="Enter Email"
                      className="w-full p-3 border border-gray-500 rounded-lg mt-3 text-sm h-10"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between">
                      <label
                        htmlFor="password"
                        className="text-gray-500 text-sm"
                      >
                        Password
                      </label>

                      <a
                        className="text-sm text-blue-500 hover:text-blue-800 me-2"
                        href="#"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter the password"
                      className="w-full p-3 border border-gray-500 rounded-lg h-10 mt-3 text-sm"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-8 mt-2">
                    <Button
                      className="bg-blue-500 hover:bg-blue-700 py-2 w-full rounded-lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Loging In..." : "Login"}
                    </Button>
                  </div>
                  <div className="py-2 flex items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <p className="text-base mx-2 text-sm text-gray-400">OR</p>
                    <div className="flex-grow border-t border-gray-400"></div>
                  </div>
                  <Button type="button" className="w-full">
                    <div className="border p-2 border-gray-300 rounded-md flex gap-16">
                      <div className="text-center text-sm font-semibold text-gray-700 mt-1">
                        Sign in with Google
                      </div>
                    </div>
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
