let stateSelectTag = document.querySelector('.stateSelect')
let lgaSelectTag = document.querySelector('.lgaSelect')

let xhr = new XMLHttpRequest;
xhr.open("GET","http://locationsng-api.herokuapp.com/api/v1/states",true)
xhr.send();
xhr.onreadystatechange = () => {
	logApiCallStatus(xhr,"States API");
	if (xhr.readyState === 4 && xhr.status === 200) {
		const allStates = JSON.parse(xhr.responseText);
		for (let state of allStates) {
			let stateOptions = document.createElement('option')
			stateOptions.innerHTML = state.name
			stateSelectTag.add(stateOptions)
		}
	}
}

function logApiCallStatus(requestedApi,apiName) {
	console.log("Call status for: " + apiName)
	if (requestedApi.readyState === 2) {
		console.log("Headers have been received!: "+ requestedApi.readyState)
	}else if (requestedApi.readyState === 3) {
		console.log("Loading...: "+requestedApi.readyState)
	}else if (requestedApi.readyState === 4 && requestedApi.status === 200) {
		console.log("Done and successfully called this API! "+requestedApi.readyState)
		return true;
	}else {
		console.log("Something went wrong while calling this resource")
		return false;
	}
}

function deleteCreatedElement (createdElement,parent) {
	let numberOfCreatedElements = parent.childElementCount;
	console.log(numberOfCreatedElements)
	for (let i = numberOfCreatedElements;i>= 1;i--) {
		parent.remove(i);
	}
}

let xhrLga = new XMLHttpRequest;
xhrLga.open("GET","http://locationsng-api.herokuapp.com/api/v1/lgas",true)
xhrLga.send();
xhrLga.onreadystatechange = () => {
	logApiCallStatus(xhrLga,"Local Governments API");
	if (xhrLga.readyState === 4 && xhrLga.status === 200) {
		const lgaArray = JSON.parse(xhrLga.responseText)
		console.log()
		stateSelectTag.oninput = () => {
			for (let eachLga of lgaArray) {
				if (stateSelectTag.value === eachLga.state) {
					lgaSelectTag.onclick = () => {
						let localGovsArray = eachLga.lgas;  
						for (localGovs in localGovsArray) {
							let lgaOptions = document.createElement('option')
							lgaOptions.innerHTML = localGovsArray[localGovs]
							lgaSelectTag.appendChild(lgaOptions)
						}
					}
					lgaSelectTag.onblur = () => {
						let lgaOptions = document.querySelector('.lgaSelect option')
						deleteCreatedElement(lgaOptions,lgaSelectTag)
					}
				}else if (stateSelectTag.value != eachLga.state) {
						console.log("logic is not properly written")
				}
			}
		}
		lgaSelectTag.onblur = () => {
			let lgaOptions = document.querySelector('.stateSelect option')
			deleteCreatedElement(lgaOptions,lgaSelectTag)
		}
	}
}