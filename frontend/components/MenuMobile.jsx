import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];

const subMenuData = [
  { id: 1, name: "Jordan", doc_count: 11 },
  { id: 2, name: "Sneakers", doc_count: 8 },
  { id: 3, name: "Running shoes", doc_count: 64 },
  { id: 4, name: "Football shoes", doc_count: 107 },
];

{
  /*Category Menu when clicked on categories */
}

export default function MenuMobile({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  categories,
}) {
  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                onClick={() => setShowCatMenu(!showCatMenu)} //whenever clicked on category menu, a sub menu will be displayed or removed
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown size={14} /> {/*Creating submenu */}
                </div>
                {showCatMenu && (
                  <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                    {categories?.map(({ attributes: c, id }) => {
                      return (
                        <Link
                          href={`/category/${c.slug}`}
                          key={id}
                          onClick={() => {
                            setShowCatMenu(false);
                            setMobileMenu(false);
                          }}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {c.name}
                            <span className="opacity-50 text-sm">{`(${c.products.data.length})`}</span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
                {/*This code is using a conditional rendering technique to conditionally render a submenu based on the state of 'showCatMenu'. If the value of the 'showCatMenu' is true
                the code will execute the code inside the parentheses and render a list of submenu items. The map function is used to iterate over the 'subMenuData' arrau and create a 
                'li' elemnt for each item in the array. Each submenu is rendered as a link and is assigned a unique key based on its 'id' value. When a submenu item is clicked, the 
                'onClick' event handler is triggered and calls the 'setShowCatMenu' and 'setMobileMenu' function, which update the values of their respective state variables to false, 
                which closes the submenu and mobile menu if it is open */}
              </li>
            ) : (
              <li className="py-4 px-5 border-b">
                <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                  {/*path ways are already define up */}
                  {item.name}
                </Link>
              </li>
            )}{" "}
            {/*!!item.subMenu means if it is true than go to if condition else got to else-condition */}
          </React.Fragment>
          //react fragment  is built in component that allows you to group a list of children without adding any extra markup to the DOM.
        );
      })}{" "}
      {/*Creating Menu items */}
    </ul> /*This code is creating a vertical menu for small screens. Inside the 'ul' a 'map' function is used to iterate over the 'data' array and create a 'li' elemnt for each menu 
    item. Each item is either a regular item with a link to a url or a menu item with a submenu. If a menu item has a submenu, a chevron down icon is displayed next to the menu item.
    When the user click on a menu item that has a submenu, the 'onClick' event handler is triggered and the 'showCatMenu' state variable is toggled to display or hide the submenu. if
    'showCatMenu' state variable is true, a list of submenu item is renderd using another 'map' function to iterate over the 'subMenuData' array.*/
  );
}
