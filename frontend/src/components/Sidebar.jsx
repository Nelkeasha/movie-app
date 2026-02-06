import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const { logout } = useContext(AuthContext);
    const navItems = [
        { to: "/", icon: "/assets/icon-nav-home.svg", alt: "Home" },
        { to: "/movies", icon: "/assets/icon-nav-movies.svg", alt: "Movies" },
        { to: "/tv-series", icon: "/assets/icon-nav-tv-series.svg", alt: "TV Series" },
        { to: "/bookmarked", icon: "/assets/icon-nav-bookmark.svg", alt: "Bookmarked" },
    ];

    return (
        <nav className="bg-semiDarkBlue flex md:flex-col items-center justify-between md:justify-start py-5 px-6 md:py-8 md:px-7 md:min-h-screen lg:min-h-[90vh] lg:rounded-2xl lg:h-[90vh] lg:fixed lg:left-8 lg:top-8 lg:w-24">
            <img src="/assets/logo.svg" alt="Logo" className="w-6 h-6 md:w-8 md:h-8 mb-0 md:mb-12" />

            <div className="flex md:flex-col gap-6 md:gap-8">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `hover:brightness-200 transition-all ${isActive ? "brightness-200 opacity-100" : "opacity-50"}`
                        }
                    >
                        <img src={item.icon} alt={item.alt} className="w-4 h-4 md:w-5 md:h-5" />
                    </NavLink>
                ))}
            </div>

            <div className="md:mt-auto flex flex-col items-center gap-4">
                <button
                    onClick={logout}
                    className="opacity-50 hover:brightness-200 transition-all"
                    title="Logout"
                >
                    {/* Using a simple exit icon SVG inline since we don't have asset */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 16L21 12M21 12L17 8M21 12H7M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <img src="/assets/image-avatar.png" alt="Avatar" className="w-6 h-6 md:w-8 md:h-8 border border-white rounded-full" />
            </div>
        </nav>
    );
};

export default Sidebar;
