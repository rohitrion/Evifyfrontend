// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Table = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Fetch products data
//     axios.get('your_products_api_url')
//       .then(response => {
//         setProducts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//       });

//     // Fetch categories data
//     axios.get('your_categories_api_url')
//       .then(response => {
//         setCategories(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

//   return (
//     <div className="container mx-auto">
//       <table className="min-w-full">
//         <thead>
//           <tr>
//             <th className="px-4 py-2">PRODUCT NAME</th>
//             <th className="px-4 py-2">QUANTITY</th>
//             <th className="px-4 py-2">PRICE</th>
//             <th className="px-4 py-2">CATEGORY</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product.id}>
//               <td className="border px-4 py-2">{product.name}</td>
//               <td className="border px-4 py-2">{product.quantity}</td>
//               <td className="border px-4 py-2">{product.price}</td>
//               <td className="border px-4 py-2">
//                 <select className="border py-1 px-2" defaultValue={product.category}>
//                   {categories.map(category => (
//                     <option key={category.id} value={category.name}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"

const Test = () => {
  return (




    <div className="flex justify-center">
      <table className="w-full max-w-4xl border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="px-4 py-3 text-left font-medium">Name</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Start Date</th>
            <th className="px-4 py-3 text-left font-medium">End Date</th>
            <th className="px-4 py-3 text-left font-medium">Assignees</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b dark:border-gray-700">
            <td className="px-4 py-3">
              <Input placeholder="Enter name" />
            </td>
            <td className="px-4 py-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    Select status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>In Progress</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Completed</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
            <td className="px-4 py-3">
              <Input type="date" />
            </td>
            <td className="px-4 py-3">
              <Input type="date" />
            </td>
            <td className="px-4 py-3">
              <div>
                <div>
                  <Button size="sm" variant="outline">
                    Select assignees
                  </Button>
                </div>
                <div>
                  <div>Assignees</div>
                  <div>John Doe</div>
                  <div>Jane Smith</div>
                  <div>Bob Johnson</div>
                  <div>Alice Williams</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  )
}

export default Test