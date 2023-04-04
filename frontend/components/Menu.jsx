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

export default function Menu() {
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              "submenu"
            ) : (
              <li className="cursor-pointer">
                <Link href={item?.url}>
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
    </ul>
  );
}
