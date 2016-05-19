import {get} from "jquery";

let API = {
	fetchLinks(){
		console.log("1. In API");
		get("/data/links").done(resp => {
			console.log(resp);
		});
	}
};

export default API;