import { Link, useLocation, useParams } from "react-router-dom";
import { PhotoType } from "../features/masonry-grid/types";

const ItemDetails = () => {
  const location = useLocation();
  const { itemId } = useParams();
  const photo: PhotoType = location.state;

  if (!photo) {
    return <div>Error: No photo data found for item {itemId}</div>;
  }

  return (
    <div>
        <Link to={"/"}>
            Back
        </Link>
        <h2>{photo.alt}</h2>
        <img src={photo.src.large} alt={photo.alt} style={{ maxWidth: "100%" }} />
        <p>Photographer: {photo.photographer}</p>
    </div>
  );
};

export default ItemDetails;
