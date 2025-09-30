import { House, Book, BookPlus, CreditCard, BookUser } from "lucide-react";

export const SIDEBAR_OPTIONS = [
  {
    key: "home",
    label: "Home",
    icon: House,
    href: "/",
  },
  {
    key: "my-stories",
    label: "My Stories",
    icon: Book,
    href: "/my-stories",
  },
  {
    key: "create",
    label: "Create Story",
    icon: BookPlus,
    href: "/create",
  },
  {
    key: "authors",
    label: "Authors",
    icon: BookUser,
    href: "/authors",
  },
  // {
  //   key: "upgrade",
  //   label: "Upgrade Plan",
  //   icon: CreditCard,
  //   href: "/upgrade",
  // },
];

