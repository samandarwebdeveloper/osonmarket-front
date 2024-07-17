import { memo, useEffect, useState } from "react"

function Stats() {
    const [urls, setUrls] = useState([])
    const [url, setUrl] = useState("")
    const [doneResults, setDoneResults] = useState([])

    const handleAddUrl = () => {
        setUrls([...urls, {url, number: urls.length + 1}])
    }

    useEffect(() => {
        setInterval(() => {
            urls.forEach(url => {
                fetch(url.url)
                .then(response => response.json())
                .then(data => {
                    if (data.status !== "none") {
                        setDoneResults([...doneResults, {number: url.number, data}])
                    }
                    console.log(url.number, data)
                })
                .catch(err => console.log(url.number, err))
            })
        }, 500)
    }
    , [urls])

    return (
        <div className="Category d-flex align-items-center justify-content-center h-100">
            <div className="d-flex flex-column mr-3">
                {doneResults && doneResults.map((result, index) => (
                    <div key={index} className="d-flex align-items-center justify-content-between">
                        <p>{result.number}</p>
                        <p>{result.data.status}</p>
                    </div>
                ))}
            </div>
            <div className="d-flex flex-column Input">
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                <button className="btn-primary p-2" onClick={handleAddUrl}>Add</button>
            </div>
        </div>
    )
}

export default memo(Stats)