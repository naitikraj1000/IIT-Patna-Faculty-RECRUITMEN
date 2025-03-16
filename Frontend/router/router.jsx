import { createBrowserRouter } from "react-router-dom";
import SignIn from "../src/component/signin";
import SignUp from "../src/component/signup";
import Home from "../src/component/home";
import Application from "../src/component/application";
import ProtectedRoute from "./protectedroute";
import Application1 from "../src/component/Application/application1";
import Application2 from "../src/component/Application/application2";
import Application3 from "../src/component/Application/application3";
import Application4 from "../src/component/Application/application4";
import Application5 from "../src/component/Application/application5";
import Application6 from "../src/component/Application/application6";
import { PDFViewer } from "@react-pdf/renderer";
import {FacultyApplicationForm} from "../src/component/Application/applicationpdf";


// const PDFViewerPage = () => (
//   <div style={{ width: "100%", height: "100vh" }}>
//     <PDFViewer width="100%" height="100%">
//       <FacultyApplicationForm />
//     </PDFViewer>
//   </div>
// );



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/application/:id",
    element: (
      <ProtectedRoute>
        <Application />
      </ProtectedRoute>
    ),
    children: [
      { path: "form1", element: <Application1 /> },
      { path: "form2", element: <Application2 /> },
      { path: "form3", element: <Application3 /> },
      { path: "form4", element: <Application4 /> },
      { path: "form5", element: <Application5 /> },
      { path: "form6", element: <Application6 /> },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  // {
  //   path:"/test",
  //   element: <PDFViewerPage />
  // }
]);

export default router;
