import * as React from 'react';
import Table from '../components/Table/TaskTable';
import { IStudentInfo } from '../models/IStudentInfo';

interface IHomeProps {
    items: IStudentInfo[];
    isLoading: boolean;
}



const Home: React.FC<IHomeProps> = (props) => {


return (
<div>
    <div className='d-flex flex-wrap justify-center'>
      <Table items={props.items} />
    </div>
</div>
);
};

export default Home;




