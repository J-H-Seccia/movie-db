import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { title: "About", href: "/about" },
  { title: "Movies", href: "/browse/movies" },
  { title: "Favourites", href: "/favourites" },
];

function Nav() {
    const [open, setOpen] = useState(false);
    const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

    return (
    <div className="nav-container">
      <nav className="flex justify-between items-center py-8 lg:py-4 px-2">
      <div className="lg:flex hidden gap-12 text-3xl text-white font-bold">
        {navLinks.map((link, index) => {
          return (
            <NavLink to={link.href} key={index}
              className={({ isActive, isPending }) => 
                `px-3 hover:text-primary hover:underline ${
                  isPending ? 'text-gray-500' : isActive ? 'font-bold text-primary underline' : ''
                }`
              }
            >
              {link.title}
            </NavLink>
          )
        })}
      </div>
      <div
        className="cursor-pointer lg:hidden text-2xl text-white font-bold"
        onClick={toggleMenu}
      >
        <CiMenuBurger />
      </div>
    </nav>

  <AnimatePresence>
  {open && (
    <motion.div
      variants={menuVars}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed left-0 top-0 w-full h-screen origin-top bg-copy text-white p-10"
    >
      <div className="flex h-full flex-col">
        <div className="flex justify-end">
          <div
            className="cursor-pointer text-3xl text-white"
            onClick={toggleMenu}
          >
           <IoMdClose />
          </div>
        </div>
        <motion.div
          variants={containerVars}
          initial="initial"
          animate="open"
          exit="initial"
          className="flex flex-col h-full justify-center items-center gap-4 "
        >
          {navLinks.map((link, index) => {
            return (
              <div className="overflow-hidden">
                <MobileNavLink
                  key={index}
                  title={link.title}
                  href={link.href}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  )}
  </AnimatePresence>
</div>
    );
}

export default Nav;

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};
const MobileNavLink = ({ title, href }) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-5xl uppercase text-white"
    >
      <NavLink to={href} onClick={() => setOpen(!open)}>{title}</NavLink>
    </motion.div>
  );
};