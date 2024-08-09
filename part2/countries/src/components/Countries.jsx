import React, { useState } from 'react';

const Countries = ({ countriesToDisplay }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleClick = (event) => {
        event.preventDefault();
        const countryName = event.target.countryName.value;
        const country = countriesToDisplay.find(c => c.name.common === countryName);
        setSelectedCountry(country);
    };

    if (selectedCountry) {
        const flagSvg = selectedCountry.flags['svg'];
        return (
            <div>
                <h1>{selectedCountry.name.common}</h1>
                <p>
                    capital {selectedCountry.capital}<br />
                    area {selectedCountry.area}
                </p>
                <h3>languages</h3>
                {Object.values(selectedCountry.languages).map(language => 
                    <li key={language}>{language}</li>
                )}
                <br />
                <div>
                    <img src={flagSvg} width={200} height={150} alt={`Flag of ${selectedCountry.name.common}`} />
                </div>
                <button onClick={() => setSelectedCountry(null)}>Go back</button>
            </div>
        );
    }

    if (countriesToDisplay.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    } else if (countriesToDisplay.length === 1) {
        const country = countriesToDisplay[0];
        const flagSvg = country.flags['svg'];
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>
                    capital {country.capital}<br />
                    area {country.area}
                </p>
                <h3>languages</h3>
                {Object.values(country.languages).map(language => 
                    <li key={language}>{language}</li>
                )}
                <br />
                <div>
                    <img src={flagSvg} width={200} height={150} alt={`Flag of ${country.name.common}`} />
                </div>
            </div>
        );
    } else {
        return (
            <ul>
                {countriesToDisplay.map(country => 
                    <li key={country.name.common}>
                        <form onSubmit={handleClick}>
                            <input type="hidden" name="countryName" value={country.name.common} />
                            {country.name.common} <button type="submit">show</button>
                        </form>
                    </li>
                )}
            </ul>
        );
    }
};

export default Countries;
