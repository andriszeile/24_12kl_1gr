document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "/api/data";
    const form = document.getElementById("tempForm");
    const tableBody = document.querySelector("#dataTable tbody");
    const avgTempElement = document.getElementById("avgTemp");

    // Funkcija, lai ielādētu datus un atjaunotu tabulu
    const loadTable = async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Notīrīt tabulu
        tableBody.innerHTML = "";

        let totalTemp = 0;

        data.forEach(entry => {
            const avgTemp = (entry.min_temp + entry.max_temp) / 2;
            totalTemp += avgTemp;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${entry.date}</td>
                <td>${entry.min_temp}</td>
                <td>${entry.max_temp}</td>
                <td>${avgTemp.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        });

        // Aprēķināt vidējo temperatūru
        const avgTemp = data.length > 0 ? totalTemp / data.length : 0;
        avgTempElement.textContent = `Vidējā temperatūra visām dienām: ${avgTemp.toFixed(2)}`;
    };

    // Forma datu nosūtīšanai
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const date = document.getElementById("date").value;
        const minTemp = document.getElementById("min_temp").value;
        const maxTemp = document.getElementById("max_temp").value;

        if (!date || !minTemp || !maxTemp) {
            alert("Visi lauki ir obligāti!");
            return;
        }

        const payload = {
            date: date,
            min_temp: parseFloat(minTemp),
            max_temp: parseFloat(maxTemp),
        };

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            form.reset();
            loadTable(); // Pēc veiksmīgas pievienošanas atjauno tabulu
        } else {
            const error = await response.json();
            alert(error.error || "Kļūda saglabājot datus!");
        }
    });

    // Ielādēt tabulu sākumā
    loadTable();
});
