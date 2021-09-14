window.onload = () => {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    const cities = [];

    // fetch the data
    fetch(endpoint)
        .then(response => response.json())
        .then(data => cities.push(...data));

    const search = document.querySelector(".search");
    const suggestions = document.querySelector(".suggestions");
    const input = search.textContent;

    function match(input, cities) {
        const reg = new RegExp(input, 'gi');
        return cities.filter(place => {
        return place.city.match(reg) || place.state.match(reg);
        });
    }

    function numWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function display() {
        const html = match(this.value, cities).map(place => {
        const reg = new RegExp(this.value, 'gi');
        const city = place.city.replace(reg, `<span class="hl">${this.value}</span>`);
        const state = place.state.replace(reg, `<span class="hl">${this.value}</span>`);

        return `
        <li>
            <span class="name">${city}, ${state}</span>
            <span class="population">${numWithCommas(place.population)}</span>
        </li>
        `;
        }).join('');
        suggestions.innerHTML = html;
    };

    search.addEventListener('change', display);
    search.addEventListener('keyup', display);
}    