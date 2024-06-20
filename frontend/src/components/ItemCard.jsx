import { Link } from "react-router-dom";
import { useUserContext } from "../utils/UserContext";

export function ItemCard({ details }) {
  const { itemName, desc, priceForDay, location, userId, category, imgUrl } =
    details;

    const uId = useUserContext();
  return (
    <div className="lg:w-[300px] w-[90%] m-auto rounded-md border">
      {imgUrl ? (
        <img
          src={imgUrl}
          alt="Laptop"
          className="lg:h-[200px] h-[120px] w-full rounded-t-md object-cover"
        />
      ) : (
        <img
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          alt="Laptop"
          className="lg:h-[200px] h-[120px] w-full rounded-t-md object-cover"
        />
      )}
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {itemName}
        </h1>
        <p className="mt-3 text-sm text-gray-600">{desc}</p>
        <div className="mt-4">
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
            #{category}
          </span>
        </div>
        {(userId == uId.userId) ? <div></div>: <Link to={`/reuse/${userId}`}>
          <button
            type="button"
            className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Use
          </button>
        </Link>}
      
      </div>
    </div>
  );
}
