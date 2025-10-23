import Logo from "./Logo";

const items = [
  {
    title: "Menu",
    links: ["Home", "Rooms", "Features", "Community"],
  },
  {
    title: "Categories",
    links: ["Queen", "King", "Double Bed", "Single Bed"],
  },
  {
    title: "Social",
    links: ["Instagram", "Twitter", "Youtube", "Facebook"],
  },
];

function Footer() {
  return (
    <div className="container mx-auto p-4 my-4 flex flex-col items-center md:items-start">
      <Logo style={"w-fit"} />
      <div className="flex flex-col items-center md:flex-row gap-8 justify-between md:w-full">
        <div className="flex gap-10 w-full">
          {items.map((el, i) => (
            <ItemsCol items={el} key={i} />
          ))}
        </div>
        <div className="flex flex-col gap-4 items-start w-full">
          <h3 className="font-heading md:text-lg text-base font-semibold">
            Never miss a tasty recipe
          </h3>
          <div>
            <input
              type="text"
              className="font-body text-sm md:text-base border-b-2 mr-4"
              placeholder="Your Email Address"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemsCol({ items }) {
  return (
    <div className="flex flex-col gap-3 mt-6 text-left">
      <h4 className="md:text-xl text-base font-heading font-semibold mb-1">
        {items.title}
      </h4>
      {items.links.map((el, i) => (
        <a className="text-xs md:text-sm font-body font-medium" key={i}>
          {el}
        </a>
      ))}
    </div>
  );
}

export default Footer;
