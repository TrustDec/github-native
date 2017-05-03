import ReactNative from 'react-native';
const {AsyncStorage} = ReactNative;
import GitHubTrending from 'GitHubTrending';
export var FLAG_STORAGE={flag_popular:'popular',flag_trending:'trending'};
export default class DataRepository {
	constructor(flag){
		this.flag = flag;
		if (flag===FLAG_STORAGE.flag_trending) this.trending=new GitHubTrending();
	}
	fetchRepository(url){
		return new Promise((resolve,reject)=>{
			// 获取本地的数据
			this.fetchLocalRepository(url)
				.then(result=>{
					if (result) {
						resolve(result);						
					}else{
						this.fetchNetRepository(url)
							.then(result=>{
								resolve(result);
							})
							.catch(e=>{
								reject(e)
							})
					}
				})
				.catch(e=>{
					this.fetchNetRepository(url)
						.then(result=>{
							resolve(result);
						})
						.catch(e=>{
							reject(e)
						})
				})
		});
	}
	/*
	* 获取本地数据
	*/
	fetchLocalRepository(url){
		return new Promise((resolve,reject)=>{
			AsyncStorage.getItem(url,(error,result)=>{
				if (!error) {
					try{
						resolve(JSON.parse(result));
					}catch(e){
						reject(e)
					}
				}else{
					reject(error)
				}
			});
		});
	}
	fetchNetRepository(url){
		return new Promise((resolve,reject)=>{
			//console.log(this.flag===FLAG_STORAGE.flag_trending);
			if (this.flag===FLAG_STORAGE.flag_trending) {
				this.trending.fetchTrending(url)
					.then(result=>{
						if (!result) {
							reject(new Error('responseData is null'));
							return;
						}
						this.saveRepository(url,result);
						resolve(result);
					})
			}else{ 
				fetch(url)
					.then(response=>response.json())
					.then(result=>{
						if (!result) {
							reject(new Error("responseData is null"));
							return;
						}
						resolve(result.items);
						this.saveRepository(url,result.items)
					})
					.catch(error=>{
						reject(error);
					})
			}
		});
	}
	saveRepository(url,items,callBack){
		if (!url || !items) return;
		let wrapData={items:items,updata_data:new Date().getTime()};
		AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack);
	}
	/*判断数据是否过时，longTime 数据的时间戳*/
	checkedData(longTime){
		console.log(longTime);
		return false;
		let cDate = new Date();
		let tDate = new Date();
		tDate.setItem(longTime);
		if (cDate.getMonth()!==tDate.getMonth()) return false;
		if (cDate.getDay()!==tDate.getDay()) return false;
		if (cDate.getHours()!==tDate.getHours()) return false;
		return true;
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