export class Student {
    id: string;
    name: string;
    imgUrl: string;
    details: string;
    attendance: string;

    constructor(id: string, name: string, imgUrl:string,  details:string, attendance: string) {
        this.id = id;
        this.name = name;
        this.imgUrl = imgUrl;
        this.details = details;
        this.attendance = attendance;
    }
}

