import Page from "../components/layout/Page";
import Navbar from "../components/layout/Navbar";
import Sticky from "../components/layout/Sticky";
import BottomNav from "../components/ui/BottomNav";
import Main from "../components/layout/Main";
import SectionHeader from "../components/ui/SectionHeader";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

function About() {
  return (
    <Page>
      <Sticky pos={"top"}>
        <Navbar />
      </Sticky>
      <Main style={"mb-4 mt-8"}>
        <ParagraphImg>
          <ParagraphHolder>
            <SectionHeader style={"text-start text-primary mb-5"}>
              Welcome to MyStay
            </SectionHeader>
            <Paragraph>
              Where comfort, convenience, and unforgettable stays come together.
              MyStay makes finding your perfect place to stay effortless whether
              you’re planning a weekend getaway, a business trip, or a family
              vacation.
            </Paragraph>

            <Paragraph>
              We bring together the best stays from trusted hotels and
              guesthouses, allowing you to compare prices, explore amenities,
              and choose what fits your style and budget. From modern city
              hotels to peaceful countryside retreats, MyStay connects you to
              places that feel like home wherever you go.
            </Paragraph>

            <Paragraph>
              It’s more than just booking a room it’s about creating memorable
              experiences. Discover hidden gems, enjoy seamless booking, and
              travel with confidence knowing that MyStay helps you find the
              right stay, every time.
            </Paragraph>
          </ParagraphHolder>

          <img src="/about/abt-1.jpg" />
          <img src="/about/abt-2.jpg" />
          <ParagraphHolder>
            <SectionHeader style={"text-start text-primary mb-5"}>
              Trusted Journeys
            </SectionHeader>
            <Paragraph>
              Since our humble beginnings, MyStay has been more than just a
              booking platform it’s a vision born from a love for exploration
              and genuine hospitality.
            </Paragraph>
            <Paragraph>
              Every feature of MyStay reflects our dedication to quality and
              care. We’ve combined modern technology with a human touch,
              ensuring that every user feels guided and valued.
            </Paragraph>
            <ButtonLink />
          </ParagraphHolder>
        </ParagraphImg>
      </Main>
      <Sticky pos={"bottom"}>
        <BottomNav />
      </Sticky>
    </Page>
  );
}

function Paragraph({ children }) {
  return <p className="font-body text-start w-full md:text-lg">{children}</p>;
}
function ParagraphHolder({ children }) {
  return <div className="flex flex-col gap-5">{children}</div>;
}

function ParagraphImg({ children }) {
  return <div className="grid grid-cols-2 gap-4 w-full">{children}</div>;
}

function ButtonLink() {
  return (
    <Link to={"/"} className="text-start w-fit">
      <Button className={"bg-primary p-4 text-xl"}>Explore Luxury Rooms</Button>
    </Link>
  );
}

export default About;
