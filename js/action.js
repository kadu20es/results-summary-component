const url = "./data.json";
const table = document.getElementById("table");
const achieved = document.getElementById("achieved");
const goal = document.getElementById("goal");

/* Obtém os dados do JSON e coloca em um objeto chamado DATA e chama a função showInfo */
fetch (url)
    .then(response => response.json())
    .then(data => showInfo(data));


/* recebe os dados e cria os elementos TR e TD da tabela, em seguida, popula-a com os dados
do objeto */
function showInfo(data) {
    console.table(data)
    var tdCat;
    var tdScore;
    var tdIcon;
    var results = 0;
    var text = "";
    data.forEach(element => {
        const tr = document.createElement('tr');
        const img = document.createElement('img');
        const span = document.createElement('span');

        /* creates line */
        tr.setAttribute('class', `${(element.category).toLowerCase()} tabline`);
        table.appendChild(tr);


        /* defines icon */
        tdIcon = document.createElement('td');
        tdIcon.setAttribute('class', 'icon');
        img.setAttribute('src', element.icon);
        tdIcon.appendChild(img);
        tr.appendChild(tdIcon);


        /* defines category of td */
        tdCat = document.createElement('td');
        tdCat.setAttribute('class', `${(element.category).toLowerCase()}`);
        text = document.createTextNode(element.category);
        tdCat.appendChild(text);
        tr.appendChild(tdCat);

        /* defines results */
        tdScore = document.createElement('td');
        tdScore.setAttribute('class', 'tabres');

        text = document.createTextNode(`${element.score} `);
        tdScore.appendChild(text);
        span.setAttribute('style',  "color: #9e9e9e");
        text = document.createTextNode("/ 100");
        span.appendChild(text);
        tdScore.appendChild(span);
        tr.appendChild(tdScore);


        /* calculates the total */
        results += element.score;
    });

    /* set the number inside the circle */
    results = (results / data.length).toFixed(0);
    text = document.createTextNode(results);
    achieved.appendChild(text);


    /* evaluate the result to set the text */
    if (results > 0 && results < 25){
        text = "Ooops";
    } else if (results > 24 && results < 50) {
        text = "Average";
    } else if (results > 49 && results < 75){
        text = "Good";
    } else if (results > 74 && results < 90){
        text = "Great"
    } else if (results > 89 && results <= 100){
        text = "Excelent";
    }

    /* set the evaluation text */
    var goalText = document.createTextNode(text);
    goal.appendChild(goalText);
}
