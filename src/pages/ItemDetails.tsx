import { Link, useLocation, useParams } from "react-router-dom";
import { PhotoType } from "../features/masonry-grid/types";
import { ItemDetauilsContainer, LinkButton } from "../styled-components/StyledMasonryGrid";

/**
 * Custom component to render the detail page of a photo
 */
const ItemDetails = () => {
  const location = useLocation();
  const { itemId } = useParams();
  const photo: PhotoType = location.state;

  if (!photo) {
    return <div>Error: No photo data found for item {itemId}</div>;
  }

  return (
    <ItemDetauilsContainer>
        <LinkButton to={"/"}>
            Back
        </LinkButton>
        <h2>{photo.alt}</h2>
        <img src={photo.src.large} alt={photo.alt} style={{ maxWidth: "100%" }} />
        <p>Photographer: {photo.photographer}</p>
    </ItemDetauilsContainer>
  );
};

export default ItemDetails;
