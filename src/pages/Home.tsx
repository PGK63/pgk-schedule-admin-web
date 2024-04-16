import * as React from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { Context } from '..';
import { IDepartement } from '../models/IDepartement';
import Table from '../components/Table/TaskTable';
import { Box, Heading } from "@chakra-ui/react";
import { IStudentInfo } from '../models/IStudentInfo';

interface IHomeProps {
    items: IStudentInfo[];
    searchValue: string;
    isLoading: boolean;
}



const Home: React.FC<IHomeProps> = (props) => {

  
   
    // const renderItems = () => {
    //   console.log(props.items)
    //   // Удаление лишних пробелов из значения для поиска
    //   const searchValue = props.searchValue ? props.searchValue.trim() : '';
      
    //   const filteredItems = props.items.filter((item) =>
    //     item.content.toLowerCase().includes(searchValue.toLowerCase())
    //   );
    
    //   // Если значение для поиска не задано или не удовлетворяет ни одному элементу массива,
    //   // выводим все элементы
    //   const itemsToRender = !searchValue || filteredItems.length === 0 ? props.items : filteredItems;
    
    //   return (props.isLoading ? [...Array(8)] : itemsToRender).map((item, index) => (
    //     <Card key={index} title={item.name} imageUrl={item.imageUrl} link={item.id} {...item} />
    //   ));
    // };


return (
<div>
{/* <Header /> */}

<div className='d-flex flex-wrap justify-center mt-50'>
{/* {arr.map((item) => (
<Card
key={item.id}
title={item.title}
imageUrl={item.imageUrl}
link={item.link}
/>
))} */}
{/* {renderItems()} */}


      <Table items={props.items} />
  

</div>
</div>
);
};

export default Home;




