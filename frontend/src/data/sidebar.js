import { FaTh, FaRegChartBar, FaCommentAlt, FaCalendarAlt , FaListAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
  {
    title: "Consultation",
    icon: <FaCalendarAlt />,
    path: "/appointment-form",
  },
  {
    title: "Appointment List",
    icon: <FaListAlt />,
    path: "/appointment-list",
  },
];

export default menu;
