import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../consts";
import "./styles.css";
import { Center, Left, NavBar } from "../../common/NavBar/NavBar";
import Button from "../../common/Button/Button";
import { useNavigate } from "react-router-dom";
import SourceForm from "../../forms/SourceForm";

type RegexState = {
    valid: boolean;
    results: {url: string, title: string}[];
}

interface AddSourceProps {}

const AddSourcePage: React.FC<AddSourceProps> = () => {
  

  const navigate = useNavigate();
  const [regexResults, setRegexResults] = useState<{title: string, url: string}[]>([]);

  const handleSubmit = (source: {name: string, url: string, baseUrl: string, regex: string}) => {

    const data = {
      ...source, 
      base_url: source.baseUrl,
    };

    fetch(`${BACKEND_URL}/add_source`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((_) => {
        navigate("/manage_sources");
      })
      .catch((error) => {
        console.error("There was an error with the fetch operation:", error);
      });
  };

  return (
    <div>
      <NavBar>
        <Left>
          <a href="/manage_sources">
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
          </a>
        </Left>
        <Center>
          <h3>Add Source</h3>
        </Center>
      </NavBar>

        <SourceForm handleSubmit={handleSubmit}></SourceForm>
    </div>
  );
};

export default AddSourcePage;
