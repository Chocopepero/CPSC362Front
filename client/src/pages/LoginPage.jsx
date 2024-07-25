import {Link} from "react-router-dom";


export default function LoginPage() {
    return (

        <div><header className="p-4 flex justify-between items-center bg-blue-500 text-white">
        <Link to="/" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 -rotate-90">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
            <span className="font-bold text-white">Hotel Blissful</span>
        </Link>
        <nav className="flex gap-4">
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>



        </nav>
    </header>


        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto ">
                    <input type="email" placeholder="yourcampus@email.com" />
                    <input type="password" placeholder="password" />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet?  
                        <Link className = "underline text" to ={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>

    </div>
    );

}