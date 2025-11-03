import { useEffect, useState } from "react";
import ProfileLayout from "../components/ProfileLayout";
import Subheader from "../components/Subheader";
import { Button } from "./Button";

function ProfileInfo() {
  const [country, setCountry] = useState([]);

  useEffect(() => {
    async function fetchCountry() {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
      const data = await res.json();
      const countryData = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );

      setCountry(countryData);
    }

    fetchCountry();
  }, []);

  return (
    <ProfileLayout>
      <div>
        <Subheader>Update your profile</Subheader>
        <p className="font-body text-lg mt-4">
          Providing the following information will make your check-in process
          faster and smoother. See you soon!
        </p>
      </div>
      <Form country={country} />
      <Button className={"self-end"}>Update Profile</Button>
    </ProfileLayout>
  );
}

function Form({ country }) {
  return (
    <form className="bg-gray-200 p-2 flex flex-col gap-4 w-full">
      <LabelInput label={"Full Name"} input={"Abel Alebachew"} />
      <LabelInput label={"Email"} input={"abel@gmail.com"} />
      <LabelInput label={"Where are you from"} input={""}>
        <Select country={country} />
      </LabelInput>
    </form>
  );
}

function LabelInput({ label, input, children }) {
  return (
    <div className="flex flex-col gap-2 items-start font-heading md:text-lg">
      <label>{label}</label>
      {input && (
        <input
          className="w-full bg-gray-300 placeholder-gray-800 p-2"
          type="text"
          placeholder={input}
          readOnly
        />
      )}
      {!input && children}
    </div>
  );
}

function Select({ country }) {
  return (
    <select className="w-full bg-gray-300 placeholder-gray-800 p-2">
      <option value="">Select Country</option>
      {country.map((el, i) => (
        <option key={i} value={el}>
          {el.name.common}
        </option>
      ))}
    </select>
  );
}

export default ProfileInfo;
