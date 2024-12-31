import { ReactNode } from "react";
import './styles.css'; 

interface NavBarProps {
    children: ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                {children}
            </div>
        </nav>
    );
};

const Left: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="navbar-left">{children}</div>;
};

const Center: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="navbar-center">{children}</div>;
};

const Right: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="navbar-right">{children}</div>;
};

export { NavBar, Left, Center, Right };
