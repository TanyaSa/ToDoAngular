export class ListType {
    name: string;
    creationTime: string;
    isChecked: boolean;

    constructor(){
        const currentDate = new Date();
        this.creationTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
        this.isChecked = false;
    }
}
