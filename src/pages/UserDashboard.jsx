import Navbar from "../components/Navbar";
import Search from "../components/Search";
function UserDasboard() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Navbar />
      <Search />
    </div>
  );
}

export default UserDasboard;
