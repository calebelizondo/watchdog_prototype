import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../consts";
import Button from "../../common/Button/Button";
import { Center, Left, NavBar } from "../../common/NavBar/NavBar";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../common/Loading/LoadingIcon";

type Source = {
    name: string,
    url: string
}

interface ManageSourcesProps {}

const ManageSourcesPage: React.FC<ManageSourcesProps> = ({}) => {
    const [sources, setSources] = useState<Source[] | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BACKEND_URL}/get_source_names`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("data", data)
                setSources(data.results);
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
            });
    }, []);

    return (
        <div className="manage-source-page">
            <NavBar>
                <Left>
                    <Button onClick={() => {}}>
                    <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                            d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z"
                            fill="currentColor"
                        ></path>
                    </svg>
                        Back
                    </Button>
                </Left>
                <Center>
                    <h3>Manage Sources</h3>
                </Center>
            </NavBar>
            <ul className="source-list">
                {sources ? (
                    sources.map((source, index) => (
                        <li key={index} className="source-list-item">
                            <span className="source-name">{source.name} <br /> <i>{source.url}</i></span>
                            <a href={`/edit_source?sourceName=${source.name}`}>
                            <Button onClick={() => {}}>
                                Edit
                            </Button>
                            </a>
                        </li>
                    ))
                ) : (
                    <LoadingIcon />
                )}
            </ul>
                <div className="add-source-button">
                    <Button  onClick={() => {navigate("/add_source")}}>
                        <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                        </svg>
                        Add
                    </Button> 
                </div>   
        </div>
    );
};

export default ManageSourcesPage;
