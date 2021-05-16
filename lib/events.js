export default function createEvent(){
    let invokeList = [];

    let event = () => {
        for (let i = 0; i < invokeList.length; i++){
            invokeList[i].apply(arguments)
        }
    }

    event.add = function(value){
        invokeList[invokeList.length] = value;
    }

    event.remove = function(value){
        let index = invokeList.indexOf(value);
        if(index == -1) return;
        invokeList.splice(value, 1);
    }

    return event;
}