import { House, Book, BookPlus, CreditCard } from "lucide-react";

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
    key: "upgrade",
    label: "Upgrade Plan",
    icon: CreditCard,
    href: "/upgrade",
  },
];

export const STORIES = [
  {
    title: "The Lost City",
    genre: "Fantasy",
    thumbnail: "/assets/Depth 7, Frame 0.svg",
  },
  {
    title: "Rise of the Guardian",
    genre: "Adventure",
    thumbnail: "/assets/Depth 7, Frame 0 (1).svg",
  },
  {
    title: "The Enchanted Forest",
    genre: "Fantasy",
    thumbnail: "/assets/the_forest.png",
  },
  {
    title: "Secrets of the Sea",
    genre: "Adventure",
    thumbnail: "/assets/secrets_of_the_seas.png",
  },
  {
    title: "Mystery of the Mansion",
    genre: "Mystery",
    thumbnail: "/assets/mystery_of_the_mansion.png",
  },
  {
    title: "Curse of the Cursed",
    genre: "Horror",
    thumbnail: "/assets/curse_of_the_cursed.png",
  },
];
