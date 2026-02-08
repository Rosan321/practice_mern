import './App.css'
import Auth from './components/Auth'
import Home from './components/Home';

function App() {
  const isAuthenticated = sessionStorage.getItem("auth") === "true";
  
  return (
    <>
      {
        !isAuthenticated ? <Auth /> : (
          <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900">Welcome to the Home Page</h2>
              <Home />
            </div>
          </div>
        )
      }
    </>
  )
}

export default App
