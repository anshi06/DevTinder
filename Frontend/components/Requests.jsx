import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="text-xl font-bold text-center my-10">
        No requests found.
      </h1>
    );

  return (
    <div className="my-10">
      <h1 className="text-xl font-bold text-center">Requests</h1>
      <div className="overflow-x-auto m-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>About</th>
              <th>Skills</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              const { firstName, about, skills } = request.fromUserId;
              return (
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={request.photoUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{firstName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{about}</td>
                  <td>{skills.join(",")}</td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </th>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
