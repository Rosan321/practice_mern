import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Home from "./components/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("token");
    if (loggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      {!isAuthenticated ? (
        <Auth />
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
          <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
            <section className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome to the Home Page
              </h2>
              <button
                onClick={() => {
                  sessionStorage.removeItem("token");
                  window.location.reload();
                }}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                {/* SVG here */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12h-9m0 0l3-3m-3 3l3 3"
                  />
                </svg>
              </button>
            </section>
            <Home />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
