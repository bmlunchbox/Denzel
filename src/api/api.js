
export async function getCourses() {
	return fetch("/api/course")
		.then(resp => {
				if (!resp.ok){
					if(resp.status >= 400 && resp.status < 500){
						return resp.json().then(data => {
							let err = {errMessage: data.message};
							throw err;
						})
					} else{
						let err = {errMessage: "server not responding"};
						throw err;
					}
				}
				return resp.json();
			})
}

export async function getRequirements() {
	return fetch("/api/requirement")
		.then(resp => {
				if (!resp.ok){
					if(resp.status >= 400 && resp.status < 500){
						return resp.json().then(data => {
							let err = {errMessage: data.message};
							throw err;
						})
					} else{
						let err = {errMessage: "server not responding"};
						throw err;
					}
				}
				return resp.json();
			})
}