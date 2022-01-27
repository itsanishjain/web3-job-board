import Layout from "../src/components/Layout";
import "../styles/globals.css";

import { ToastContainer } from "react-toastify";
// import toast from "../src/components/Toast";

function MyApp({ Component, pageProps }) {
  // React.useEffect(() => {
  //   toast({ type: "info", message: "Hello world!" });
  // }, []);

  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
    </Layout>
  );
}

export default MyApp;
