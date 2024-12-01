import { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [currentImage, setCurrentImage] = useState(0);

    // Array of background images
    const images = [
        '/image/pngtree-black-train-is-steaming-up-a-railway-tracks-picture-image_2696950.jpg',
        '/image/train_dystopia_ii_by_jpachl_dfi06lz-fullview.jpg',
    ];

    // Set up the interval to change images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    // Function to handle email login
    const signInWithEmail = async () => {
        setAuthing(true);
        setError('');
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/dashboard'); // Redirect to the dashboard on success
            })
            .catch((error) => {
                setError(error.message); // Show error message
                setAuthing(false);
            });
    };

    // Function to handle Google login
    const signInWithGoogle = async () => {
        setAuthing(true);
        setError('');
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                navigate('/dashboard'); // Redirect to the dashboard on success
            })
            .catch((error) => {
                setError(error.message); // Show error message
                setAuthing(false);
            });
    };

    return (
        <div className="w-full h-screen flex">
            {/* Left side: Background Image */}
            <div
                className="w-1/2 h-full"
                style={{
                    backgroundImage: `url(${images[currentImage]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            ></div>

            {/* Right side: Login Form */}
            <div className="w-1/2 h-full bg-[#1a1a1a] flex flex-col justify-center p-8">
                <div className="max-w-md mx-auto text-white">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold mb-2">Sri Lanka Railway</h2>
                        <h3 className="text-orange-400 text-2xl font-semibold">
                            Login Admin
                        </h3>
                        <p className="mt-2 text-gray-400">
                            Welcome! Please enter your details to continue.
                        </p>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={signInWithEmail}
                            disabled={authing}
                            className="w-full py-3 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-colors"
                        >
                            Log In With Email
                        </button>
                        {error && (
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center my-6">
                        <div className="w-full h-px bg-gray-600"></div>
                        <span className="px-3 bg-[#1a1a1a] text-gray-500">OR</span>
                        <div className="w-full h-px bg-gray-600"></div>
                    </div>

                    {/* Google Login */}
                    <button
                        onClick={signInWithGoogle}
                        disabled={authing}
                        className="w-full py-3 bg-white text-black rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Log In With Google
                    </button>

                    {/* Footer */}
                    <div className="text-center mt-6 text-sm text-gray-400">
                        Don't have an account?{' '}
                        <a
                            href="/signup"
                            className="text-teal-400 underline hover:text-teal-500"
                        >
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
