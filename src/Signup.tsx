import { useState, useEffect } from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [currentImage, setCurrentImage] = useState(0);

    // Array of background images
    const images = [
        '/image/maxresdefault.jpg',
        '/image/Train_Sri_Lanka_Aga_on_the_Run-819x1024.webp',
        '/image/Idalgashinna_Railway_Station_in_Sri_Lanka.jpg',
    ];

    // Image slideshow effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    // Google signup handler
    const signUpWithGoogle = async () => {
        setAuthing(true);
        setError('');
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                navigate('/dashboard'); // Redirect after successful signup
            })
            .catch((error) => {
                setError(error.message);
                setAuthing(false);
            });
    };

    // Email signup handler
    const signUpWithEmail = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!fullName) {
            setError('Full name is required');
            return;
        }

        setAuthing(true);
        setError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/dashboard'); // Redirect after successful signup
            })
            .catch((error) => {
                setError(error.message);
                setAuthing(false);
            });
    };

    return (
        <div className="w-full h-screen flex flex-col md:flex-row">
            {/* Left side: Image Slideshow */}
            <div
                className="w-full md:w-1/2 h-64 md:h-full"
                style={{
                    backgroundImage: `url(${images[currentImage]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

            {/* Right side: Signup Form */}
            <div className="w-full md:w-1/2 h-full bg-[#1a1a1a] flex flex-col p-5 md:p-10 justify-center overflow-y-auto">
                <div className="w-full max-w-md mx-auto text-white">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-3">Sign Up</h2>
                        <p className="text-md md:text-lg text-gray-400">
                            Welcome! Please enter your information to create an account.
                        </p>
                    </div>

                    {/* Form Inputs */}
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-3 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white text-white"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white text-white"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white text-white"
                        />
                        <input
                            type="password"
                            placeholder="Re-Enter Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white text-white"
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                    {/* Buttons */}
                    <div className="space-y-4 mt-6">
                        <button
                            onClick={signUpWithEmail}
                            disabled={authing}
                            className="w-full py-3 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-colors"
                        >
                            Sign Up With Email
                        </button>
                        <div className="flex items-center justify-center relative">
                            <div className="w-full h-px bg-gray-500"></div>
                            <span className="px-3 bg-[#1a1a1a] text-gray-500">OR</span>
                            <div className="w-full h-px bg-gray-500"></div>
                        </div>
                        <button
                            onClick={signUpWithGoogle}
                            disabled={authing}
                            className="w-full py-3 bg-white text-black rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Sign Up With Google
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="text-sm text-gray-400 text-center mt-8">
                        Already have an account?{' '}
                        <a
                            href="/login"
                            className="text-teal-400 underline hover:text-teal-500"
                        >
                            Log In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
