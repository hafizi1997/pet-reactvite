import { useState, useEffect } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import {
  CameraIcon,
  PlusIcon,
  SaveIcon,
  CalendarIcon,
  HeartIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";

export const PetProfile = () => {
  const navigate = useNavigate();
  const { isLoading, error, sentRequest, clearError } = useHttpClient();
  const { petId } = useParams();
  const [petInfo, setPetInfo] = useState({});
  const [health, setHealth] = useState({});
  const [vaccineRecords, setVaccineRecords] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newVaccination, setNewVaccination] = useState({
    name: "",
    date: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleHealthChange = (e) => {
    const { name, value } = e.target;
    setHealth((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleVaccinationChange = (e) => {
    const { name, value } = e.target;
    setNewVaccination((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        const url =
          import.meta.env.VITE_REACT_APP_BACKEND_URL +
          `/pet/getpetbyid/${petId}`;
        const responseData = await sentRequest(url);
        setPetInfo(responseData.pets);
        setHealth(responseData.health);
        setVaccineRecords(responseData.vaccine);
      } catch (error) {
        console.error(error);
      }
    };
    if (petId) {
      fetchPetInfo();
    }
  }, [sentRequest]);
  const handleForm = async () => {
    const infoUpdate = JSON.stringify({
      name: petInfo.name,
      type: petInfo.type,
      breed: petInfo.breed,
      age: petInfo.age,
      weight: petInfo.weight,
      allergies: health.allergies,
      isactive: 1,
      medical_condition: health.medical_condition,
      medication: health.medication,
    });
    try {
      if (petId) {
        const url =
          import.meta.env.VITE_REACT_APP_BACKEND_URL +
          `/pet/updatepet/${petId}`;
        const responseData = await sentRequest(url, "PATCH", infoUpdate, {
          "Content-Type": "application/json",
        });
        console.log(responseData);
        navigate("/dashboard");
      } else {
        const url =
          import.meta.env.VITE_REACT_APP_BACKEND_URL + `/pet/createpet`;
        const responseData = await sentRequest(url, "POST", infoUpdate, {
          "Content-Type": "application/json",
        });
        console.log(responseData);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const addVaccination = async () => {
    const newVaccineRecord = JSON.stringify({
      vaccine_type: newVaccination.name,
      date: newVaccination.date,
    });
    try {
      const url =
        import.meta.env.VITE_REACT_APP_BACKEND_URL + `/pet/addvaccine/${petId}`;
      const responseData = await sentRequest(url, "POST", newVaccineRecord, {
        "Content-Type": "application/json",
      });
      console.log(responseData);
      setVaccineRecords((prev) => [...prev, newVaccineRecord]);
      setModalOpen(false);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setVaccineRecords((prev) => [...prev, newVaccineRecord]);
      setModalOpen(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Pet Profile</h1>
      <Card className="bg-white p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-blue-50 border-4 border-white shadow-sm flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
                  alt="Pet"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition">
                <CameraIcon size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={petInfo?.name || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={petInfo?.type || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Breed
                </label>
                <input
                  type="text"
                  name="breed"
                  value={petInfo?.breed || ""}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Age (years)
                </label>
                <input
                  type="number"
                  name="age"
                  value={petInfo?.age || 0}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Weight (Kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={petInfo?.weight || 0}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card className="bg-white  p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <HeartIcon size={20} className="mr-2 text-red-400" /> Medical
          Information
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Allergies
          </label>
          <textarea
            name="allergies"
            value={health ? health.allergies : "None"}
            onChange={handleHealthChange}
            rows={3}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Medical Conditions
          </label>
          <textarea
            name="medical_condition"
            value={health ? health.medical_condition : "None"}
            onChange={handleHealthChange}
            rows={3}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Medications
          </label>
          <textarea
            name="medication"
            value={health ? health.medication : "None"}
            onChange={handleHealthChange}
            rows={3}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
          />
        </div>
      </Card>

      <Card className="bg-white p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800 flex items-center">
            <CalendarIcon size={20} className="mr-2 text-green-400" />{" "}
            Vaccination Records
          </h2>
          {petId && (
            <button
              className="flex items-center text-sm text-blue-500 hover:text-blue-700"
              onClick={() => setModalOpen(true)}
            >
              <PlusIcon size={16} className="mr-1" /> Add Vaccination
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vaccination
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {vaccineRecords
                ? vaccineRecords.map((vaccination, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {vaccination.vaccine_type}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {vaccination.date}
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </Card>
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add Vaccination</h3>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Vaccination Name
              </label>
              <input
                type="text"
                name="name"
                value={newVaccination.name}
                onChange={handleVaccinationChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={newVaccination.date}
                onChange={handleVaccinationChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={addVaccination} // Add vaccination on submit
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setModalOpen(false)} // Close the modal
                className="ml-3 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow transition"
          onClick={handleForm}
        >
          <SaveIcon size={18} className="mr-2" /> Save Profile
        </button>
      </div>
    </div>
  );
};
