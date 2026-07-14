import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import SplashScreen from "./components/common/SplashScreen";

function App() {

    const [showSplash, setShowSplash] = useState(false);

    useEffect(() => {

        const alreadyShown = sessionStorage.getItem("ecoSplash");

        if (!alreadyShown) {

            setShowSplash(true);

            const timer = setTimeout(() => {

                sessionStorage.setItem("ecoSplash", "true");
                setShowSplash(false);

            }, 2200);

            return () => clearTimeout(timer);

        }

    }, []);

    if (showSplash) {
        return <SplashScreen />;
    }

    return <AppRoutes />;

}

export default App;