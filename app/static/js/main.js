const usersURI = "http://localhost:8000/users";

function refreshTable() {
	const params = {
		searchfilter: document.getElementById("filter").value,
		sortby: current_sort.column,
		sortdir: current_sort.direction,
		page: currentPage,
		pagesize: PAGESIZE
	}
	let rows = getData(usersURI, params);
	rows.then(data => {
		let context = {users: data};
		const users_template = Handlebars.compile(document.getElementById("usertemplate").innerHTML);
		const compiledHTML = users_template(context);
		document.getElementById("userentries").innerHTML = compiledHTML;
		if (data.length < PAGESIZE) {
			nextPageEl.style.cursor = "not-allowed";
		}
		if (currentPage > 0) { // enable the first and prev paging
			firstPageEl.style.cursor = "pointer";
			prevPageEl.style.cursor = "pointer";
		} else { // first page, disable the first and prev buttons
			firstPageEl.style.cursor = "not-allowed";
			prevPageEl.style.cursor = "not-allowed";
		}

	});
}

const add_button = document.getElementById("addtodb");
add_button.onclick = event => {
	const formEls = document.getElementsByClassName("formfield");
	postData(usersURI, formToJSON(formEls))
	.then(data => {
		refreshTable()
	});
}

const current_sort = {
	column: "name",
	direction: "asc",
}
const sortByEl = document.getElementById("sortby");
function updateSortByEl(sort) {
	sortByEl.innerHTML = `Sorting by ${sort.column} ${sort.direction}`;
}

const PAGESIZE = 3;
let currentPage = 0;
const currentPageEl = document.getElementById("currentpage");
function setCurrentPage(newpage) {
	currentPage = newpage;
	currentPageEl.innerHTML = `Page ${currentPage}`;
}

function setupSorting() {
	let sortCols = document.getElementsByClassName("sortcol");
	for (let el of sortCols) {
		el.onclick = event => {
			if (current_sort.column === event.target.id) {
				current_sort.direction = current_sort.direction === "asc" ? "desc": "asc";
			} else {
				current_sort.direction = "asc";
				current_sort.column = event.target.id;
			}
			setCurrentPage(0);
			updateSortByEl(current_sort);
			refreshTable();
		}
	};
}

const firstPageEl = document.getElementById("pagfirst");
firstPageEl.style.cursor = "not-allowed";  // disabled initially
const prevPageEl = document.getElementById("pagprev");
prevPageEl.style.cursor = "not-allowed";  // disabled initially
const nextPageEl = document.getElementById("pagnext");
const lastPageEl = document.getElementById("paglast");
lastPageEl.style.cursor = "not-allowed";  // disabled for now
function setupPaging() {
	firstPageEl.onclick = event => {
		setCurrentPage(0);
		refreshTable();
	}
	prevPageEl.onclick = event => {
		if (currentPage > 0) {
			setCurrentPage(currentPage-1);
			refreshTable();
		}
	}
	nextPageEl.onclick = event => {
		setCurrentPage(currentPage+1);
		refreshTable();
	}
}


function main() {
	setCurrentPage(0);
	setupPaging();
	setupSorting();
	updateSortByEl(current_sort);
	refreshTable();
}

let users_template = Handlebars.compile(document.getElementById("usertemplate").innerHTML);

main();
