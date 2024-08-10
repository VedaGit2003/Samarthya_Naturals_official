import { useState, useContext, createContext, useEffect } from 'react';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        let existingFavoriteItems = localStorage.getItem('favorites');
        if (existingFavoriteItems) setFavorites(JSON.parse(existingFavoriteItems));
    }, []);

    return (
        <FavoritesContext.Provider value={[favorites, setFavorites]}>
            {children}
        </FavoritesContext.Provider>
    );
};

// Custom hook
const useFavorites = () => useContext(FavoritesContext);

export { useFavorites, FavoritesProvider };
