// Adapted from
// https://stackoverflow.com/a/18699848
export default function createEvent(){
    let invokeList = [];

    let event = () => {
        for (let i = 0; i < invokeList.length; i++){
            invokeList[i].apply(arguments)
        }
    }

    event.add = value => {
        invokeList[invokeList.length] = value;
    }

    // I added the ability to remove funtions from the list
    event.remove = value => {
        let index = invokeList.indexOf(value);
        if(index == -1) return;
        invokeList.splice(value, 1);
    }

    return event;
}