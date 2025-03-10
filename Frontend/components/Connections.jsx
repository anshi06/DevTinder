import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <h1 className="text-xl font-bold text-center">No connections found.</h1>
    );

  return (
    <div className="my-10">
      <h1 className="text-xl font-bold text-center">Connections</h1>
      <div className="overflow-x-auto m-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>About</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {connections.map((connection) => (
              <tr key={connection._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={connection.photoUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{connection.firstName}</div>
                    </div>
                  </div>
                </td>
                <td>{connection.about}</td>
                <th>
                  <Link to={"/chat/" + connection._id}>
                  <button className="btn btn-success btn-sm bg-blue-600">💬</button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Connections;
