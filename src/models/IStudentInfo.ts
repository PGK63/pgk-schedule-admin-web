export interface IStudentInfo {
  content: [
    {
      id: number,
      firstName: string,
      lastName: string,
      middleName: string,
      cabinet: string,
      departments: [
        {
          id: number,
          name: string
        }
      ]
    }
  ],
  totalPage: number,
  last: boolean,
  first: boolean
}