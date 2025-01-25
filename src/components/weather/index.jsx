import Search from '../search/index.jsx'
import { useState, useEffect } from 'react';


export default function Weather() {

    const [search, setSearch] = useState('Nairobi');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [data, setData] = useState('')

    function fetchData() {
        setLoading(true)
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=de1dde4b68ac4c8a5ca5c922c3509edb`)
            .then((response) => {
                setLoading(false)
                if (!response.ok) setErrMsg(response.message)
                return response.json()
            }).then(data => {
                setLoading(false)
                if (data.name !== null) setData(data)
                console.log("Wazza", data)
            }).catch(e => {
                setLoading(false)
                setErrMsg(e.message)
            });
    }

    function handleSearch() {
        fetchData()
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })

    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {
                loading ? <div class="loader"></div>
                    : errMsg ? <div className="error">An Error Occurred: {errMsg}</div>
                        : data.name ? <div>
                            <div className="city">
                                <h2>{data.name}, {data?.sys?.country}</h2>
                            </div>
                            <div>
                                <span className="date">{getCurrentDate()}</span>
                            </div>
                            <div className="temp">{data?.main?.temp}&deg;F</div>
                            <p className="description">{data?.weather[0]?.description}</p>
                            <div className="weather-info">
                                <div>
                                    <div>
                                        <p className="wind">{data?.wind?.speed}</p>
                                        <p>Wind Speed</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className="humidity">{data?.main?.humidity}%</p>
                                        <p>Humidity</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                            : <div className="error">City cannot be found try again.</div>
            }
        </div>
    )
}