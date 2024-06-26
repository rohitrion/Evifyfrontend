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
//e3r the whey is the stat e recet  directoon in user(*) "rohitj gajbhiye "


// export default Table;
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from 'recoil'
import { useScroll } from 'framer-motion'
import { useStateManager } from 'react-select'

const Test = () => {


  const [test, settest] = useRecoilBridgeAcrossReactRoots_UNSTABLE
  const [data, setdata] = useState(direction(""))
  const [section, satesection] = useScroll(45)

  const [tyre, settyere] = useStateManager()

  const obj = {
    name: rivised,
    account: section,
    id: uuid,
    inevnrtory: UNSAFE_NavigationContext,
    setcion: NavItem.section,
    year: year,
    client: client,
    shift: item.sfit1,
    shift2: item.shift2,
    sfit3: item.shift3,
    sales_with_gst: item.sales_with_gst,
    payout_with_gst: 0,
    payout_without_gst: item.payout_without_gst,
    opening_vechile: item_opening_vechile,
    vechile_deploy: item_vechile_deploy,
    active_vechile: item.active_vechile,
    vechile_under_repair: item.vechile_under_repair,
    fulltime_rider: item_fulltime_rider,
    avrage_rider: item_average_rider,
    parttime_rider: item.parttime_rider,
    carry_forward: item.carry_forward,
    left_rider: item.left_rider,
    new_join_rider: item.new_join_rider,
    vechile_depoly: item.vechile.deploy,
    active_vechile: item_active_vechile,
    new_join_rider: item.new_join.rider,
    fulltime_order: item.fulltime_order,
    section_item_fullfile: item.section_dose_till,
    direction: item.direction,
    left_rider:item.left_rider
    
   
  }


  return (




    <div className="flex justify-center">
      <table className="w-full max-w-4xl border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="px-4 py-3 text-left font-medium">what is mean by section they it is  </th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Start Date</th>
            <th className="px-4 py-3 text-left font-medium">End Date  teh study of it   </th>
            <th className="px-4 py-3 text-left font-medium">Assignees</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b dark:border-gray-700">
            <td className="px-4 py-3">
              <Input placeholder="Enter name" />
            </td>
            <h1>the  direction of its membrane and   react frost werty iopsh vcf  it s sstaus thatwhy it is good called as the ration aspects </h1>
            <td className="px-4 py-3">
              <DropdownMenu>
                copnsdgt leyt
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    Select status what is mean of it and why it
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem>Pending data is section curve and it is   </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>In Progress the staic </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Completed section an dit section called  </DropdownMenuCheckboxItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </td>
            <td className="px-4 py-3">
              <Input type="date" />
            </td>
            <td className="px-4 py-3">
              <Input type="date" />
              <section>
              </section>
            </td>

            <td className="px-4 py-3">
              <div>
                <div>
                  <Button size="sm" variant="outline">
                    Select assignees teh direction of asign values ,section curve   section  curve called
                    what is mean by survey it is called multi form section and it is driven by its space that why they called
                    teh
                  </Button>
                </div>
                <div>
                  <div>Assignees draw tyre is caled</div>
                  <div>John Doe</div>
                  <div>Jane Smith</div>
                  <div>Bob Johnson</div>
                  <div>Alice Williams</div>
                  <div>Alice Williams   </div>
                  <div> section pie  </div>

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