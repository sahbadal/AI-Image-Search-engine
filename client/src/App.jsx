import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Home, CreatePost } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[@e6ebf4]'>
          <Link to='/'>
            <h1 className='text-2xl font-bold '>AiGallery</h1>
          </Link>

          <Link to="/create-post" className="font-inter font-medium bg-[#2b9834] text-white px-4 py-2 rounded-md">Create</Link>
        </header>

        <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App;