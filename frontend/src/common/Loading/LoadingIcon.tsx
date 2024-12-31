import "./styles.css";

const LoadingIcon: React.FC<{}> = () => {
    return (
        <div className="loader-container"><div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
    );
};

export default LoadingIcon;