export class ListType {
    title: string;
    creationTime: string;
    isCompleted: boolean;
    _id: string;

    constructor(){
        const currentDate = new Date();
        this.creationTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
        this.isCompleted = false;
    }
}
