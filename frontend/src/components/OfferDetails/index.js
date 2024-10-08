import UseOfferContext from "../../hooks/UseOfferContext";
import { useState } from "react";
import OfferForm from "../OfferForm/index";
import "./offerDetails.css";
import { useNavigate } from "react-router-dom";
import UseAuthContext from "../../hooks/UseAuthContext";

const OfferDetails = ({ offer }) => {
  const idEmployer = offer.idEmployer;
  const { dispatch } = UseOfferContext();
  const { user } = UseAuthContext();
  const Navigate = useNavigate();

  const [popup, setPopup] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/offer/delete-offer/${offer._id}`,{
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      }, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.message === "Offer job deleted successfully") {
        dispatch({ type: "DELETE_OFFER", payload: { _id: offer._id } });
      } else {
        console.error("Failed to delete offer:", data.message);
      }
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const handleNavigate = () => {
    Navigate("/JobDetails", { state: { idEmployer, offer } });
  };
  return (
    <>
      <div className="offer-details">
        <header className="offer-header">
          <h1 className="offer-title">{offer.title}</h1>
          <p className="offer-company">{offer.company}</p>
          <p className="offer-location">{offer.location}</p>
          <p className="offer-contact">{offer.candidatures}</p>
         { console.log('offer.candidatures', offer.candidatures)}
          <p className="offer-publication-date">
            Posted on: {offer.publicationDate}
          </p>
        </header>
        <section className="offer-body">
          <p className="offer-description">{offer.description}</p>
          <h3 className="offer-requirements-title">Requirements</h3>
          <ul className="offer-requirements">
            {offer.requirements &&
              offer.requirements
                .split(",")
                .map((req, index) => <li key={index}>{req.trim()}</li>)}
          </ul>
          <p className="offer-salary">Salary: {offer.salary}dt</p>
        </section>
        <footer className="offer-actions">
          <button onClick={() => setPopup(true)} className="edit-btn">
            Edit
          </button>
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
          <button onClick={handleNavigate} className="see-more-btn">
            See more
          </button>
        </footer>
      </div>

      {popup && (
        <div className="popup" id="popup_id">
          <OfferForm
            data={offer}
            className="offer-form-popup"
            onClose={() => setPopup(false)}
          />
          <button className="close-button" onClick={() => setPopup(false)}>
            X
          </button>
        </div>
      )}
    </>
  );
};

export default OfferDetails;
