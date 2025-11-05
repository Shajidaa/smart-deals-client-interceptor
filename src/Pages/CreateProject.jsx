// import axios from "axios";
import useAuth from "../hooks/AuthHook/Auth";
// import useAxios from "../hooks/AuthHook/useAxios";
import useAxiosSecure from "../hooks/AuthHook/useAxiosSecure";

const CreateProject = () => {
  const { user } = useAuth();
  // const instance = useAxios();
  const axiosSecure = useAxiosSecure();
  const handleCreateProduct = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const photo = e.target.photo_url.value;
    const price_min = e.target.price_min.value;
    const price_max = e.target.price_max.value;
    // console.log(title, photo, price_max, price_min);
    const newProduct = {
      title,
      photo,
      price_min,
      price_max,
      email: user.email,
    };
    // axios.post(`https://smart-deals-server-nine.vercel.app/products`, newProduct).then((data) => {
    //   console.log(data);
    //   if (data.data.insertedId) {
    //     alert`The product has been create successfully`;
    //   }
    // });
    axiosSecure.post("/products", newProduct).then((data) => {
      // console.log(data.data);
      if (data.data.insertedId) {
        alert`The product has been create successfully`;
      }
    });
    // instance.post("/products", newProduct).then((data) => {
    //   console.log(data.data);
    //   if (data.data.insertedId) {
    //     alert`The product has been create successfully`;
    //   }
    // });
  };
  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleCreateProduct}>
        <fieldset className="fieldset">
          {/* name  */}
          <label className="label">Title</label>
          <input
            type="text"
            required
            placeholder="tittle"
            name="title"
            className="input"
          />
          {/* email  */}
          <label className="label">Photo Url</label>
          <input
            type="text"
            placeholder="photo url"
            required
            name="photo_url"
            className="input"
          />
          {/*price_min*/}
          <label className="label">price_min</label>
          <input
            type="text"
            name="price_min"
            className="input"
            placeholder="type your price_min"
            required
          />
          {/*price_max*/}
          <label className="label">price_max</label>
          <input
            type="text"
            name="price_max"
            className="input"
            placeholder="type your price_max"
            required
          />

          <button type="submit" className="btn btn-neutral mt-4">
            Submit bit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateProject;
