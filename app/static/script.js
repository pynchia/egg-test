const entriesURI = "http://backend/entries";

const formToJSON = elements => [].reduce.call(elements, (data, el) => {
	data[el.name] = el.value;
	return data;
  }, {});

const add_button = document.getElementById("addtodb");
add_button.onclick = event => {
	const formEls = document.getElementsByClassName("formfield");
	console.log(formToJSON(formEls));
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
