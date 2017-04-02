export default class DataRepository {
	fetchNetRepository(url){
		return new Promise((resolve,reject)=>{
			fetch(url)
				.then(response=>response.json())
				.then(result=>{
					resolve(result);
				})
				.catch(error=>{
					reject(error);
				})
		});
	}
	fetchNetPost(url,data){
		return new Promise((resolve,reject)=>{
			fetch(url,{
		      method: 'POST',
		      header: {
		        'Accept':'application/json',
		        'Comtent-Type':'application/json'
		      },
		      body:JSON.stringify(data)
		    })
			    .then(response=>response.json())
				.then(result=>{
					resolve(result);
				})
				.catch(error=>{
					reject(error);
				})
		})
	}
}