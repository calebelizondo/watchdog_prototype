import { useState } from "react";
import "./styles.css";
import { BACKEND_URL } from "../consts";
import Button from "../common/Button/Button";
import LoadingIcon from "../common/Loading/LoadingIcon";

type RegexState = {
  valid: boolean;
  results: { url: string, title: string }[];
};

interface SourceFormProps {
  source?: { name: string, url: string, baseUrl: string, regex: string };
  handleSubmit: (source: { name: string, url: string, baseUrl: string, regex: string }) => void;
}

const SourceForm: React.FC<SourceFormProps> = ({ source, handleSubmit }) => {
  const [name, setName] = useState<string>(source ? source.name : "");
  const [url, setUrl] = useState<string>(source ? source.url : "");
  const [baseUrl, setBaseUrl] = useState<string>(source ? source.baseUrl : "");
  const [regex, setRegex] = useState<string>(source ? source.regex : "");

  const [regexState, setRegexState] = useState<RegexState>({ valid: false, results: [] });
  const [loading, setLoading] = useState<boolean>(false); // Track loading state

  const handleRegexTest = () => {
    setLoading(true); // Start loading when fetching
    fetch(`${BACKEND_URL}/scrape?url=${url}&regex=${encodeURIComponent(regex)}&baseUrl=${baseUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRegexState({ valid: data.results.length !== 0, results: data.results as { url: string, title: string }[] });
        setLoading(false); 
      })
      .catch((error) => {
        console.error("There was an error with the fetch operation:", error);
        setLoading(false); 
      });
  };

  return (
    <>
      <div className="add-source-container">
        <div className="form-container">
          <div className="source-form">
            <form onSubmit={() => handleSubmit({ name, url, baseUrl, regex })}>
              <div className="input-group">
                <label htmlFor="name" className="block text-gray-800 font-semibold text-sm">Source name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="name"
                    className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    required={true}
                    disabled={source !== undefined}
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={source ? source.name : ""}
                  />
                </div>
                <label className="pt-1 block text-gray-500 text-sm">Used to identify the source, e.g. 12thman</label>
              </div>

              <div className="input-group">
                <label htmlFor="url" className="block text-gray-800 font-semibold text-sm">URL</label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="url"
                    className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    required={true}
                    onChange={(e) => setUrl(e.target.value)}
                    defaultValue={source ? source.url : ""}
                  />
                </div>
                <label className="pt-1 block text-gray-500 text-sm">Url the source needs to scrape. Should be a press release hub or RSS feed e.g. https://12thman.com/archives</label>
              </div>

              <div className="input-group">
                <label htmlFor="baseUrl" className="block text-gray-800 font-semibold text-sm">Base URL</label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="url"
                    className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    required={true}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    defaultValue={source ? source.baseUrl : ""}
                  />
                </div>
                <label className="pt-1 block text-gray-500 text-sm">The above link with no forward slashes. Used to resolve relative links e.g. https://12thman.com</label>
              </div>

              <div className="input-group">
                <label htmlFor="regex" className="block text-gray-800 font-semibold text-sm">Regular Expression</label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="url"
                    className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    required={true}
                    onChange={(e) => setRegex(e.target.value)}
                    defaultValue={source ? source.regex : ""}
                  />
                </div>
                <label className="pt-1 block text-gray-500 text-sm">URL regex. Used to find each article's URL and title. Needs 'title' and 'link' capture groups.</label>
              </div>
              <div className="input-group">
                <Button onClick={() => { handleRegexTest() }}>Test Scrape</Button>
                <Button type="submit" disabled={!regexState.valid}>Submit</Button>
              </div>
            </form>
          </div>
        </div>

        <div className="results-container">
          {loading && <LoadingIcon />}
          {regexState.results.length > 0 && !loading && (
            <div>
              <h4>Scrape results: <a href={url} target="_blank" rel="noopener noreferrer">missing anything?</a></h4>
              <ul>
                {regexState.results.map((result) => (
                  <li key={result.url} className="regex-result">
                    <a href={result.url} target="_blank" rel="noopener noreferrer">
                      <div>
                        <h5>{result.title}</h5>
                        <p>{result.url}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SourceForm;
