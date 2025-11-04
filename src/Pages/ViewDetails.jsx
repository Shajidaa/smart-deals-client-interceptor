import React, { use, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../context/AuthContext";

const ViewDetails = () => {
  const product = useLoaderData();
  const { user } = use(AuthContext);
  const bidRef = useRef(null);
  const [bidsProduct, setBidsProduct] = useState([]);
  const [isAdd, setIsAdd] = useState(0);
  const handleBidModalOpen = () => {
    bidRef.current.showModal();
  };
  const { title, price_min, price_max, condition, _id: productId } = product;
  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setBidsProduct(data);
      });
  }, [productId, isAdd]);
  console.log(bidsProduct);

  // const handleBidModalClose = () => {
  //   bidRef.current.close();
  // };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    const newBids = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      bid_price: bid,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newBids),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setIsAdd(isAdd + 1);
          bidRef.current.close();
          alert`your bid add `;
          //add the new bid to the state
          const updatedBids = [...bidsProduct, newBids];
          updatedBids.sort((a, b) => b.bid_price - a.bid_price);
          setBidsProduct(updatedBids);
        }
      });
  };

  const handleDelete = async (_id) => {
    try {
      const res = await fetch(`http://localhost:3000/bids/${_id}`, {
        method: "Delete",
      });
      const data = await res.json();
      if (data) {
        const remainingBids = bidsProduct.filter((bid) => bid._id !== _id);
        setBidsProduct(remainingBids);
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-11/12">
      <div className="">
        <Link to={"/allProducts"}>Back </Link>
        <div className="flex justify-center items-center">
          <div>
            <figure className="px-10 pt-10">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDxANDxIPEBAQEBAQDw8PDw8PDxIQFhEWFhURFRYYHCggGBolGxMVIjIhJSkrLi4uFyE1ODUsNyk5LisBCgoKDg0OGhAQFy0lHh0vLSsrLS0tLSstLS0tNS0tLi0tKy84LTA4LSstLS0tKy0tLjM1LSsrLS0rKy4rKy4rLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwIDBAUGAQj/xABSEAACAgEBAwUHCxAJBQEAAAAAAQIDEQQFEiEHEzFBUQYiYXGBsbIUMjRCUnORk6HR0hcjJCUzU1RydIKEkrPCw/BDYoOUwdPh4/EIFTVjtET/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgEDBP/EABwRAQEBAQEBAQEBAAAAAAAAAAABAhExIQMSIv/aAAwDAQACEQMRAD8AnEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFu65QWXl5eEl0t9iMKy29vMZVQXuebla/1t6K+QptsctTKPtYVwx45ubl8kI/KQ9yo8ourr1k9naGXMqndjbbGMZWTnKKluxymlFKS6s5z5QmLnbvdw+J/3Bz13u4fE/wC4Qrybcouserr0ets56F7cYWSjGM4WYbSe6kmnjHblrjjgTXZY91tdPUB4rrM4dkE/DTJL4d8u/XvvlfxMvpmPVP2rbl18eLS8Jdos4uHZhrxPOPMwKNXqp1QlbZbVCEE5Sk6mkl+ucP8AVC1dzb0enhZU3iF+on6mhNe6gkpykvDhLsbMjlUtc4aPRcdzU6lK5J4zXCErHHxPm3FrskzUx4Y8BsnU61xRdyk7Si8PT6Pyai3/ACjGnyq7QX/5tJ8fZ/lmp2zVu2SXY35zn9fTvQlDLW9GUcrpWVjJvG9dTPlp1a4OjR/3mX0C0+W/V/g+k/vD+gRVZsG1e2r+GXzFl7KsTzmv4ZfMS1Ln1btZ+C6fyXy+gUvlw1n4LR8dL6BFtNLhHdfHpfDo8SDQEvbP5c57yWp0a3OuVN2/JfmuK8/kJZ7ntu6fX6eOq001OuXklF9aa6mfIxKX/T9tKUNbqdHl7ltSuUepTi8Sl48OIE9AAAAAAAAAAAAAAAAAADUWP7Js/Fq9CwhjlP7g9V6ts12lhK+u/dlOEGuchNRUcpP1yaiujjnPDGGTPb7Is8VXo2HH933KHptmz9Tc29RqHFSlWpKEIRfrd+bTw32JN+LKyEfdwncZqVq6tVqq5Uxqlv11zxztlmGotx6YpN5y+nHjx3XKH3ef9rjXp6YRt1dsd5Kbe5XDOFOSXGWZZSisZw+Kxxtdw3KFpdfbzEqvU17TlCLkpxmksvcnhZaSy00uCb44eOX5au57UT1MNoVRnZWqo12c2nKVe5OU1Zhcd3v2s9W6s9IFfcryt3y1MaNdXUoWTUOcqjOp1ybwt+Mm+GeGVjHTxJg09idrx7iHnmfMPc9sGzX2RqrhLc3s6jUNPchDPHj0ZxnC6W2fSmxk3NyfXGDx2Zc2KOI5bbbIeoJ0ycLFdLdksNrNNuenwZI7r7odoQ6bIz8E6ofupMkzlfhvWbOXbdP/AOe44qehXYXifEa9ZktQ9TpqdVJKM5xcbEuCVkW4vGX14T/ONPqYFWu2Pz9So6oWO5Lqy4bs+HW8KHkTNJbsu+j7lOSS9r0w/VfA2wlXdRE110S9DaHHcujuS90vWP5iq6BLWtsiWJIzbImPKJjWO0SByEr7dfod/p1nBuJ3vIWvt1+h3+nWB9FAAxoAAAAAAAAAAAAAAADUXvF9supKjPiamv8AE+dOVPQW1bWvttXe3SjZVKSzCcVXCLXh3XHGOzD6Gj6SrSlfqIvDW5SmvJPh8pqttdzvPxdcoU319O5fCM1w6OEk08doHz93CaFz2jp50Ke5p3zt030RiotYb4eub3V+MTnt/aK02hu1k4OzmK3ZuJ7rcuCS3sd6stZfUsnuzu5fmUoxqrrgnvKqiNdVe97pqKWX4WbqWkbjKuVW9CUXGUZOMoyi1hxaaw011AR/yfd0v/dXfCyrm7NPzck1OdlTjNyS4Pipd4/H8hIejrxZLwRgvKt5+aaNfs7ZFWki6tJp6dOpy3pKtQ6ceuaWMvHRk3Wlp3Y8el8W+PF9vECO+Vf2Rs/s52XHq9j6jh/Pac1unScrc/r2zvBdP5dPf8xzEbDpjxGvVyHeyUljKeePR4n4DL12ijOKnFd7JZXg7Yvwp8DC3jM2fqlFuuf3OfS+ndl7r5/9DbEuT2vshPPA59KVT3J+s6n7n/QlDaGg/wCelNdqOV2rsxNMlrm7azGnAzaa2m6n7XLhnriuleTp8Wew8spMsVK1zid1yHr7dfod/p1nHyqO05FljbS/I7/TqMa+gwAY0AAAAAAAAAAAAAAABrtK/snU+Kn0WZ6NdpX9lanxU+gzYJgVFi69xysdaSfSurPnL+SncWc8e1rqbAs6ejCy+nr6S7IqbKJMCLuWKWLdA/8A2vj/AGF/8+U4+F51fLVPE9D4LX+xvOBhcXjxGvW5jcXFaamF5djeWl0Wg2qox5q3jD2kulwfZ4Y+Dq6uwr12i3+jDjwaa4prqaa6uk5x3GZs/bE6OCxOt8ZVzfDxxftX4V5ck0a3bGznBqcemLTT8KMW3Tp8UuDSkvAn1eTo8h171Gn1S3a5bs3/AEU8Kef6vVPycfAjBeyZKOGn3spLo6unHwtjjn/fNcctPTHTck9e7tqvw6S/9pUY9mgfYbXk7p3Nt0569JqP2tRNjtm9TgACVgAAAAAAAAAAAAAAANdX7Ju/Ep/fMxMwo+ybvxKf3zKTMFzIyUZGQKmy2p5LMrmUwm846gIx5cOHqKWf6VrHiqu+f5CNo2kjcur73Re/P9laRZGwvKdNlG0uq41kbStWldTxslceO41/PDnQcZV08ovaXuo1lGIxt5yC/o71z0Mdiz30V4ItGvdhi3Mwrv33XU727dp+mMJb1NmPXRUvWST7fdG17hNpafUbcodEbY7uh1SmrYwjxdlOMbsnnr7CMdo3YdT91RW35Mw80EdbyKWb22o/keo9OsaT+Xkr6EABDsAAAAAAAAAAAAAAAA1if2Td+JT++ZOTEb+ybfe6f3zIyYK8jJRkZAsS4cDyEnlYL7PDRFPLy/rej9+f7K0iRTJY5e39a0fv38Owh9SNiay1YVc4Yime75XWMvnBzhib43w1lu0pczFcz2EssMq9tyzE6Y9mnr+WU5eaSOx5B5521+h3+nWcvtnZG9qJSndRWkq4YzOyzvKow6IJrpj0No7DkR0tde2koWSszo78t1c3jv6+jvnn5BrN9c/y/TN5Jfr6GABDuAAAAAAAAAAAAAAAA1M39lW+90+eZfyY1j+yrfe6fPMvZAryMlOTzJgqbPMmJObnhLKj156/kL8FhJLqNEVcvj+s6T37+HYQ4mTFy+fcdJ79/DsIaETVzJ7kt5GTRcyE23hJtvgkuLb7EivR6WVsmo4Sit6c5PEIRz66T/w6X1ZMuWtjStzT5TxiWoksXS7d373HwLj2tmydRrXPk9erZ277IsjT/wCv193livW+Uz9lU6VyclGyUaoytlKxYeILex3s8ccJdHWc+nlm8tjzGljW/umpxZJdcaIy71fnTWf7Ndp0zJ64burPta+c3JuUnmUm5Sfa28tndciP/ml+R6j06zgsnech/wD5pfkd/p1ma8b+U/2+iAAcnrAAAAAAAAAAAAAAAAaa72Vb73T55l3JY1D+yrfe6fPMuZAryY1ybbSfS13r6GuHH+f+b2RkBCCisI9yU5PMgRXy9fcdJ79/DsIbJj5ePuOk9+/h2EOGxOgv6PTStmq44TeW5PhGMVxlOT6kkWDbWr1PQq+i3UJTt7Y1Z72vwZay/FjoNk6m1Z12pjuqinKpi85fCVk+h2y8PYupeUwD3pNvsbYzt3rJtV01retunlQhHPyt9CS4ttJF86jxVsLZ8Xvam/K09OJTxwlN+1qj/Wk+Hg4voRja/VyusndPCc3nEfWxiliMI+BRSS8CMna+0lZu1VJw09Weag8KUpPptsxwc38i4Lrb1bkb1FnVTZ33Ia/t0vyO/wBOsj1yO/5Cn9ul+SX+lWRq/F/nOafRoAIdwAAAAAAAAAAAAAAAGi1Psq33qnzzK8lvWeyrfe6fPM93gK8jJRkbwFeTxsoyeZAjDl0WadJ79/DsIh5smrlX0MtRLQ6eCzKd0sL8Wi6T8xxNvci6+N9unpXbdfVX6TR0xjsc965XLbJ0XO3Qg8YynLPrXx4J+BycY/nFWprs1F07EpNSl3uencXCK/VSOyjo9HoErrbXc7K4uENPHfbhKUJqSlLEeKiuOevPE0mr7qnHMdHTDTL77LF+o8ak0ox8kcrtOn8zM+ufbq/HlOxatNGN2uk601mFEVvaiz8WPVH+tLC8xr9r7ZnqN2CjGqit5q08HmKeMb8n7eeH65+RLJrbrZSk5zlKc5PMpzk5Tk+1t8Wy22RddV/PFbkUNlLkU7xLeKskhcg7+3X6Jf6VZHTZIfII/t1+iX+lAytzPr6RABLoAAAAAAAAAAAAAAAA0G0e91Tz7emDj4d2UlL0o/CU5NntXZ/PxWJblkHvV2Yzh4w011xa6V/ijUKjUJ7s6ZN+6qnCVb8W8015UBcyMnnMXferPhr+kPU933qz4a/pAMjeHqe771Z8Nf0h6nu+9WfDX9ICM+XXSynoabUsqu+Ln4IuMo5+GaIOhByajFZcmkkult8Ej6x2tsaWppnp7aJyhZFxazX9IiK3kg2hp9VXdp4K6mu6Fm5OcIWOMZqW7lZXQsZeANV3btRvdMeEalGqCXQowiopLyJHJyZIm2+4LbOotnYtGo70m8PU1PpNW+SzbX4LH+8VfOdd6lvxxxmyfXFtlDZ2r5Kdtfgsfj6vnKfqT7a/Bo/H1fOR1044ps8bO1+pPtr8Gj8fV84+pNtr8Gj8fV85nTjiMkpf9PehlLaN+ow92rTuDfVmcl1/mr4TXbP5G9rWTUbI00R9tOVm/heBLp+EnTuH7kaNlab1PV305Pettfrpzx5v58AbI6MAGNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q=="
                className="rounded-xl"
              />
            </figure>
          </div>
          <div>
            <div className="">
              <h2 className="card-title">
                {title}({condition})
              </h2>
              <p>Price: ${price_max - price_min}</p>
            </div>
            <button onClick={handleBidModalOpen} className="btn btn-accent">
              I want to buy this Product
            </button>
          </div>
        </div>

        <dialog
          ref={bidRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Give Seller Your Offered Price
            </h3>
            <form onSubmit={handleBidSubmit}>
              <fieldset className="fieldset">
                {/* name  */}
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  readOnly
                  defaultValue={user?.displayName}
                />
                {/* email  */}
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  readOnly
                  defaultValue={user?.email}
                />
                {/* bid */}
                <label className="label">Bid</label>
                <input
                  type="text"
                  name="bid"
                  className="input"
                  placeholder="type your bid"
                  required
                />

                <button type="submit" className="btn btn-neutral mt-4">
                  Submit bit
                </button>
              </fieldset>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <div className="max-w-11/12 mx-auto">
        <h1 className="text-2xl font-semibold my-5">
          {" "}
          Bids For This Products:{bidsProduct?.length}{" "}
        </h1>

        <div className="overflow-x-auto bg-white ">
          <table className="table">
            <thead>
              <tr>
                <th>SL No</th>
                <th> Seller Image</th>
                <th>Seller </th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            {bidsProduct?.map((pro, index) => (
              <tbody>
                {/* row 4 */}
                <tr>
                  <td className="font-semibold">{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {pro.buyer_name} <br />
                    {pro.buyer_email}{" "}
                  </td>

                  <td>${pro.bid_price}</td>
                  <th className="flex  items-center gap-2">
                    <button className="btn btn-success btn-xs  ">
                      Accept Offer
                    </button>
                    <button
                      onClick={() => handleDelete(`${pro._id}`)}
                      className="btn btn-error btn-xs"
                    >
                      Reject Offer
                    </button>
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
