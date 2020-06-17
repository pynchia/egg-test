const usersURI = "http://localhost:8000/users";

function refreshTable() {
	const params = {
		searchfilter: filterEl.value,
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
		setupPaging(data.length);
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
const prevPageEl = document.getElementById("pagprev");
const nextPageEl = document.getElementById("pagnext");
const lastPageEl = document.getElementById("paglast");
lastPageEl.style.cursor = "not-allowed";  // disabled for now
function setupPaging(numEntries) {
	console.log(numEntries)
	if (numEntries < PAGESIZE) {
		nextPageEl.style.cursor = "not-allowed";
		nextPageEl.onclick = () => false;
	} else {
		nextPageEl.style.cursor = "pointer";
		nextPageEl.onclick = event => {
			setCurrentPage(currentPage+1);
			refreshTable();
		}
	}
	if (currentPage > 0) { // enable the first and prev paging
		firstPageEl.style.cursor = "pointer";
		firstPageEl.onclick = event => {
			setCurrentPage(0);
			refreshTable();
		}
		prevPageEl.style.cursor = "pointer";
		prevPageEl.onclick = event => {
				setCurrentPage(currentPage-1);
				refreshTable();
		}
	} else { // first page, disable the first and prev buttons
		firstPageEl.style.cursor = "not-allowed";
		firstPageEl.onclick = () => false;
		prevPageEl.style.cursor = "not-allowed";
		prevPageEl.onclick = () => false;
	}
}

const filterEl = document.getElementById("filter");
filterEl.onkeyup = event => {
	setCurrentPage(0);
	refreshTable();
}

function main() {
	setCurrentPage(0);
	setupSorting();
	updateSortByEl(current_sort);
	refreshTable();
}

let users_template = Handlebars.compile(document.getElementById("usertemplate").innerHTML);

main();
