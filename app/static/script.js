const entriesURI = "http://backend/entries";

let doors = [];

// const nameEl = document.getElementById("name");
// const birthEl = document.getElementById("birth");
// const emailEl = document.getElementById("email");
// const childrenEl = document.getElementById("children");
const add_button = document.getElementById("addtodb");
add_button.onclick = event => {
	const formEls = document.getElementsByClassName("formfield");
	Array.from(formEls).forEach((el) => {
		// collecting all fields and their values
		console.log(el.name, el.value);
	});
}

const current_sort = {
	column: "Name",
	direction: "Asc",
}
const sortByEl = document.getElementById("sortby");

function updateSortByEl(sort) {
	sortByEl.innerHTML = `Sorting by ${sort.column} ${sort.direction}`;
}

function main() {
	updateSortByEl(current_sort);

}

main();
