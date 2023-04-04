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
                    {subMenuData.map((submenu) => {
                      return (
                        <Link
                          href="/"
                          key={submenu.id}
                          onClick={() => {
                            setShowCatMenu(false);
                            setMobileMenu(false);
                          }}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {submenu.name}
                            <span className="opacity-50 text-sm">78</span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
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
    </ul>
  );
}
