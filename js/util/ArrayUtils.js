export default class ArrayUtils {
	static updateArray(array,item){
		for (var i = 0,len = array.length; i < len; i++) {
			var temp = array[i];
			if (item === temp) {
				array.splice(i,1);
				return;
			}
		}
		array.push(item);
	}
	static clone(from){
		if (!from) return [];
		let newArray = [];
		for (let i = 0,len = from.length; i < len; i++) {
			newArray[i] = from[i];
		}
		return newArray;
	}
	static remove(array,item){
        if (!array)return;
        for(var i=0,l=array.length;i<l;i++){
            if (item===array[i])array.splice(i,1);
        }
    }
}