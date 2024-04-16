export interface IRequest {
    id: number;
    fio: [
      name: string,
      surname: string,
      fatherName: string
    ];
    userId: number;
    status: string;
    documentType: string;
    documentCount: number;
    }