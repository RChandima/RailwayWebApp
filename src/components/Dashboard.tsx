import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Dashboard.css'; // Import the styling for the dashboard


const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const [userData, setUserData] = useState<any>(null);
    const [seasonCards, setSeasonCards] = useState<{ id: number; name: string; validTill: string }[]>([]);
    const [activeSeasonCard, setActiveSeasonCard] = useState<{ id: number; name: string; validTill: string } | null>(null);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserData(user);
            const cards = [
                { id: 1, name: 'Season Card 1', validTill: '2025-05-10' },
                { id: 2, name: 'Season Card 2', validTill: '2025-08-15' },
            ];
            setSeasonCards(cards);
            setActiveSeasonCard(cards[0]);
        } else {
            navigate('/login'); // If no user is logged in, redirect to login page
        }
    }, [auth, navigate]);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/login'); // Redirect to login page after logging out
            })
            .catch((error) => {
                console.error('Error logging out: ', error);
            });
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome, {userData?.displayName || 'Admin'}!</h1>
                <button onClick={handleLogout} className="logout-btn">Log Out</button>
            </div>
            
            <div className="dashboard-content">
                <h2>Your Active Season Card</h2>
                {activeSeasonCard ? (
                    <div className="season-card">
                        <p><strong>Name:</strong> {activeSeasonCard.name}</p>
                        <p><strong>Valid Till:</strong> {activeSeasonCard.validTill}</p>
                    </div>
                ) : (
                    <p>No active season card found.</p>
                )}

                <h2>All Season Cards</h2>
                <ul className="season-cards-list">
                    {seasonCards.map((card) => (
                        <li key={card.id} className={`season-card-item ${activeSeasonCard?.id === card.id ? 'active' : ''}`}>
                            <p><strong>Name:</strong> {card.name}</p>
                            <p><strong>Valid Till:</strong> {card.validTill}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
