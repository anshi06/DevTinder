import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
  if (!user) return null;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch("");

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setShowToast(true);
      const i = setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong.");
    }
  };
  return (
    <>
      <div className="flex justify-center gap-3 my-12">
        <div className="flex justify-center">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">PhotoUrl</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              {error && <p className="text-red-500">{error}</p>}
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={user} />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
